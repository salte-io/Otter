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

config.base = (page, query = {}) => {
  const url = new URL(process.env.BASE_URL);

  if (config.isElectron) {
    url.hash = page;
  } else {
    url.pathname = page;
  }

  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.toString();
};

exports.config = config;
