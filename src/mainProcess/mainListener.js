const electron = require('electron');
const { ipcMain, dialog } = require('electron');
ipcMain.on('open-information-dialog', event => {
    const options = {
        type: 'info',
        title: 'Information',
        message: '该休息下啦！',
        buttons: ['Yes']
    };
    dialog.showMessageBox(options, index => {
        event.sender.send('information-dialog-selection', index);
    });
});

ipcMain.on('store-intervalTime', (event, value) => {
    console.log(value);
    global.nodeStorage.setItem('intervalTime', value);
});
ipcMain.on('finish-mount', event => {
    event.sender.send(
        'pre-intervalTime',
        global.nodeStorage.getItem('intervalTime')
    );
});
