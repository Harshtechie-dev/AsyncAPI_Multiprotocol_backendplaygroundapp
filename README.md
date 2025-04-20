# AsyncAPI_Multiprotocol_backendplaygroundapp
Pandya-multiprotocol-singleAsyncAPI-backendplayground

AsyncAPI Protocol Playground
A lightweight Electron-based desktop application to test and experiment with multiple asynchronous protocols using a unified AsyncAPI specification.

This tool helps developers validate real-time message flows across different protocols from a single UI using AsyncAPI-driven definitions.

Prerequisites
Node.js (v18+ recommended)

Git

Docker Desktop

A code editor (e.g., IntelliJ, VS Code – optional)

1. Install Docker
If you don't already have Docker installed:

Download Docker Desktop from: https://www.docker.com/products/docker-desktop

Install it and start Docker Desktop

Ensure Docker works by running:
docker --version

2. Clone the Repository
git clone https://github.com/YOUR_USERNAME/asyncapi-protocol-playground.git
cd asyncapi-protocol-playground

3. Install Node.js Dependencies
npm install

4. Start the Application
npm start

This will launch an Electron app where you can test all four protocols.

5. Start Kafka & MQTT using Docker
Make sure Docker is running before proceeding.

To start Kafka and Zookeeper:

docker compose up -d

This will spin up the following services:

Zookeeper on port 2181

Kafka on port 9092

If you want to add Mosquitto (MQTT broker), update your docker-compose.yml with this block:

yaml
Copy
Edit
  mqtt:
    image: eclipse-mosquitto
    container_name: mqtt
    ports:
      - "1883:1883"
      - "9001:9001"
    volumes:
      - ./mosquitto.conf:/mosquitto/config/mosquitto.conf
And create a mosquitto.conf file with the following:

yaml
Copy
Edit
listener 1883
allow_anonymous true

listener 9001
protocol websockets
allow_anonymous true
Then run again:

docker compose up -d

6. Using the App
Each button in the UI does the following:

Test HTTP – Sends a sample GET request

Test MQTT – Connects to broker, publishes, and logs messages

Test WebSocket – Sends message to echo server and receives response

Test Kafka – Produces and consumes a test message from topic

Project Structure
asyncapi-protocol-playground/
├── asyncapi.yaml – AsyncAPI spec (multi-protocol)
├── docker-compose.yml – For Kafka, Zookeeper, MQTT
├── mosquitto.conf – MQTT broker config
├── index.html – UI layout
├── main.js – Electron app logic
├── protocols.js – All protocol functions
├── package.json
└── .gitignore

References
AsyncAPI: https://www.asyncapi.com/docs

KafkaJS: https://kafka.js.org

MQTT.js: https://github.com/mqttjs/MQTT.js

Electron: https://www.electronjs.org

Docker Desktop: https://www.docker.com/products/docker-desktop


