import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    body: string,
    onDelete: () => void;
}

const ConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ show, onHide: onConfirm, body, onDelete }) => {
    return (
        <Modal show={show} onHide={onConfirm}>
            <Modal.Header closeButton>
                <Modal.Title>Please Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onConfirm}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
