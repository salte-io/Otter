let isNode = false;
try {
  isNode = Object.prototype.toString.call(global.process) === '[object process]'
 } catch {} // eslint-disable-line

 const config = {
   height: 230,
   isElectron: process.env.ELECTRON === 'true',
   isNode,
   port: 1337,
   width: 560,
};

config.base = (page) => {
  const base = process.env.BASE_URL;

  if (config.isElectron) {
    return `${base}#${page}`;
  }

  return `${base}/${page}`;
};

exports.config = config;
