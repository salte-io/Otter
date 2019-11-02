import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Loading } from '../Loading';
import { Toolbar } from '../Toolbar';

import { Grid } from '../Grid';
import { HomePage } from '../HomePage';
import { SharePage } from '../SharePage';
import { JoinPage } from '../JoinPage';

import { config } from '../../config';

import styles from './index.css';

export function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
