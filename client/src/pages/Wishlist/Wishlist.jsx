import React from 'react';
import CategoryCard from '../Category/CategoryCard/CategoryCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from './Wishlist.module.css';

const Wishlist = () => {
  const { data: wishlistData = [], refetch } = useQuery({
    queryKey: ['wishlistData'],
    queryFn: async () => {
      const response = await axios.get(
        'https://savvy-pulse-upalbarua.vercel.app/my-products/wishlist',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      return response.data;
    },
  });

  return (
    <section className="container flow margin-block">
      <h2 className="title-primary">wishlist</h2>
      <div className={styles.grid}>
        {wishlistData.map((data) => (
          <CategoryCard key={data._id} product={data} refetch={refetch} />
        ))}
      </div>
    </section>
  );
};

export default Wishlist;
