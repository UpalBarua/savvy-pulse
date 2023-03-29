import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import styles from './MyProducts.module.css';
import axios from 'axios';
import { format } from 'date-fns';
import ProductRow from './ProductRow/ProductRow';
import ConfirmationModal from '../../components/ConfirmModal/ConfirmationModal';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import FailedToLoad from '../../components/FailedToLoad/FailedToLoad';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const MyProducts = () => {
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const handleToggleModal = () => {
    setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible);
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `https://savvy-pulse-upalbarua.vercel.app/my-products/delete/${deleteId}`
      );

      if (response?.data?.deletedCount > 0) {
        refetch();
        toast.success('Product Deleted', {
          style: {
            border: '1px solid var(--clr-accent-300)',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleToggleModal();
    }
  };

  const handleDelete = (id) => {
    return () => {
      handleToggleModal();
      setDeleteId(id);
    };
  };

  const { data: products = [], refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://savvy-pulse-upalbarua.vercel.app/my-products/${user?.email}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (!products.length) {
    return <LoadingSpinner />;
  }

  return (
    <section className="container flow margin-block">
      <h2 className="title-primary">My Products</h2>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Added</th>
              <th>Advertisement</th>
              <th>Availability</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                refetch={refetch}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {isModalVisible && (
        <ConfirmationModal
          title="Delete Product"
          message="are you sure you want to delete this product?"
          cancelFn={handleToggleModal}
          confirmFn={deleteProduct}
        />
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default MyProducts;
