import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TableRow from './TableRow';
import ConfirmationModal from '../../components/ConfirmModal/ConfirmationModal';
import { Toaster, toast } from 'react-hot-toast';
import FailedToLoad from '../../components/FailedToLoad/FailedToLoad';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const AllBuyers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const handleToggleModal = () => {
    setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible);
  };

  const { data: allBuyersData = [], refetch } = useQuery({
    queryKey: ['allBuyersData'],
    queryFn: async () => {
      try {
        const response = await axios.get(
          'https://savvy-pulse-upalbarua.vercel.app/user/all?type=buyer',
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

  const deleteBuyer = async () => {
    try {
      const response = await axios.delete(
        `https://savvy-pulse-upalbarua.vercel.app/user/delete/${deleteId}`
      );

      if (response?.data?.deletedCount > 0) {
        refetch();
        toast.success('Buyer Deleted', {
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

  if (!allBuyersData.length) {
    return <LoadingSpinner />;
  }

  return (
    <section className="container flow margin-block">
      <h2 className="title-primary">All Buyers</h2>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allBuyersData.map((buyer) => (
              <TableRow
                key={buyer._id}
                buyer={buyer}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {isModalVisible && (
        <ConfirmationModal
          title="Delete Buyer"
          message="are you sure you want to delete this buyer?"
          cancelFn={handleToggleModal}
          confirmFn={deleteBuyer}
        />
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default AllBuyers;
