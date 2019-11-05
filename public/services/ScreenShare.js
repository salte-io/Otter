import io from 'socket.io-client';
import { desktopCapturer } from 'electron';

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

    // const sources = await desktopCapturer.getSources({ types: ['screen'] });

    // const streams = await Promise.all(sources.map((source) => navigator.mediaDevices.getUserMedia({
    //   audio: false,
    //   video: {
    //     mandatory: {
    //       chromeMediaSource: 'desktop',
    //       chromeMediaSourceId: source.id,
    //       maxHeight: 720,
    //       maxWidth: 1280,
    //       minHeight: 720,
    //       minWidth: 1280,
    //     }
    //   }
    // })));

    socket.emit('share');

    await new Promise((resolve, reject) => {
      socket.once('share-approved', () => resolve());
      socket.once('share-declined', () => reject());
    });
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
}
