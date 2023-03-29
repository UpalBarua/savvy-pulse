import React from 'react';
import { Link } from 'react-router-dom';
import { GiGuitarBassHead } from 'react-icons/gi';
import { GrFacebookOption, GrTwitter, GrInstagram } from 'react-icons/gr';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.flex} | container`}>
        <div>
          <Link className={styles.logo} to="/">
            <GiGuitarBassHead />
            <span>SavvyPulse</span>
          </Link>
          <p>copyright &copy; 2022</p>
        </div>
        <ul className={styles.socialLinks}>
          <li className={styles.link}>
            <Link to="/www.facebook.com">
              <GrFacebookOption />
            </Link>
          </li>
          <li className={styles.link}>
            <Link to="/www.twitter.com">
              <GrTwitter />
            </Link>
          </li>
          <li className={styles.link}>
            <Link to="/www.instagram.com">
              <GrInstagram />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
