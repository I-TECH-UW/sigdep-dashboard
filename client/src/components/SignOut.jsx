import React, { useState, useEffect, useRouter } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';


const useAuth = async () => {
  try {
    const response = await fetch('/api/logout');
    if (response.status === 200) {
      return true;
    } else {
      console.error(response);
      throw new Error('Failed to log out');
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const logOut = () => {

  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await useAuth();
        setIsAuth(authStatus);
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);


  

  if (isAuth === null) {
    return <div>Loading...</div>;
  } else if (isAuth) {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default logOut;
