import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export function Input({ className, fullWidth, onChange, value, ...props }) {
  return (
    <input {...props}
      full-width={fullWidth ? '' : undefined}
      className={`${styles.root} ${className}`}
      value={value || ''}
      onChange={({ target }) => onChange && onChange(target.value)} />
  )
}

Input.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any
};
