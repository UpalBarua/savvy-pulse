import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import CategoryCard from '../Category/CategoryCard/CategoryCard';
import styles from './MyOrders.module.css';

const MyOrders = () => {
  const { user } = useAuth();

  const { data: myOrders = [] } = useQuery({
    queryKey: ['myOrders'],
    queryFn: async () => {
      const response = await axios.get(
        `https://savvy-pulse-upalbarua.vercel.app/orders?email=${user?.email}`,
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
      <h2 className="title-primary">My Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Guitar</th>
            <th>Name</th>
            <th>Price</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {myOrders.map((order) => (
            <tr key={order._id}>
              <td>{order.product}</td>
              <td>{order.name}</td>
              <td>${order.price}</td>
              <td>
                <button className="btn-secondary">Pay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MyOrders;
