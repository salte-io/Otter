import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export function Input({ className, fullWidth, ...props }) {
  return (
    <input {...props} full-width={fullWidth ? '' : undefined} className={`${styles.root} ${className}`} />
  )
}

Input.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool
};
