import React from 'react';
import styles from './index.css';
import { Grid } from '../Grid';
import { Typography } from '../Typography';
import { Button } from '../Button';

export class Toast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toasts: []
    };
  }

  componentDidMount() {
    Toast.instance = this;
  }

  addToast(toast) {
    const toasts = [
      ...this.state.toasts,
      { ...toast }
    ];

    this.setState({ toasts });
  }

  render() {
    return (
      <div className={styles.root}>
        {this.state.toasts.map((toast, toastIndex) => (
          <div key={toastIndex} className={`${styles.toast} ${toastIndex > 1 || toast._hide ? styles.hide : ''}`} onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget || event.propertyName !== 'opacity') return;

            if (toast._hide) {
              const toasts = [...this.state.toasts];
              toasts.splice(toastIndex, 1);
              this.setState({ toasts });
              if (toast._action.onClick) toast._action.onClick();
            }
          }}>
            <Grid direction="row" alignItems="end">
              <Grid flex={1} direction="column">
                <Typography>{toast.message}</Typography>
              </Grid>
              {toast.actions && toast.actions.map((action, actionIndex) => (
                <Button key={actionIndex} variant="rounded slim" color={action.color} onClick={() => {
                  const toasts = [...this.state.toasts];
                  toasts.splice(toastIndex, 1, {
                    ...toast,
                    _action: action,
                    _hide: true
                  });

                  this.setState({ toasts });
                }}>{action.label}</Button>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    );
  }
}

export function toast({ actions, message }) {
  if (!Toast.instance) throw new Error('Expected the Toast container to be defined');

  Toast.instance.addToast({ actions, message });
}
