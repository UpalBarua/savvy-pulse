import React from 'react';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <section className={`${styles.wrapper} container flow margin-block`}>
      <h2 className="title-primary">We Would Love To Hear From You</h2>
      <div className={styles.newsletter}>
        <input
          className={styles.input}
          type="text"
          placeholder="example@mail.com"
        />
        <button className={styles.searchBtn}>Subscribe</button>
      </div>
    </section>
  );
};

export default Newsletter;
