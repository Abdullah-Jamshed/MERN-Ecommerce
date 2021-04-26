import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalComponent = ({ show, onHide, children, handlerFunction, id }) => {
  const handle = (id) => {
    handlerFunction(id);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handle(id)}>Delete</Button>
        <Button variant='light' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
