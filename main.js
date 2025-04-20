const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { loadSpec } = require('./asyncapiLoader');
const { runHTTP, runMQTT, runWS, runKafka } = require('./protocols');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(async () => {
  createWindow();
  const spec = await loadSpec();

  ipcMain.handle('http', async (event) => {
    const res = await runHTTP();
    event.sender.send('log', `[HTTP] ${JSON.stringify(res, null, 2)}`);
  });

  ipcMain.handle('mqtt', (event) => {
    runMQTT('test/pandya', (msg) => {
      event.sender.send('log', msg);
    });
  });

  ipcMain.handle('ws', (event) => {
    runWS('wss://echo.websocket.events', (msg) => {
      event.sender.send('log', msg);
    });
  });

  ipcMain.handle('kafka', (event) => {
    runKafka('pandya-topic', (msg) => {
      event.sender.send('log', msg);
    });
  });
});
