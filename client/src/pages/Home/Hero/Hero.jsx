import React from 'react';
import styles from './Hero.module.css';
import heroImg from '../../../assets/hero.svg';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className={`${styles.hero} | container margin-block`}>
      <img className={styles.img} src={heroImg} alt="" />
      <div className={styles.column}>
        <h1 className={styles.title}>
          A <span>guitar</span> is more than just a sound box… it is part of
          your soul
        </h1>
        <div className={styles.search}>
          <input className={styles.input} type="text" placeholder="Search" />
          <button className={styles.searchBtn}>
            <BsSearch />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
