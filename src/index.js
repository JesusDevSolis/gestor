const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let tareas = [];

app.get("/tareas", (req, res) => {
  res.json(tareas);
});

app.post("/tareas", (req, res) => {
  const { titulo } = req.body;
  const nuevaTarea = { id: Date.now(), titulo };
  tareas.push(nuevaTarea);
  // res.status(201).json(nuevaTarea);
  res.json({ tareas, mensaje: "Tareas cargadas correctamente" });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
