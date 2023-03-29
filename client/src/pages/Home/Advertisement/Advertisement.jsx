import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CategoryCard from '../../Category/CategoryCard/CategoryCard';
import styles from './Advertisement.module.css';

const Advertisement = () => {
  const { data: advertisedData = [] } = useQuery({
    queryKey: ['advertisedData'],
    queryFn: async () => {
      const response = await axios.get(
        'https://savvy-pulse-upalbarua.vercel.app/my-products/advertised',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      return response.data;
    },
  });

  if (advertisedData.length <= 0) {
    return null;
  }

  return (
    <section className="container flow margin-block">
      <h2 className="title-primary">Advertisements</h2>
      <div className={styles.grid}>
        {advertisedData.map((data) => (
          <CategoryCard key={data._id} product={data} />
        ))}
      </div>
    </section>
  );
};

export default Advertisement;
