const { config } = require('./public/config');
const { menubar } = require('menubar');
const path = require('path');
const isDev = require('electron-is-dev');

(async () => {
  if (isDev) {
    const Bundler = require('parcel-bundler');

    const bundler = new Bundler('./public/index.html', {
      target: 'electron',
      watch: true,
    });

    await new Promise((resolve, reject) => {
      bundler.on('bundled', () => resolve());
      bundler.on('buildError', () => reject());

      bundler.serve();
    });
  }

  const mb = menubar({
    browserWindow: {
      alwaysOnTop: isDev,
      height: config.height,
      transparent: true,
      webPreferences: {
        nodeIntegration: true
      },
      width: config.width,
    },
    index: isDev
      ? 'http://localhost:1234'
      : `file://${path.join(__dirname, 'dist/index.html')}`,
    preloadWindow: true,
  });

  mb.on('after-create-window', () => mb.showWindow());

  if (isDev) {
    mb.on('after-hide', () => mb.showWindow());
  }
})();
