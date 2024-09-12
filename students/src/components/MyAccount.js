// src/components/MyAccount.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You need to log in.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        setMessage('Error fetching account data.');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>My Account</h2>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default MyAccount;