import { Modal, Button } from 'react-bootstrap';

interface Props {
    showModal: boolean;
    notificationContent: { itemName: string; price: number };
    setShowModal: (t: boolean) => void
    setNotificationContent: any
}

export function WinningBidModal({ showModal, notificationContent, setShowModal, setNotificationContent }: Props) {
    const closeModal = () => {
        setShowModal(false);
        setNotificationContent('');
    };
    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>YOU WIN AUCTION OF {notificationContent.itemName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>You need to pay {notificationContent.price}$</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
