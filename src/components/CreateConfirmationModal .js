import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const CreateConfirmationModal = ({ show, onHide }) => {

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Created successfully!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateConfirmationModal;
