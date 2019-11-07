const server = require('./src');
const { config } = require('./public/config');
const { menubar } = require('menubar');
const path = require('path');
const isDev = require('electron-is-dev');

process.env.ELECTRON = true;
process.env.BASE_URL = isDev ?
  `http://localhost:${config.port}` :
  `file://${path.join(__dirname, 'dist/index.html')}`;

(async () => {
  if (isDev) {
    const Bundler = require('parcel-bundler');

    const bundler = new Bundler(path.join(__dirname, 'public/index.html'), {
      cacheDir: '.cache/electron',
      outDir: 'dist/electron',
      target: 'electron',
      watch: true
    });

    await new Promise((resolve, reject) => {
      bundler.on('bundled', () => resolve());
      bundler.on('buildError', () => reject());

      bundler.serve(config.port);
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
    icon: path.join(__dirname, 'Media/logo-basic.png'),
    index: process.env.BASE_URL,
    preloadWindow: true,
  });

  mb.on('after-create-window', () => {
    server(mb.window);
    mb.showWindow();
  });

  if (isDev) {
    mb.on('after-hide', () => mb.showWindow());
  }
})();
