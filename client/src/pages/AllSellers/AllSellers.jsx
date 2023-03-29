import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ConfirmationModal from '../../components/ConfirmModal/ConfirmationModal';
import { Toaster, toast } from 'react-hot-toast';
import AllSellerRow from './AllSellersRow';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const AllSellers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const handleToggleModal = () => {
    setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible);
  };

  const { data: allSellersData = [], refetch } = useQuery({
    queryKey: ['allSellersData'],
    queryFn: async () => {
      try {
        const response = await axios.get(
          'https://savvy-pulse-upalbarua.vercel.app/user/all?type=seller',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const deleteSeller = async () => {
    try {
      const response = await axios.delete(
        `https://savvy-pulse-upalbarua.vercel.app/user/delete/${deleteId}`
      );

      if (response?.data?.deletedCount > 0) {
        refetch();
        toast.success('Seller Deleted', {
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

  if (!allSellersData.length) {
    return <LoadingSpinner />;
  }

  return (
    <section className="container flow margin-block">
      <h2 className="title-primary">All Sellers</h2>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allSellersData.map((seller) => (
              <AllSellerRow
                key={seller._id}
                seller={seller}
                handleDelete={handleDelete}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>

      {isModalVisible && (
        <ConfirmationModal
          title="Delete Seller"
          message="are you sure you want to delete this Seller?"
          cancelFn={handleToggleModal}
          confirmFn={deleteSeller}
        />
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default AllSellers;
