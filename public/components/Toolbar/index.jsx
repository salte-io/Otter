import { remote } from 'electron';

import React from 'react';
import { Route, Link } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';

import { Grid } from '../Grid';
import { Typography } from '../Typography';
import { Button } from '../Button';

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
        <Button onClick={() => remote.getCurrentWindow().close()}>Quit</Button>
      </Grid>
    </Grid>
  );
}
