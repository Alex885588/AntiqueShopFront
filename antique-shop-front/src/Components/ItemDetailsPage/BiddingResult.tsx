import { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

interface BiddingResultsProps {
    winnerUsername: string;
    currentBid: number;
    historyOfBids: any
}

export function BiddingResults({ winnerUsername, currentBid, historyOfBids }: BiddingResultsProps) {
    const [historyModal, setHistoryModal] = useState(false);

    const openModal = async () => {
        setHistoryModal(true);
    };

    const closeModal = () => {
        setHistoryModal(false);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="text-center">
                        <h1 className="mb-4">Bidding is Over</h1>
                        <div className="card p-4">
                            <div className="card-body">
                                <h2 className="card-title mb-4">Bidding Results</h2>
                                <div className="alert alert-success mb-3" role="alert">
                                    Winner of the auction is <strong>{winnerUsername}</strong>
                                </div>
                                <div className="alert alert-success" role="alert">
                                    Final Price For Current Item is <strong>{currentBid}$</strong>
                                </div>
                                <button type="button" className="btn btn-primary mt-3" onClick={openModal}>
                                    Open Bidding History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {historyModal && (
                <>
                    <Modal show={historyModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Bidding History</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User</th>
                                        <th>Bid Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyOfBids.map((bid: any, index: number) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{bid.user_username}</td>
                                            <td>{bid.bid_bidAmount}$</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
}
