import React from 'react';
import format from 'date-fns/format';
import styles from './ProductRow.module.css';
import axios from 'axios';

const ProductRow = ({ product, refetch, handleDelete }) => {
  const {
    _id,
    name,
    picture,
    postedOn,
    price,
    type,
    isAvailable,
    isAdvertised,
  } = product;

  const handleProductSell = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/my-products/sell/${_id}`
      );

      if (response?.data?.modifiedCount > 0) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductAdvertisement = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/my-products/advertisements/${_id}`
      );

      if (response?.data?.modifiedCount > 0) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td className={styles.imgTd}>
        <img className={styles.avatar} src={picture} alt={name} />
      </td>
      <td>
        <p>{name}</p>
      </td>
      <td>
        <p>{type}</p>
      </td>
      <td>
        <p>${price.resale}</p>
      </td>
      <td>
        {/* <p>{format(new Date(postedOn), 'PP')}</p> */}
        <p>{postedOn}</p>
      </td>
      {isAvailable ? (
        <td>
          <button
            className={isAdvertised ? 'btn-toggle--on' : 'btn-toggle--off'}
            onClick={handleProductAdvertisement}>
            {isAdvertised ? <span>Remove Ad</span> : <span>Advertise</span>}
          </button>
        </td>
      ) : (
        <td />
      )}
      <td>
        <button
          className={isAvailable ? 'btn-toggle--on' : 'btn-toggle--off'}
          onClick={handleProductSell}>
          {isAvailable ? <span>Available</span> : <span>Sold</span>}
        </button>
      </td>
      <td>
        <button className="btn-delete" onClick={handleDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
