import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  Input,
  Button,
  HStack,
  VStack,
  Center,
} from "@chakra-ui/react";
//import { Flex, Input, Button } from "@chakra-ui/react";

const Register = () => {
  const [firstname, setFirstName] = useState('');
  const [middle, setMiddleName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'firstname':
        setFirstName(value);
        break;
      case 'middle':
        setMiddleName(value);
        break;
      case 'lastname':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // Validate password and confirm password match
    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    // Continue with registration logic
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstname, middle, lastname }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(firstname);
        console.log(middle);
        console.log(lastname);


        if (res.status === 200) {
          navigate('/home'); // Redirect to "/home"
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error registering user. Please try again.');
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
    marginBottom: '15px', // Add margin bottom for spacing between input fields,
    borderColor: "gray.300", // Set border color
    borderWidth: "1px",      // Set border width
    borderRadius: "md",      // Set border radius
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
    <div style={{ width: '100%', height: '100%' }}>
      <form onSubmit={onSubmit} style={formStyle}>
      <h1 >Register Below!</h1>

  <table >
    <tbody>
      <tr>
        <td>
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="firstname" >First Name:</label>
        </td>
        <td>
          <Input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            value={firstname}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="middle" >Middle Name (optional):</label>
        </td>
        <td>
          <Input
            type="text"
            id="middle"
            name="middle"
            placeholder="Middle Name (optional)"
            value={middle}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="lastname" >Last Name:</label>
        </td>
        <td>
          <Input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            value={lastname}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="email" >Email:</label>
        </td>
        <td>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="password" >Password:</label>
        </td>
        <td>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="confirmPassword" >Confirm Password:</label>
        </td>
        <td>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </td>
      </tr>
      <tr>
        <td colSpan="2">
        </td>
      </tr>
    </tbody>
  </table>
  <Button type="submit" style={buttonStyle}>Submit</Button>

</form>


    </div>
  );
};

export default Register;
