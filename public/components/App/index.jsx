import { ipcRenderer } from 'electron';

import React from 'react';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';

import { Loading } from '../Loading';
import { Toolbar } from '../Toolbar';
import { Toast, toast } from '../Toast';

import { Grid } from '../Grid';
import { HomePage } from '../HomePage';
import { SharePage } from '../SharePage';
import { JoinPage } from '../JoinPage';

import { config } from '../../config';

import styles from './index.css';

const Router = config.isElectron ? HashRouter : BrowserRouter;

export function App() {
  ipcRenderer.on('view-requested', () => {
    toast({
      actions: [{
        label: 'Accept',
        onClick: () => {
          ipcRenderer.send('view-requested-reply', 'approved');
        }
      }, {
        color: 'danger',
        label: 'Decline',
        onClick: () => {
          ipcRenderer.send('view-requested-reply', 'declined');
        }
      }],
      message: 'Someone has requested to view your screen.',
    });
  });

  ipcRenderer.on('share-requested', () => {
    toast({
      actions: [{
        label: 'Accept',
        onClick: () => {
          ipcRenderer.send('share-requested-reply', 'approved');
        }
      }, {
        color: 'danger',
        label: 'Decline',
        onClick: () => {
          ipcRenderer.send('share-requested-reply', 'declined');
        }
      }],
      message: 'Someone has requested to share their screen with you.',
    });
  });

  return (
    <Router>
      <Toast />
      <Loading fadeContent className={styles.root} contentClassName={styles.root}>
        <Toolbar />
        <Grid flex={1} className={styles.page}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            {config.isElectron && (
              <Route exact path="/share">
                <SharePage />
              </Route>
            )}
            <Route exact path="/join">
              <JoinPage />
            </Route>
          </Switch>
        </Grid>
      </Loading>
    </Router>
  );
}
