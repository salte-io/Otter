import React from 'react';
import { Link } from 'react-router-dom';

import { Grid } from '../Grid';
import { Typography } from '../Typography';
import { Button } from '../Button';

export function HomePage() {
  return (
    <Grid flex={1} justifyContent="center">
      <Typography>If you share your screen the remote user will have full access to your desktop, mouse, and keyboard.</Typography>
      <Grid direction="row">
        <Button fullWidth component={Link} variant="rounded" to="/share">Share Your Screen</Button>
        <Button fullWidth component={Link} variant="rounded" to="/join">Join Remote Screen</Button>
      </Grid>
    </Grid>
  );
}
