import io from 'socket.io-client';
import { desktopCapturer, ipcRenderer, remote } from 'electron';
import SimplePeer from 'simple-peer';

import { config } from '../config';

export class ScreenShare {
  static normalize(ip) {
    const [address, port] = ip.split(':');

    return `${address}:${port || 8080}`;
  }

  static async share(ip) {
    const socket = io(this.normalize(ip), {
      transports: ['websocket']
    });

    await new Promise((resolve) => {
      socket.once('connect', () => resolve());
    });

    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    const streams = await Promise.all(sources.map((source) => navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id,
          maxHeight: window.screen.height,
          maxWidth: window.screen.width,
          minHeight: window.screen.height,
          minWidth: window.screen.width,
        }
      }
    })));

    const [stream] = streams;

    const peer = new SimplePeer({
      initiator: true,
      stream,
      trickle: false,
    });

    peer.on('error', err => console.log('error', err));

    const signal = await new Promise((resolve) => {
      peer.once('signal', (data) => resolve(data));
    });

    socket.emit('share', signal);

    const responseSignal = await new Promise((resolve, reject) => {
      socket.once('share-approved', (signal) => resolve(signal));
      socket.once('share-declined', () => reject());
    });

    peer.signal(responseSignal);

    return peer;
  }

  static async view(ip) {
    const socket = io(this.normalize(ip), {
      transports: ['websocket']
    });

    await new Promise((resolve) => {
      socket.once('connect', () => resolve());
    });

    socket.emit('view');

    await new Promise((resolve, reject) => {
      socket.once('view-approved', () => resolve());
      socket.once('view-declined', () => reject());
    });
  }

  static async approveShare(offer) {
    const streamWindow = new remote.BrowserWindow({
      height: window.screen.height,
      webPreferences: {
        nodeIntegration: true
      },
      width: window.screen.width,
    });

    await streamWindow.loadURL(config.base('viewer'));
    streamWindow.webContents.send('stream', offer);
  }

  static async approveView() {
    ipcRenderer.send('view-requested-reply', {
      type: 'approved'
    });
  }

  /**
   * @param {('share'|'view')} event the event to decline
   */
  static async decline(event) {
    ipcRenderer.send(`${event}-requested-reply`, {
      type: 'declined'
    });
  }
}
