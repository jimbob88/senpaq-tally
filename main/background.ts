import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { readFile } from "xlsx";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, "../resources/icon.ico"),
    transparent: true,
    frame: false,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

ipcMain.handle(
  "read-excel-file",
  async (event: Electron.IpcMainEvent, filePath: string) => {
    if (
      filePath.endsWith(".xls") ||
      filePath.endsWith(".xlsx") ||
      filePath.endsWith(".csv")
    ) {
      return readFile(filePath);
    }

    throw new Error("Unsupported file format!");
  },
);

ipcMain.handle("close", async (event: Electron.IpcMainEvent) => {
  app.quit();
});
