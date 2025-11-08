const { app, BrowserWindow } = require("electron");
export app;

/* Function that creates a new window and loads index.html into it */
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
};

/* Load GUI when app is ready ('ready' is an event that app fires */
app.whenReady().then(() => {
  createWindow();
});

/* Quit app when window is closed */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
