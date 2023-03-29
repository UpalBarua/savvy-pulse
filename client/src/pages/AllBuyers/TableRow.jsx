import React from 'react';

const TableRow = ({ buyer, handleDelete }) => {
  const { _id, name, email } = buyer;

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <button className="btn-delete" onClick={handleDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
