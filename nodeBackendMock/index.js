const express = require("express");

const cors = require("cors");
const app = express();
const port = 3700;

// Add cors to allow requests from any origin

app.use(cors());

app.get("/profile", (req, res) => {
  const data = {
    nombre: "Jose",
    apellido: "Escafandra Penyagolosa",
    nombreDeUsuario: "Josele",
    alergenos: ["Plata", "Plomo"],
  };
  res.json(data);
});

app.get("/allergens/:foo", (req, res) => {
  const data = {
    allergens: ["Plata", "Plomo", "Cobre", "Platino", "Cloro", "Plutonio"],
  };
  const foo = req.params.foo.toLowerCase();

  const filteredData = data.allergens.filter((item) =>
    item.toLowerCase().includes(foo)
  );

  res.json({ allergens: filteredData });
});

app.get("/medicamentos/searchTerm", (req, res) => {
  res.json({
    totalFilas: 268,
    pagina: 1,
    tamanioPagina: 25,
    resultados: [
      {
        nregistro: "63607",
        nombre: "ATRISCAL 300 mg COMPRIMIDOS RECUBIERTOS CON PELICULA",
        excipientes: ["Fake Excipient", "Another Fake Excipient"],
        labtitular: "Laboratorios Gebro Pharma S.A.",
        cpresc: "Medicamento Sujeto A Prescripción Médica",
        estado: {
          aut: 980118000000,
        },
        comerc: true,
        receta: true,
        generico: false,
        conduc: false,
        triangulo: false,
        huerfano: false,
        biosimilar: false,
        nosustituible: {
          id: 0,
          nombre: "N/A",
        },
        psum: false,
        notas: false,
        materialesInf: false,
        ema: false,
        docs: [
          {
            tipo: 1,
            url: "https://cima.aemps.es/cima/pdfs/ft/63607/FT_63607.pdf",
            urlHtml:
              "https://cima.aemps.es/cima/dochtml/ft/63607/FT_63607.html",
            secc: true,
            fecha: 1685141982000,
          },
          {
            tipo: 2,
            url: "https://cima.aemps.es/cima/pdfs/p/63607/P_63607.pdf",
            urlHtml: "https://cima.aemps.es/cima/dochtml/p/63607/P_63607.html",
            secc: true,
            fecha: 1686091127000,
          },
        ],
        fotos: [
          {
            tipo: "materialas",
            url: "https://cima.aemps.es/cima/fotos/thumbnails/materialas/63607/63607_materialas.jpg",
            fecha: 1619759537000,
          },
          {
            tipo: "formafarmac",
            url: "https://cima.aemps.es/cima/fotos/thumbnails/formafarmac/63607/63607_formafarmac.jpg",
            fecha: 1619759539000,
          },
        ],
        viasAdministracion: [
          {
            id: 48,
            nombre: "VÍA ORAL",
          },
        ],
        formaFarmaceutica: {
          id: 42,
          nombre: "COMPRIMIDO RECUBIERTO CON PELÍCULA",
        },
        formaFarmaceuticaSimplificada: {
          id: 10,
          nombre: "COMPRIMIDO",
        },
        vtm: {
          id: 418027007,
          nombre: "dexibuprofeno",
        },
        dosis: "300 mg",
      },
      {
        nregistro: "63606",
        nombre: "ATRISCAL 400 mg COMPRIMIDOS RECUBIERTOS CON PELICULA",
        excipientes: ["Fake Excipient", "Another Fake Excipient"],
        labtitular: "Laboratorios Gebro Pharma S.A.",
        cpresc: "Medicamento Sujeto A Prescripción Médica",
        estado: {
          aut: 980118000000,
        },
        comerc: true,
        receta: true,
        generico: false,
        conduc: false,
        triangulo: false,
        huerfano: false,
        biosimilar: false,
        nosustituible: {
          id: 0,
          nombre: "N/A",
        },
        psum: false,
        notas: false,
        materialesInf: false,
        ema: false,
        docs: [
          {
            tipo: 1,
            url: "https://cima.aemps.es/cima/pdfs/ft/63606/FT_63606.pdf",
            urlHtml:
              "https://cima.aemps.es/cima/dochtml/ft/63606/FT_63606.html",
            secc: true,
            fecha: 1685141941000,
          },
          {
            tipo: 2,
            url: "https://cima.aemps.es/cima/pdfs/p/63606/P_63606.pdf",
            urlHtml: "https://cima.aemps.es/cima/dochtml/p/63606/P_63606.html",
            secc: true,
            fecha: 1686091141000,
          },
        ],
        fotos: [
          {
            tipo: "materialas",
            url: "https://cima.aemps.es/cima/fotos/thumbnails/materialas/63606/63606_materialas.jpg",
            fecha: 1528711088000,
          },
          {
            tipo: "formafarmac",
            url: "https://cima.aemps.es/cima/fotos/thumbnails/formafarmac/63606/63606_formafarmac.jpg",
            fecha: 1528711087000,
          },
        ],
        viasAdministracion: [
          {
            id: 48,
            nombre: "VÍA ORAL",
          },
        ],
        formaFarmaceutica: {
          id: 42,
          nombre: "COMPRIMIDO RECUBIERTO CON PELÍCULA",
        },
        formaFarmaceuticaSimplificada: {
          id: 10,
          nombre: "COMPRIMIDO",
        },
        vtm: {
          id: 418027007,
          nombre: "dexibuprofeno",
        },
        dosis: "400 mg",
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

//
