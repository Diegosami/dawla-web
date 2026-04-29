import { NextResponse } from "next/server";

type ShippingRequestBody = {
  zipTo?: string;
  cityTo?: string;
  stateTo?: string;
  neighborhoodTo?: string;
};

type SkydropxAuthResponse = {
  access_token?: string;
};

type SkydropxRate = {
  id?: string;
  success?: boolean;
  total?: string | number;
  provider_display_name?: string;
  provider_service_name?: string;
  currency_code?: string;
  days?: number;
};

type SkydropxQuotationResponse = {
  id?: string;
  is_completed?: boolean;
  rates?: SkydropxRate[];
};

/* ── Mapa de prefijos postales Colombia → Departamento / Ciudad ──── */
const CO_POSTAL_MAP: Record<string, { area1: string; area2: string }> = {
  "11": { area1: "Bogotá D.C.", area2: "Bogotá" },
  "05": { area1: "Antioquia", area2: "Medellín" },
  "76": { area1: "Valle del Cauca", area2: "Cali" },
  "08": { area1: "Atlántico", area2: "Barranquilla" },
  "13": { area1: "Bolívar", area2: "Cartagena" },
  "68": { area1: "Santander", area2: "Bucaramanga" },
  "54": { area1: "Norte de Santander", area2: "Cúcuta" },
  "66": { area1: "Risaralda", area2: "Pereira" },
  "17": { area1: "Caldas", area2: "Manizales" },
  "41": { area1: "Huila", area2: "Neiva" },
  "73": { area1: "Tolima", area2: "Ibagué" },
  "15": { area1: "Boyacá", area2: "Tunja" },
  "52": { area1: "Nariño", area2: "Pasto" },
  "63": { area1: "Quindío", area2: "Armenia" },
  "19": { area1: "Cauca", area2: "Popayán" },
  "44": { area1: "La Guajira", area2: "Riohacha" },
  "47": { area1: "Magdalena", area2: "Santa Marta" },
  "20": { area1: "Cesar", area2: "Valledupar" },
  "23": { area1: "Córdoba", area2: "Montería" },
  "50": { area1: "Meta", area2: "Villavicencio" },
  "25": { area1: "Cundinamarca", area2: "Zipaquirá" },
};

function lookupPostal(zip: string): { area1: string; area2: string } {
  const prefix2 = zip.substring(0, 2);
  return CO_POSTAL_MAP[prefix2] || { area1: "Colombia", area2: "Ciudad" };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ShippingRequestBody;
    const { zipTo, cityTo, stateTo, neighborhoodTo } = body;

    if (!zipTo) {
      return NextResponse.json(
        { error: "Código postal del destino es requerido." },
        { status: 400 }
      );
    }

    const API_KEY = process.env.SKYDROPX_API_KEY;
    const API_SECRET = process.env.SKYDROPX_API_SECRET;

    if (!API_KEY || !API_SECRET) {
      return NextResponse.json(
        { error: "Credenciales de Skydropx no configuradas." },
        { status: 500 }
      );
    }

    // 1. Obtener Token OAuth
    const authRes = await fetch(
      "https://api-pro.skydropx.com/api/v1/oauth/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "client_credentials",
          client_id: API_KEY,
          client_secret: API_SECRET,
        }),
      }
    );

    if (!authRes.ok) {
      const err = await authRes.text();
      throw new Error("No se pudo autenticar con Skydropx: " + err);
    }
    const authData = (await authRes.json()) as SkydropxAuthResponse;
    const token = authData.access_token;

    if (!token) {
      throw new Error("Skydropx no devolvió token de acceso.");
    }

    // 2. Resolver dirección destino desde código postal
    const destLookup = lookupPostal(zipTo);

    // 3. Cotizar el envío
    const payload = {
      quotation: {
        declared_amount: 50000,
        address_from: {
          country_code: "CO",
          postal_code: "110111",
          area_level1: "Bogotá D.C.",
          area_level2: "Bogotá",
          area_level3: "Usaquén",
        },
        address_to: {
          country_code: "CO",
          postal_code: zipTo,
          area_level1: stateTo || destLookup.area1,
          area_level2: cityTo || destLookup.area2,
          area_level3: neighborhoodTo || "Centro",
        },
        parcels: [
          {
            weight: 1,
            length: 7,
            width: 28,
            height: 4,
            declared_value: 50000,
          },
        ],
      },
    };

    const response = await fetch(
      "https://api-pro.skydropx.com/api/v1/quotations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Skydropx Quoting Error:", errorData);
      return NextResponse.json(
        { error: "Error en la cotización: " + errorData },
        { status: response.status }
      );
    }

    const data = (await response.json()) as SkydropxQuotationResponse;

    // 4. Si is_completed=false, polling con GET
    const quotationId = data.id;
    let finalData = data;

    if (!data.is_completed && quotationId) {
      await new Promise((resolve) => setTimeout(resolve, 4000));

      const getRes = await fetch(
        `https://api-pro.skydropx.com/api/v1/quotations/${quotationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (getRes.ok) {
        finalData = (await getRes.json()) as SkydropxQuotationResponse;
      }
    }

    // 5. Extraer rates exitosos
    const rates = (finalData.rates || [])
      .filter((r) => r.success && r.total)
      .map((r) => ({
        id: r.id,
        carrier: r.provider_display_name,
        service: r.provider_service_name,
        total: r.total,
        currency: r.currency_code,
        days: r.days,
      }));

    return NextResponse.json({
      quotation_id: quotationId,
      is_completed: finalData.is_completed,
      rates,
      raw_rates_count: (finalData.rates || []).length,
    });
  } catch (error: unknown) {
    console.error("Shipping API Error:", error);
    const message =
      error instanceof Error ? error.message : "Error interno del servidor.";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
