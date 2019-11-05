import React from 'react';

import { Grid } from '../Grid';
import { Typography } from '../Typography';
import { Input } from '../Input';
import { Button } from '../Button';

import { ScreenShare } from '../../services/ScreenShare';

export function SharePage() {
  const [value, setValue] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  return (
    <Grid flex={1} justifyContent="center">
      <Typography>This will establish a connection with the remote user and share access to your machine.</Typography>
      <Grid direction="row">
        <Grid flex={2}>
          <Input fullWidth label="IP Address" placeholder="127.0.0.1" value={value} onChange={(value) => setValue(value)} />
        </Grid>
        <Button fullWidth variant="rounded" color="primary" loading={loading} onClick={() => {
          setLoading(true);
          ScreenShare.share(value || '127.0.0.1').finally(() => {
            setLoading(false);
          });
        }}>
          Share
        </Button>
      </Grid>
    </Grid>
  );
}
