import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../Loading';

import styles from './index.css';

export function Button({ component, disabled, fullWidth, loading, variant, scale, onClick, children, ...props }) {
  const Component = component || 'div';
  variant = variant || 'link';
  scale = scale || 'normal';

  return (
    <Loading fadeContent loading={loading} full-width={fullWidth ? '' : undefined} className={styles.root} disabled={disabled} variant={variant} scale={scale}>
      <Component {...props} className={styles.Button} role="button" onClick={onClick}>{children}</Component>
    </Loading>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  scale: PropTypes.string,
  variant: PropTypes.string,
};
