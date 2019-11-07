/**
 * @param {Electron.BrowserWindow} window
 */
module.exports = function(window) {
  const { ipcMain } = require('electron');
  const app = new require('http').Server();
  const io = require('socket.io')(app);

  io.on('connection', (socket) => {
    socket.on('share', (offer) => {
      window.webContents.send('share-requested', offer);

      ipcMain.once('share-requested-reply', (event, { type, signal }) => {
        if (type === 'approved') {
          socket.emit('share-approved', signal);
        } else if (type === 'declined') {
          socket.emit('share-declined');
        }
      });
    });

    socket.on('view', () => {
      window.webContents.send('view-requested');

      ipcMain.once('view-requested-reply', (event, { type, sdp }) => {
        if (type === 'approved') {
          socket.emit('view-approved', sdp);
        } else if (type === 'declined') {
          socket.emit('view-declined');
        }
      });
    });
  });

  app.listen(8080);
}

