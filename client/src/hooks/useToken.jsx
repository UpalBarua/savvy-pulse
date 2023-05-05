import { useState, useEffect } from 'react';
import axios from 'axios';

const useToken = (email) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/jwt?email=${email}`
        );

        const accessToken = response?.data?.accessToken;

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          setToken(accessToken);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (email) {
      fetchToken();
    }
  }, [email]);

  return { token };
};

export default useToken;
