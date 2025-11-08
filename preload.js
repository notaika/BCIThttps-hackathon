const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("functions", {
  getFilePath: async () => ipcRenderer.invoke("getFilePath")
});
