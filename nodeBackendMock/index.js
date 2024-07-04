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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

//
