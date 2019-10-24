import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export function Typography({ children, className, component, variant, ...props }) {
  const Component = component || 'div';

  return (
    <Component {...props} variant={variant || 'body'} className={`${styles.root} ${className}`}>{children}</Component>
  );
}

Typography.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  variant: PropTypes.string,
};
