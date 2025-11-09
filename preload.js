const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("templit", {
  templates: () => ipcRenderer.invoke("templates"),
  buildTemplate: (template, filepath) =>
    ipcRenderer.invoke("buildTemplate", template, filepath),
  openTemplateWindow: () => ipcRenderer.send("open-template-window"),
  createNewTemplate: (filepath) =>
    ipcRenderer.send("createNewTemplate", filepath),
  filePathToArray: (filePath) => ipcRenderer.send("filePathToArray", filePath),
});

contextBridge.exposeInMainWorld("functions", {
  getFilePath: async () => ipcRenderer.invoke("getFilePath"),
  getTemplatePathToCopy: async () => ipcRenderer.invoke("getFilePath"),
  sendCopyTemplateFilePath: (localPathName) =>
    ipcRenderer.invoke("sendCopyTemplateFilePath", localPathName),
});
