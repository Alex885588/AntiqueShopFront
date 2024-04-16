import { useState } from 'react';
import { Card, Button, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Pencil } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from './ConfirmationModal';

interface ItemCardProps {
    item: {
        id: number;
        antiquesImg: string;
        name: string;
        description: string;
        currentBid: number;
    };
    isAdmin?: boolean;
    openModal: (item: any) => void;
    deleteCurrentItem: (itemId: number) => void;
}

export function ItemCard({ item, isAdmin, openModal, deleteCurrentItem }: ItemCardProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        deleteCurrentItem(item.id);
        setShowDeleteModal(false);
    };

    return (
        <Col key={item.id}>
            <Card style={{ width: '18rem', height: '28rem', padding: '15px' }}>
                <Card.Img
                    variant="top"
                    src={item.antiquesImg}
                    style={{ height: '200px', width: '200px', display: 'block', margin: 'auto' }}
                />
                <Card.Body style={{ height: '10rem', overflow: 'hidden', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Card.Title style={{ minHeight: '3rem', maxHeight: '3rem', overflow: 'hidden' }}>{item.name}</Card.Title>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id={`tooltip-${item.id}`}>{item.description}</Tooltip>}
                    >
                        <Card.Text style={{ overflow: 'hidden', flexGrow: 1 }}>{item.description}</Card.Text>
                    </OverlayTrigger>
                    <Card.Text>Current Bid: {item.currentBid >= 0 ? `${item.currentBid}$` : 'N/A'}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <NavLink to={`/item-details/${item?.id}`}>
                            <Button variant="success" size="sm">
                                Bid Now
                            </Button>
                        </NavLink>
                        {isAdmin && (
                            <div className="d-flex align-items-center">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => openModal(item)}
                                >
                                    <Pencil />
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
            <ConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
                body={"Are you sure you want to delete this item?"}
            />
        </Col>
    );
}
