/**
 * @param {Electron.BrowserWindow} window
 */
module.exports = function(window) {
  const { ipcMain } = require('electron');
  const app = new require('http').Server();
  const io = require('socket.io')(app);

  io.on('connection', (socket) => {
    socket.on('share', () => {
      window.webContents.send('share-requested');

      ipcMain.once('share-requested-reply', (event, type) => {
        console.log(type);
        if (type === 'approved') {
          socket.emit('share-approved');
        } else if (type === 'declined') {
          socket.emit('share-declined');
        }
      });
    });

    socket.on('view', () => {
      window.webContents.send('view-requested');

      ipcMain.once('view-requested-reply', (event, type) => {
        console.log(type);
        if (type === 'approved') {
          socket.emit('view-approved');
        } else if (type === 'declined') {
          socket.emit('view-declined');
        }
      });
    });
  });

  app.listen(8080);
}

