import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './PurchaseModal.module.css';
import { Toaster, toast } from 'react-hot-toast';

const PurchaseModal = ({ isModalOpen, handleModalClose, modalData }) => {
  const { user } = useAuth();

  const handlePurchase = async (event) => {
    event.preventDefault();
    const form = event.target;

    const newPurchase = {
      name: form.name.value,
      email: form.email.value,
      product: form.product.value,
      price: form.price.value,
      phone: form.phone.value,
      meeting: form.meeting.value,
    };

    try {
      const response = await axios.post(
        'https://savvy-pulse-upalbarua.vercel.app/orders',
        newPurchase
      );
      if (response?.data?.acknowledged) {
        toast.success('Order placed', {
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
        form.reset();
        handleModalClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={styles.overlay}
      data-visible={isModalOpen}
      onSubmit={handlePurchase}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Purchase Product</h2>
          <button className={styles.toggle} onClick={handleModalClose}>
            <AiOutlineClose />
          </button>
        </div>
        <form className={styles.purchaseForm}>
          <div className="control">
            <label className="label">Name</label>
            <input
              className="input"
              type="text"
              name="name"
              defaultValue={user.displayName}
              disabled
            />
          </div>
          <div className="control">
            <label className="label">Email</label>
            <input
              className="input"
              type="text"
              name="email"
              defaultValue={user.email}
              disabled
            />
          </div>
          <div className="control">
            <label className="label">Guitar</label>
            <input
              className="input"
              type="text"
              name="product"
              defaultValue={modalData.name}
              disabled
            />
          </div>
          <div className="control">
            <label className="label">Price</label>
            <input
              className="input"
              type="text"
              name="price"
              disabled
              defaultValue={modalData.price?.resale}
            />
          </div>
          <div className="control">
            <label className="label">Phone</label>
            <input className="input" type="number" name="phone" />
          </div>
          <div className="control">
            <label className="label">Meeting</label>
            <input className="input" type="text" name="meeting" />
          </div>
          <button className="btn-primary">purchase</button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;
