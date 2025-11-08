import { app, BrowserWindow, ipcMain } from "electron";
export { app };
import path from "node:path";
import { fileURLToPath } from "url";
import {
  readTemplates,
  createNewTemplate,
  buildTemplate,
  templates,
} from "./script.js";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
  readTemplates();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.handle("templates", () => templates);
  ipcMain.handle("buildTemplate", (event, template, filePath) => {
    buildTemplate(template, filePath);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
