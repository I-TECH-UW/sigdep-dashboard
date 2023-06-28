import React, { useState, useEffect } from 'react';

const Secret = () => {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/secret')
      .then(res => res.text())
      .then(res => setMessage(res));
  }, []);

  return (
    <div>
      <h1>Secret</h1>
      <p>{message}</p>
    </div>
  );
};

export default Secret;
