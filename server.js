import express from "express";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables del .env

const app = express();
const PORT = process.env.PORT || 3000; // lee del .env o usa 3000 por defecto

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Hola mundo con import y nodemon!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
