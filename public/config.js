let isNode = false;
try {
  isNode = Object.prototype.toString.call(global.process) === '[object process]'
 } catch {} // eslint-disable-line

 exports.config = {
   height: 230,
   isElectron: process.env.ELECTRON === 'true',
   isNode,
   port: 1337,
   width: 560,
};
