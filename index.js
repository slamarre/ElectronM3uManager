const {
    app,
    BrowserWindow, Menu, MenuItem, globalShortcut
} = require('electron');
const {
    readFileSync
} = require('fs');
const {
    session
} = require('electron')

/*
session
    .fromPartition('some-partition')
    .setPermissionRequestHandler((webContents, permission, callback) => {
        const url = webContents.getURL()

        if (permission === 'notifications') {
            // Approves the permissions request
            callback(true)
        }

        // Verify URL
        if (!url.startsWith('https://example.com/')) {
            // Denies the permissions request
            return callback(false)
        }
    })

window.readConfig = function () {
    const data = readFileSync('config.json')
    return data
}
*/
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let jump

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('index.html');

    // Open the DevTools.
    win.webContents.openDevTools();

    win.setProgressBar(0.5);

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)



// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {

        createWindow()
        jump = win.querySelector('btn')
    

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                //...details.responseHeaders,
                'Content-Security-Policy': ['default-src \'none\'']
            }
        })
    })
}
})
const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click () { console.log('New Window') }
    }, {
      label: 'New Window with Settings',
      submenu: [
        { label: 'Basic' },
        { label: 'Pro' }
      ]
    },
    { label: 'New Command...' }
  ])
  
  app.dock.setMenu(dockMenu)

  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'Print',
    accelerator: 'CmdOrCtrl+P',
    click: () => { console.log('time to print stuff') }
  }))

  app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+X', () => {
      console.log('CommandOrControl+X is pressed')
    })
  })
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})

const { nativeTheme } = require('electron')

nativeTheme.on('updated', function theThemeHasChanged () {
  updateMyAppTheme(nativeTheme.shouldUseDarkColors);
})