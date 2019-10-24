import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export function Loading({ className, contentClassName, loading, fadeContent, children, ...props }) {
  return (
    <div {...props} className={`${styles.root} ${className}`} fade-content={fadeContent ? '' : undefined} loading={loading ? '' : undefined}>
      <div className={styles.spinner}></div>
      <div className={`${styles.content} ${contentClassName}`}>{children}</div>
    </div>
  )
}

Loading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  fadeContent: PropTypes.bool,
  loading: PropTypes.bool,
};
