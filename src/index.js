const express = require("express");
const app = express();
const port = 3002;

app.use(express.json());

let tareas = [];

// GET todas las tareas
app.get("/tareas", (req, res) => {
  res.json({ tareas });
});

// GET tarea por id
app.get("/tareas/:id", (req, res) => {
  const tarea = tareas.find((t) => t.id === Number(req.params.id));
  if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
  res.json(tarea);
});

// POST crear tarea
app.post("/tareas", (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ error: "Título es obligatorio" });

  const nuevaTarea = { id: Date.now(), titulo };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// PUT editar tarea
app.put("/tareas/:id", (req, res) => {
  const { titulo } = req.body;
  const tarea = tareas.find((t) => t.id === Number(req.params.id));
  if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

  tarea.titulo = titulo || tarea.titulo;
  res.json(tarea);
});

// DELETE eliminar tarea
app.delete("/tareas/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tareas.findIndex((t) => t.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Tarea no encontrada" });

  const eliminada = tareas.splice(index, 1);
  res.json({ mensaje: "Tarea eliminada", tarea: eliminada[0] });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
