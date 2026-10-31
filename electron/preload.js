// Ponte segura entre a página do app e o Windows.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('formareDesktop', {
  saveFile: (filename, arrayBuffer) => ipcRenderer.invoke('formare:save-file', filename, arrayBuffer),
  version: () => ipcRenderer.invoke('formare:version')
});
