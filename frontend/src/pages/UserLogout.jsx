// import React from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'


// const UserLogout = () => {
//     const token = localStorage.getItem('token')
//     axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
//         headers:{
//             Authorization: `Bearer ${token}`
//         }
//     }).then((response) => {
//          if(response.status === 200){
//             localStorage.removeItem('token')
//             navigate('/login')
//          }
//     })

//   return (
     
//     <div>UserLogout</div>
//   )
// }

// export default UserLogout



import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    })
    .catch((error) => {
      console.error('Logout failed:', error);
      // Optionally navigate even if error happens
      navigate('/login');
    });
  }, []);

  return (
    <div>Logging out...</div>
  );
};

export default UserLogout;
