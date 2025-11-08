const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("templit", {
  templates: () => ipcRenderer.invoke("templates"),
});
