import React from 'react';
import { LeapFrog } from '@uiball/loaders';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.overlay}>
      <LeapFrog size={80} speed={2.5} color="#c558ef" />
    </div>
  );
};

export default LoadingSpinner;
