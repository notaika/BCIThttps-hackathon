const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("templit", {
  templates: () => ipcRenderer.invoke("templates"),
  buildTemplate: (template, filepath) =>
    ipcRenderer.invoke("buildTemplate", template, filepath),
  openTemplateWindow: () => ipcRenderer.send("open-template-window"),
  closeTemplateWindow: () => ipcRenderer.invoke("close-template-window"),
  createNewTemplate: (filepath, templateName) =>
    ipcRenderer.invoke("createNewTemplate", filepath, templateName),
  refreshWindow: (windowName) => ipcRenderer.invoke("refresh-window", windowName),
});

contextBridge.exposeInMainWorld("functions", {
  getFilePath: async () => ipcRenderer.invoke("getFilePath"),
  getTemplatePathToCopy: async () => ipcRenderer.invoke("getFilePath"),
  sendCopyTemplateFilePath: (localPathName) =>
    ipcRenderer.invoke("sendCopyTemplateFilePath", localPathName),
  getDOMElement: (idName) => ipcRenderer.invoke("get-DOM-element"),
});
