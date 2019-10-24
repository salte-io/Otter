import React from 'react';

import { Grid } from '../Grid';
import { Typography } from '../Typography';
import { Input } from '../Input';
import { Button } from '../Button';


export function JoinPage() {
  return (
    <Grid flex={1} justifyContent="center">
      <Typography>This will establish a connection with the remote user and request access to their machine.</Typography>
      <Grid direction="row">
        <Grid flex={2}>
          <Input fullWidth label="IP Address" placeholder="127.0.0.1" />
        </Grid>
        <Button fullWidth variant="rounded">Connect</Button>
      </Grid>
    </Grid>
  );
}
