//import React, { useState, useEffect, useRouter } from 'react';
import React, { useState, useEffect } from 'react';
//import { Redirect, useHistory } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router';
const withAuth = (ComponentToProtect) => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const checkToken = () => {
      fetch('/checkToken')
        .then(res => {
          if (res.status === 200) {
            setLoading(false);
            setRedirect(false);
          } else {
            console.error(res);

            let error = new Error("Not authenticated");
            throw error;
          }
        })
        .catch(err => {
          setLoading(false);
          setRedirect(true);
        });
    };

    // Listen for route changes
    const unlisten = history.listen(() => {
      checkToken();
    });

    // Initial check on component mount
    checkToken();

    // Clean up the listener
    return () => unlisten();
  }, [history]);

  return (props) => (
    <>
      {loading && <div>Loading...</div>}
      {redirect && <Redirect to="/" />}
      
      {!loading && !redirect && <ComponentToProtect {...props} />}
    </>
  );
};

export default withAuth;
