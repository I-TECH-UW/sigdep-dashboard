import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Flex, Box, Input, Button, HStack, VStack, Center } from "@chakra-ui/react";

const Manage = () => {
  const [file, setFile] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        await fetch('/upload', {
          method: 'POST',
          body: formData,
        });

        // File uploaded successfully
        console.log('File uploaded successfully');
            // Open the success modal
    setSuccessModalOpen(true);
      } catch (error) {
        // Error occurred during file upload
        console.error('Error uploading file', error);
      }
    }
        // Reset the form after submission
        event.target.reset();
        setFile(null);
  };
  const closeModal = () => {
    setSuccessModalOpen(false);
  };
  const buttonStyle = {
    backgroundColor: "blue.500",
    color: "blue",
    width: "200px", 
    height: "40px" ,
    _hover: {
      backgroundColor: "blue.700",
    },
    _focus: {
      boxShadow: "outline",
    },
  };

  return (
    <VStack h="80vh" justify="space-evenly" align="center"  spacing={0}>
      <div>
    <h2>Upload configuration file below</h2>
     <form onSubmit={handleFormSubmit}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button type="submit" style={buttonStyle}>Upload</button>
    </form>
    </div>
    <Modal isOpen={successModalOpen} onRequestClose={closeModal}>
        <h2>Success</h2>
        <p>File uploaded successfully!</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </VStack>
  );
};


export default Manage;
