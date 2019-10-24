import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export function Grid({ alignItems, children, className, direction, flex, justifyContent, spacing, ...props }) {
  const dynamicStyles = {
    alignItems,
    justifyContent
  };

  const offsetStyles = {
    flex
  };

  if (direction === 'column') {
    dynamicStyles.marginBottom = spacing;
    offsetStyles.marginBottom = -spacing;
  } else if (direction === 'row') {
    dynamicStyles.marginRight = spacing;
    offsetStyles.marginRight = -spacing;
  }

  return (
    <div className={`${styles.root} ${className}`} style={offsetStyles} direction={direction}>
      <div {...props} style={dynamicStyles} className={styles.grid}>
        {children}
      </div>
    </div>
  );
}

Grid.defaultProps = {
  className: '',
  direction: 'column',
  spacing: 10,
};

Grid.propTypes = {
  alignItems: PropTypes.oneOf([
    'start',
    'center',
    'end'
  ]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  direction: PropTypes.oneOf([
    'column',
    'row'
  ]),
  flex: PropTypes.number,
  justifyContent: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'space-around',
    'space-between',
    'space-evenly'
  ]),
  spacing: PropTypes.number,
}
