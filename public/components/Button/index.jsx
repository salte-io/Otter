import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../Loading';

import styles from './index.css';

export function Button({ component, color, disabled, fullWidth, loading, variant, scale, onClick, children, ...props }) {
  const Component = component || 'div';
  color = color || 'default';
  variant = variant || 'link';
  scale = scale || 'normal';

  return (
    <Loading fadeContent loading={loading} full-width={fullWidth ? '' : undefined} className={styles.root} disabled={disabled} variant={variant} scale={scale}>
      <Component {...props} className={`${styles.button} ${styles[color]}`} role="button" onClick={onClick}>{children}</Component>
    </Loading>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'danger'
  ]),
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
