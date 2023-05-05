import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useUserType = (email) => {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchUserType = async () => {
      const response = await axios.get(
        `http://localhost:3000/user/type/${email}`
      );
      setUserType(response?.data);
    };

    if (email) fetchUserType();
  }, [email]);

  return { userType };
};

export default useUserType;
