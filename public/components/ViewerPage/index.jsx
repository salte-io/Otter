import React from 'react';
import { ipcRenderer } from 'electron';
import SimplePeer from 'simple-peer';

import styles from './index.css';

export function ViewerPage() {
  const videoRef = React.createRef();
  ipcRenderer.on('stream', async (event, offer) => {
    const peer = new SimplePeer({
      trickle: false
    });

    peer.on('error', err => console.log('error', err));

    peer.signal(offer);

    const stream = await new Promise((resolve) => {
      peer.on('stream', (stream) => resolve(stream));
    });

    const signal = await new Promise((resolve) => {
      peer.once('signal', (data) => resolve(data));
    });

    ipcRenderer.send('share-requested-reply', {
      signal,
      type: 'approved'
    });

    videoRef.current.srcObject = stream;
    videoRef.current.play();
  });

  return (
    <div className={styles.root}>
      <video className={styles.video} ref={videoRef} />
    </div>
  );
}
