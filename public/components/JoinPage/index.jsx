import React from 'react';

import { Grid } from '../Grid';
import { Typography } from '../Typography';
import { Input } from '../Input';
import { Button } from '../Button';

import { ScreenShare } from '../../services/ScreenShare';

export function JoinPage() {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(null);

  return (
    <Grid flex={1} justifyContent="center">
      <Typography>This will establish a connection with the remote user and request access to their machine.</Typography>
      <Grid direction="row">
        <Grid flex={2}>
          <Input fullWidth label="IP Address" placeholder="127.0.0.1" value={value} onChange={(value) => setValue(value)} />
        </Grid>
        <Button fullWidth variant="rounded" color="primary" loading={loading} onClick={() => {
          setLoading(true);
          ScreenShare.view(value || '127.0.0.1').finally(() => {
            setLoading(false);
          });
        }}>
          Connect
        </Button>
      </Grid>
    </Grid>
  );
}
