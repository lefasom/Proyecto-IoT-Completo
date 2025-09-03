import express from "express";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables del .env
const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://192.168.100.3:${PORT}`);
});
const wss = new WebSocketServer({ server });

wss.on("connection", ws => {
  console.log("Nuevo cliente conectado");

  ws.on("message", message => {
    const messageStr = message.toString();
    console.log(`Mensaje recibido: ${messageStr}`);

    // Intenta parsear el mensaje como JSON para verificar si es de identificación
    try {
      const data = JSON.parse(messageStr);
      if (data.type === "identify") {
        console.log(`Cliente identificado: ${data.role} con ID ${data.id}`);
        // No hagas nada más, el mensaje de identificación no debe ser reenviado.
        return;
      }
    } catch (e) {
      // Si no es un JSON, podría ser un mensaje de texto simple.
    }

    // Reenviar el mensaje a todos los clientes (excepto a los de identificación)
    wss.clients.forEach(client => {
      if (client.readyState === 1) { // 1 = OPEN
        client.send(messageStr);
      }
    });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});