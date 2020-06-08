const { app, BrowserWindow, globalShortcut } = require('electron');
const { url, mode } = require('./config');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    //frame: false, //titleBarStyle: 'hidden',
    //alwaysOnTop: true,
    icon: __dirname + '/icon.png',
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.removeMenu();
  win.loadURL(url);
  
}

function toggleDevTools() {
  win.webContents.toggleDevTools();
}

function createShortcuts() {
  if(mode == 'dev') globalShortcut.register('CmdOrCtrl+Shift+I', toggleDevTools);  
}

app.whenReady()
.then(createWindow)
.then(createShortcuts);

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length != 0) {
    createWindow();
  }
});