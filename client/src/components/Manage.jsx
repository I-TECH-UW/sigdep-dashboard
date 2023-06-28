import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

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


  return (
    <div>
      <h2>Upload configuration file below</h2>
     <form onSubmit={handleFormSubmit}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>

    <Modal isOpen={successModalOpen} onRequestClose={closeModal}>
        <h2>Success</h2>
        <p>File uploaded successfully!</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};


export default Manage;
