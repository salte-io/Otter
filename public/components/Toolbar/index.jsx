import React from 'react';
import { Route, Link } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';

import { Grid } from '../Grid';
import { Typography } from '../Typography';
import { Button } from '../Button';

import { config } from '../../config';

import { Electron } from '../../services/Electron';

import styles from './index.css';

export function Toolbar() {
  return (
    <Grid className={styles.root} direction="row" justifyContent="space-between">
      <Typography component="h1" variant="h1">Otter</Typography>
      <Grid direction="row">
        <Route render={({ location }) => {
          return (
            <Button disabled={location.pathname === '/'} component={Link} to="/">
              <IoIosArrowBack className={styles.backIcon} /> Back
            </Button>
          );
        }} />
        {config.isElectron && (
          <Button onClick={() => {
            Electron.close();
          }}>
            Quit
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
