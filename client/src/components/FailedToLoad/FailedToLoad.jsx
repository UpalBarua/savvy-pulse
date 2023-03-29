import React from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import styles from './FailedToLoad.module.css';

const FailedToLoad = () => {
  return (
    <div className={styles.ErrorMessage}>
      <BsExclamationTriangle />
      <h2>Failed to load data</h2>
    </div>
  );
};

export default FailedToLoad;
