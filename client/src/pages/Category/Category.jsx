import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard/CategoryCard';
import PurchaseModal from './PurchaseModal/PurchaseModal';
import axios from 'axios';
import styles from './Category.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FailedToLoad from '../../components/FailedToLoad/FailedToLoad';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const params = useParams();

  const { data: products = [], refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(
        `https://savvy-pulse-upalbarua.vercel.app/products/${params.type}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      return response.data;
    },
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  if (!products.length) {
    return <LoadingSpinner />;
  }

  return (
    <section className="container flow margin-block">
      <h2 className="title-primary">{params.type} guitars</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <CategoryCard
            key={product._id}
            product={product}
            handleModalOpen={handleModalOpen}
            setModalData={setModalData}
            refetch={refetch}
          />
        ))}
      </div>
      <PurchaseModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        modalData={modalData}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default Category;
