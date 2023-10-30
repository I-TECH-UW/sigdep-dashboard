import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex, Box, Input, Button, HStack, VStack, Center } from "@chakra-ui/react";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          navigate('/home'); // Redirect to "/home"

        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error logging in. Please try again.');
      });
  };
  const centerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%', // Set the height to 100%,
    padding: '50px', // Add padding for better spacing
    justifyContent: 'flex-start', // Distribute content evenly

  };

  const inputStyle = {
    marginBottom: '15px', // Add margin bottom for spacing between input fields
  };

  const buttonStyle = {
    backgroundColor: "blue.500",
    color: "blue",
    _hover: {
      backgroundColor: "blue.700",
    },
    _focus: {
      boxShadow: "outline",
    },
  };
  return (

<div style={{ width: '100%', height: '50%' }}>
<form onSubmit={onSubmit} style={formStyle}>
            <h1           style={inputStyle} // Apply the inputStyle to add spacing
>SignIn Below!</h1>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleInputChange}
              required
              style={inputStyle} // Apply the inputStyle to add spacing

            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleInputChange}
              required
              style={inputStyle} // Apply the inputStyle to add spacing

            />
            <input type="submit" value="Submit"           style={buttonStyle} // Apply the inputStyle to add spacing
/>
          </form>

          </div>
  );
};


export default SignIn;
