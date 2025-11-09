import { app, BrowserWindow, dialog, ipcMain } from "electron";
export { app };
import path from "node:path";
import { fileURLToPath } from "url";
import {
  readTemplates,
  createNewTemplate,
  buildTemplate,
  templates,
} from "./renderer/js/script.js";
let win;
let templateWindow;

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));
let win;
let templateWindow;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

function createTemplateWindow() {
  templateWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    modal: true,
  });

  templateWindow.loadFile("./renderer/create-template.html");
}

app.whenReady().then(() => {
  createWindow();
  readTemplates();
  ipcMain.handle("getFilePath", async () => {
    return await dialog.showOpenDialog({ properties: ["openDirectory"] });
  });
  ipcMain.handle("sendCopyTemplateFilePath", (e, localPathName) => {
    createNewTemplate(localPathName);
  });
  ipcMain.handle("close-template-window", () => {
    templateWindow.close();
  });

  ipcMain.handle("templates", () => templates);
  ipcMain.handle("buildTemplate", (event, template, filePath) => {
    buildTemplate(template, filePath);
  });
  ipcMain.handle("createNewTemplate", (event, filePath) => {
    createNewTemplate(filePath);
  });
  ipcMain.on("open-template-window", () => {
    createTemplateWindow();
  });
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
