import React from 'react';
import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ title, message, cancelFn, confirmFn }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.btnGroup}>
          <button className="btn-secondary" onClick={cancelFn}>
            Cancel
          </button>
          <button className="btn-primary" onClick={confirmFn}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
