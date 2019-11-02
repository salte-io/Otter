let isElectron = false;
try {
  isElectron = navigator.userAgent.indexOf('Electron') !== -1;
} catch {} // eslint-disable-line

let isNode = false;
try {
  isNode = Object.prototype.toString.call(global.process) === '[object process]'
 } catch {} // eslint-disable-line

exports.config = {
  height: 230,
  isElectron,
  isNode,
  width: 560
};
