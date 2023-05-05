import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AllSellerRow = ({ seller, handleDelete, refetch }) => {
  const { _id, name, email, isVerified } = seller;

  const handleSellerVerification = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/user/verify/${_id}`
      );

      if (response?.data?.modifiedCount > 0) {
        refetch();
        toast.success('Seller verification toggled', {
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
    }
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <button
          className={isVerified ? 'btn-toggle--on' : 'btn-toggle--off'}
          onClick={handleSellerVerification}>
          {isVerified ? <span>verified</span> : <span>verify</span>}
        </button>
      </td>
      <td>
        <button className="btn-delete" onClick={handleDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default AllSellerRow;
