// electron/main.ts
import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'

let mainWindow: BrowserWindow | null = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false, // 无边框窗口，你需要自定义标题栏
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // 简化版不使用上下文隔离
        }
    });
    
    // 加载应用
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
    
    // 窗口控制事件监听
    ipcMain.on('minimize', () => {
        mainWindow?.minimize();
    });
    
    ipcMain.on('maximizeOrUnmaximize', () => {
        if (mainWindow?.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow?.maximize();
        }
    });
    
    ipcMain.on('close', () => {
        mainWindow?.close();
    });
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
