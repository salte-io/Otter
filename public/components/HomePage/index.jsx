import React from 'react';
import { Link } from 'react-router-dom';

import { Grid } from '../Grid';
import { Typography } from '../Typography';
import { Button } from '../Button';

import { config } from '../../config';

export function HomePage() {
  return (
    <Grid flex={1} justifyContent="center">
      <Typography>If you share your screen the remote user will have full access to your desktop, mouse, and keyboard.</Typography>
      <Grid direction="row">
        {config.isElectron && (
          <Button fullWidth component={Link} variant="rounded" color="primary" to="/share">Share Your Screen</Button>
        )}
        <Button fullWidth component={Link} variant="rounded" color="primary" to="/join">View Remote Screen</Button>
      </Grid>
    </Grid>
  );
}
