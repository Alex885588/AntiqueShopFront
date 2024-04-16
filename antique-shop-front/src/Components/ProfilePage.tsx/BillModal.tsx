import { Button, Modal } from "react-bootstrap";

export function BillModal({ selectedBid, showBillModal, setShowBillModal }: any) {
    return (<Modal show={showBillModal} onHide={() => setShowBillModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Bill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>YOU NEED TO PAY {selectedBid}$</h4>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowBillModal(false)}>Close</Button>
        </Modal.Footer>
    </Modal>)
}