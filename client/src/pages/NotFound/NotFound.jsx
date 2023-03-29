import React from 'react';
import errorImg from '../../assets/error.svg';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <img className={styles.img} src={errorImg} alt="" />
      <Link className="btn-primary" to="/">
        Go Home
      </Link>
    </section>
  );
};

export default NotFound;
