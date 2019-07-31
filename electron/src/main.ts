declare var global: any

import { app, BrowserWindow, Tray } from 'electron'
import * as path from 'path'

import server from './server'

console.log('>>> Versions', { versions: process.versions })

// tslint:disable-next-line no-var-requires
const { version } = require('../package.json')

global.appVersion = version

if (app && app.dock) {
  app.dock.hide()
}

let mainWindow: Electron.BrowserWindow | null
let tray

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    fullscreenable: false,
    height: 600,
    resizable: false,
    show: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 800,
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../index.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  if (server && server.getApp) {
    server.getApp()
  }
}

function toggleWindow() {
  if (!mainWindow) {
    return
  }

  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    mainWindow.show()
  }
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.png'))
  tray.on('right-click', toggleWindow)
  tray.on('double-click', toggleWindow)
  tray.on('click', toggleWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createTray()
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('before-quit', () => {
  if (server && server.close) {
    console.log('Server is closing before quiting app')
    server.close()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
