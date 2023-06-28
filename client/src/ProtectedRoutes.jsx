import { Navigate, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const useAuth = async () => {
  try {
    const response = await fetch('/checkToken');
    if (response.status === 200) {
      return true;
    } else {
      console.error(response);
      throw new Error('Not authenticated');
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const ProtectedRoutes = () => {

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
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
