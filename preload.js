const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("templit", {
  templates: () => ipcRenderer.invoke("templates"),
  buildTemplate: (template, filepath, topFolderName) =>
    ipcRenderer.invoke("buildTemplate", template, filepath, topFolderName),
  openTemplateWindow: () => ipcRenderer.send("open-template-window"),
  closeTemplateWindow: () => ipcRenderer.invoke("close-template-window"),
  filePathToArray: (filePath) => ipcRenderer.send("filePathToArray", filePath),
  createNewTemplate: (filepath, templateName) =>
    ipcRenderer.invoke("createNewTemplate", filepath, templateName),
  refreshWindow: (windowName) =>
    ipcRenderer.invoke("refresh-window", windowName),
  deleteTemplate: (templateName) => ipcRenderer.invoke("delete-template", templateName),
});

contextBridge.exposeInMainWorld("functions", {
  getFilePath: async () => ipcRenderer.invoke("getFilePath"),
  getTemplatePathToCopy: async () => ipcRenderer.invoke("getFilePath"),
  sendCopyTemplateFilePath: (localPathName) =>
    ipcRenderer.invoke("sendCopyTemplateFilePath", localPathName),
  getDOMElement: (idName) => ipcRenderer.invoke("get-DOM-element"),
});
