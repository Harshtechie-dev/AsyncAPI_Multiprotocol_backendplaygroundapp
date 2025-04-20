const axios = require('axios');
const mqtt = require('mqtt');
const { Kafka } = require('kafkajs');
const WebSocket = require('ws');

// ✅ HTTP Request (GET)
async function runHTTP() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
  return res.data;
}

// ✅ MQTT Pub/Sub
function runMQTT(topic, log) {
  const client = mqtt.connect('ws://localhost:9001', {
    clientId: 'pandya-' + Math.random().toString(16).substr(2, 8),
  });

  client.on('connect', () => {
    log('[MQTT] Connected to broker');
    client.subscribe(topic, (err) => {
      if (err) {
        log(`[MQTT] Subscription error: ${err.message}`);
      } else {
        log(`[MQTT] Subscribed to topic: ${topic}`);
        client.publish(topic, 'Hello MQTT!');
      }
    });
  });

  client.on('message', (t, msg) => {
    log(`[MQTT] Received on ${t}: ${msg.toString()}`);
    setTimeout(() => client.end(), 2000);
  });

  client.on('error', (err) => {
    log(`[MQTT] Error: ${err.message}`);
  });
}

// ✅ WebSocket Echo
function runWS(url, log) {
  const ws = new WebSocket(url);

  ws.on('open', () => {
    log('[WebSocket] Connected');
    ws.send('Hello WebSocket!');
  });

  ws.on('message', (msg) => {
    log(`[WebSocket] Received: ${msg.toString()}`);
    ws.close();
  });

  ws.on('error', (err) => {
    log(`[WebSocket] Error: ${err.message}`);
  });
}

// ✅ Kafka Produce & Consume
async function runKafka(topic, log) {
  try {
    const kafka = new Kafka({ brokers: ['localhost:9092'] });
    const producer = kafka.producer();
    const consumer = kafka.consumer({ groupId: 'pandya-group' });

    await producer.connect();
    await consumer.connect();

    await consumer.subscribe({ topic, fromBeginning: true });

    await producer.send({ topic, messages: [{ value: 'Hello Kafka!' }] });

    await consumer.run({
      eachMessage: async ({ message }) => {
        log(`[Kafka] ${message.value.toString()}`);
        await consumer.disconnect();
        await producer.disconnect();
      },
    });
  } catch (err) {
    log(`[Kafka] Error: ${err.message}`);
  }
}

module.exports = { runHTTP, runMQTT, runWS, runKafka };
