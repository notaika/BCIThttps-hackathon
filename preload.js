const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("templit", {
  templates: () => ipcRenderer.invoke("templates"),
  buildTemplate: (template, filepath) =>
    ipcRenderer.invoke("buildTemplate", template, filepath),
});

contextBridge.exposeInMainWorld("functions", {
  getFilePath: async () => ipcRenderer.invoke("getFilePath"),
  getTemplatePathToCopy: async () => ipcRenderer.invoke("getFilePath"),
  sendCopyTemplateFilePath: (localPathName) => ipcRenderer.invoke("sendCopyTemplateFilePath", localPathName)
});
