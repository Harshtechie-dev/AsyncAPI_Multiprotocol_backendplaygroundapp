AsyncAPI Protocol Playground
This tool helps developers validate real-time message flows across different protocols from a single UI using AsyncAPI-driven definitions.

Prerequisites
Node.js (v18+ recommended)

Git

Docker Desktop

A code editor (e.g., IntelliJ, VS Code – optional)

Getting Started
Clone the Repository

git clone https://github.com/YOUR_USERNAME/asyncapi-protocol-playground.git
cd asyncapi-protocol-playground

Install Dependencies

npm install

Start the Application

npm start

This will launch an Electron app where you can test all four protocols.

Kafka & MQTT Setup using Docker
Make sure Docker Desktop is installed and running before proceeding.

Start Kafka & Zookeeper with Docker

docker compose up -d

Start MQTT Broker (Optional)

If you're running MQTT locally (e.g., using Mosquitto), make sure it’s running on ws://localhost:9001
Or switch to a public broker like ws://broker.hivemq.com:8000/mqtt in the code.

Project Structure
asyncapi.yaml — AsyncAPI spec

docker-compose.yml — Starts Kafka & Zookeeper

index.html — UI for interaction

main.js — Electron app entry point

protocols.js — Handles logic for HTTP, Kafka, MQTT, WebSocket

Output
The app interface lets you:

Click "Test HTTP" to hit an endpoint and show JSON response

Click "Test Kafka" to produce & consume to pandya-topic

Click "Test MQTT" to publish & subscribe

Click "Test WebSocket" to send & receive a message
