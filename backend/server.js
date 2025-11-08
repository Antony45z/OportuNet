const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, "public")));

// Si el usuario visita cualquier ruta no definida, devolvemos index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Configuración del puerto (Render o local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
