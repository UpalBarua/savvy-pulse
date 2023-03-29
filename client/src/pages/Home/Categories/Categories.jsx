import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from './Categories.module.css';
import FailedToLoad from '../../../components/FailedToLoad/FailedToLoad';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

const Categories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get(
        'https://savvy-pulse-upalbarua.vercel.app/categories'
      );
      return response.data;
    },
  });

  if (!categories.length) {
    return <LoadingSpinner />;
  }

  return (
    <section className={`${styles.categories} | container flow`}>
      <h2 className="title-primary">product categories</h2>
      <div className={styles.flex}>
        {categories.map((category) => (
          <Link
            to={`/category/${category.type}`}
            key={category._id}
            className={styles.category}
            style={{ backgroundImage: `url(${category.img})` }}>
            <p className={styles.title}>#{category.type}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
