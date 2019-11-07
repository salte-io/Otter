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
import { ViewerPage } from '../ViewerPage';

import { config } from '../../config';

import styles from './index.css';
import { ScreenShare } from '../../services/ScreenShare';

const Router = config.isElectron ? HashRouter : BrowserRouter;

export function App() {
  ipcRenderer.on('view-requested', () => {
    toast({
      actions: [{
        label: 'Accept',
        onClick: () => {
          ScreenShare.approveView();
        }
      }, {
        color: 'danger',
        label: 'Decline',
        onClick: () => {
          ScreenShare.decline('view');
        }
      }],
      message: 'Someone has requested to view your screen.',
    });
  });

  ipcRenderer.on('share-requested', (event, offer) => {
    toast({
      actions: [{
        label: 'Accept',
        onClick: () => {
          ScreenShare.approveShare(offer);
        }
      }, {
        color: 'danger',
        label: 'Decline',
        onClick: () => {
          ScreenShare.decline('share');
        }
      }],
      message: 'Someone has requested to share their screen with you.',
    });
  });

  return (
    <Router>
      <Toast />
      <Switch>
        <Route exact path="/viewer" component={ViewerPage} />
        <Route>
          <Loading fadeContent className={styles.root} contentClassName={styles.root}>
            <Toolbar />
            <Grid flex={1} className={styles.page}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                {config.isElectron && (
                  <Route exact path="/share" component={SharePage} />
                )}
                <Route exact path="/join" component={JoinPage} />
              </Switch>
            </Grid>
          </Loading>
        </Route>
      </Switch>
    </Router>
  );
}
