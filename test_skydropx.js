const fs = require('fs');

async function test() {
  const token = process.argv[2];

  const payload = {
    address_from: {
      province: "Bogotá",
      city: "Bogotá",
      name: "Dawla",
      zip: "110121",
      country: "CO",
      address1: "Cra 21",
      company: "Dawla",
      phone: "3054216343",
      email: "hola@dawla.co"
    },
    address_to: {
      province: "Bogotá",
      city: "Bogotá",
      name: "Cliente",
      zip: "110111",
      country: "CO",
      address1: "Direccion",
      company: "-",
      phone: "3000000000",
      email: "cliente@dawla.co"
    },
    parcels: [
      {
        weight: 0.5,
        distance_unit: "CM",
        mass_unit: "KG",
        length: 20,
        width: 15,
        height: 10
      }
    ]
  };

  const response = await fetch("https://api-pro.skydropx.com/api/v1/quotations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  const body = await response.text();
  console.log("Status:", response.status);
  console.log("Response:", body);
}

test();
