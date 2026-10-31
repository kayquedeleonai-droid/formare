// Formare — aplicativo de desktop (Windows)
// Abre a página do app, salva arquivos exportados e se atualiza sozinho pelo GitHub Releases.
const { app, BrowserWindow, ipcMain, dialog, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs/promises');
const { autoUpdater } = require('electron-updater');

let win = null;
const CHECK_EVERY_MS = 2 * 60 * 60 * 1000; // procura atualização a cada 2 horas

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 960,
    minHeight: 640,
    backgroundColor: '#1d1d1f',
    title: 'Formare',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, '..', 'app', 'index.html'));

  // links externos abrem no navegador do sistema
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file://')) { e.preventDefault(); shell.openExternal(url); }
  });
}

// Salvar arquivos exportados pelo app (render, OBJ, STL, projeto, vídeo)
ipcMain.handle('formare:save-file', async (_e, filename, data) => {
  const ext = path.extname(filename).replace('.', '') || '*';
  const res = await dialog.showSaveDialog(win, {
    title: 'Salvar arquivo',
    defaultPath: path.join(app.getPath('documents'), filename),
    filters: [{ name: ext.toUpperCase(), extensions: [ext] }, { name: 'Todos os arquivos', extensions: ['*'] }]
  });
  if (res.canceled || !res.filePath) return 'canceled';
  await fs.writeFile(res.filePath, Buffer.from(data));
  return 'saved';
});
ipcMain.handle('formare:version', () => app.getVersion());

// Atualização automática
function setupUpdates() {
  if (!app.isPackaged) return;
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('update-downloaded', async (info) => {
    const { response } = await dialog.showMessageBox(win, {
      type: 'info',
      buttons: ['Reiniciar agora', 'Depois'],
      defaultId: 0,
      cancelId: 1,
      title: 'Atualização pronta',
      message: `A versão ${info.version} do Formare está pronta.`,
      detail: 'Reinicie para usar a nova versão. Suas peças continuam salvas. Se escolher Depois, ela é instalada quando você fechar o app.'
    });
    if (response === 0) autoUpdater.quitAndInstall();
  });
  autoUpdater.on('error', (err) => console.error('Falha ao atualizar:', err && err.message));
  const check = () => autoUpdater.checkForUpdates().catch(() => {});
  check();
  setInterval(check, CHECK_EVERY_MS);
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
  app.whenReady().then(() => { createWindow(); setupUpdates(); });
  app.on('window-all-closed', () => app.quit());
}
