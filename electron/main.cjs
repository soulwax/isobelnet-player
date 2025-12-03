const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 3222;

/** @type {BrowserWindow | null} */
let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
    icon: path.join(__dirname, '../public/icon.png'),
    backgroundColor: '#000000',
    show: false,
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  if (isDev) {
    mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../out/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  registerMediaKeys();
};

const registerMediaKeys = () => {
  globalShortcut.register('MediaPlayPause', () => {
    mainWindow?.webContents.send('media-key', 'play-pause');
  });

  globalShortcut.register('MediaNextTrack', () => {
    mainWindow?.webContents.send('media-key', 'next');
  });

  globalShortcut.register('MediaPreviousTrack', () => {
    mainWindow?.webContents.send('media-key', 'previous');
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

if (!isDev) {
  Menu.setApplicationMenu(null);
}