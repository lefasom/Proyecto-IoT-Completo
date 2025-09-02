# IoT-TempControl

![Diagrama del Proyecto](./diagrama.png)

## Descripción

IoT-TempControl es un sistema IoT completo que permite el monitoreo y control en tiempo real de sensores, utilizando ESP32, Node.js, React Native y Firebase.

### Características principales:
- **Control en tiempo real** mediante WebSocket: React Native ↔ Node.js ↔ ESP32.
- **Monitoreo de sensores** (ejemplo: temperatura) desde la aplicación móvil.
- **Alertas locales** en el teléfono (notificación, vibración y sonido) cuando se superan umbrales críticos.
- **Persistencia de datos** en Firebase (logs, historial de temperatura y configuración de sensores).
- **Arquitectura modular y escalable**: Node.js en Docker como puente WebSocket; ESP32 enfocado en hardware; React Native enfocado en UX.
- **Seguridad y buenas prácticas**: uso de variables de entorno, reglas de Firebase, diseño preparado para autenticación si se requiere.

### Tecnologías utilizadas:
- **ESP32 con MicroPython**: lectura de sensores, comunicación WebSocket, envío a Firebase.
- **Node.js**: servidor WebSocket, contenedorizado con Docker.
- **React Native**: interfaz móvil, alertas locales, conexión WebSocket.
- **Firebase**: almacenamiento de historial y configuración de datos.

## Diagrama de arquitectura

```text
                  ┌───────────────────┐
                  │     React Native   │
                  │ (Móvil / App)     │
                  │ - WebSocket client│
                  │ - Alertas locales │
                  │ - Vibración / Sonido
                  │ - Lectura datos   │
                  └─────────┬─────────┘
                            │ WebSocket
                            ▼
                  ┌───────────────────┐
                  │   Node.js Server  │
                  │   (Docker)        │
                  │ - WebSocket server│
                  │ - Reenvío mensajes│
                  │ - Bridge ESP32 ⇆ App
                  └─────────┬─────────┘
                            │ WebSocket
                            ▼
                  ┌───────────────────┐
                  │     ESP32         │
                  │  (MicroPython)    │
                  │ - Sensor temp / otros
                  │ - Enviar alertas WS
                  │ - Enviar logs a Firebase
                  └─────────┬─────────┘
                            │ HTTP / Firebase SDK
                            ▼
                  ┌───────────────────┐
                  │     Firebase      │
                  │  Realtime DB /    │
                  │  Firestore        │
                  │ - Almacenamiento histórico
                  │ - Configuración / logs
                  └───────────────────┘
```

## Instalación y ejecución

### Node.js WebSocket server

1. Construir el contenedor Docker:
```bash
docker build -t websocket-server .
```

2. Ejecutar el contenedor:
```bash
docker run -p 8080:8080 websocket-server
```

### React Native App

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar la app:
```bash
npx react-native run-android  # o run-ios según corresponda
```

### ESP32 (MicroPython)

1. Cargar script WebSocket y Firebase en el ESP32.
2. Conectar a la red Wi-Fi y ejecutar el script.

## Recomendaciones avanzadas
- Implementar **seguridad en WebSocket** (JWT o token Firebase).
- Usar **HTTPS / WSS** para cifrar la comunicación.
- Configurar **Firebase rules** estrictas para proteger los datos.
- Agregar **dashboard web** con gráficos históricos.
- Soporte para **múltiples sensores y dispositivos ESP32**.
- Alertas push usando **Firebase Cloud Messaging** para notificaciones aunque la app esté cerrada.

---

Este README deja listo tu repositorio para mostrar tu proyecto completo de IoT, modular y escalable.

