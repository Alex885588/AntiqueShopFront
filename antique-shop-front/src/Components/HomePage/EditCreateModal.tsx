import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { useAuth } from '../../ContextApi/AuthContextApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ItemModalProps {
    showModal: boolean;
    closeModal: () => void;
    item: any;
    updateList: boolean;
    setUpdateList: (t: boolean) => void;
}

export function EditCreateModal({ showModal, closeModal, item, updateList, setUpdateList }: ItemModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [currentBid, setCurrentBid] = useState(0);
    const [biddingTimeLimit, setBiddingTimeLimit] = useState('');
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [formChanged, setFormChanged] = useState(false);
    const context = useAuth();

    useEffect(() => {
        setName(item ? item.name || '' : '');
        setDescription(item ? item.description || '' : '');
        setCurrentBid(item ? item.currentBid || 0 : 0);
        setBiddingTimeLimit(item ? item.biddingTimeLimit || '' : '');
        setImage(item ? item.antiquesImg || '' : '');
    }, [item]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('currentBid', currentBid.toString());
        formData.append('biddingTimeLimit', biddingTimeLimit);
        if (imageFile) {
            formData.append('file', imageFile);
        }
        try {
            if (item) {
                await context?.apiService.updateItem(item.id, formData);
                toast.success("Successfully edited");
            } else {
                await context?.apiService.createItem(formData);
                toast.success("Successfully created");
            }
            setUpdateList(!updateList);
            closeModal();
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data.message);
            console.error('Error saving item:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const handleFormChanged = (name: string, value: string) => {
            if (item && item[name] !== value) {
                setFormChanged(true);
            }
        };
        const handleCurrentBidChange = (value: string) => {
            const parsedValue = parseFloat(value);
            if (parsedValue <= 0) {
                setCurrentBid(0);
            } else {
                setCurrentBid(parsedValue);
            }
        };
        const handleImageFile = () => {
            const file = (e.target as HTMLInputElement).files?.[0];
            setImageFile(file || null);
        };
        const handleTextChange = (name: string, value: string) => {
            switch (name) {
                case 'name':
                    setName(value);
                    break;
                case 'description':
                    setDescription(value);
                    break;
                case 'biddingTimeLimit':
                    const selectedDateTime = new Date(value).getTime();
                    const currentDateTime = new Date().getTime();
                    if (selectedDateTime >= currentDateTime) {
                        setBiddingTimeLimit(value);
                    } else {
                        toast.error('Please select a date and time greater than the current date and time.');
                    }
                    break;
                default:
                    break;
            }
        };
        handleFormChanged(name, value);
        if (name === 'currentBid') {
            handleCurrentBidChange(value);
        } else if (name === 'image') {
            handleImageFile();
        } else {
            handleTextChange(name, value);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (file) {
                const validFormats = ['image/jpeg', 'image/png'];
                if (!validFormats.includes(file.type)) {
                    throw new Error('Please upload a valid JPG or PNG image.');
                }
                const maxSizeInBytes = 5 * 1024 * 1024;
                if (file.size > maxSizeInBytes) {
                    throw new Error('Please upload an image with a size less than 5MB.');
                }
                setImageFile(file);
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImage(reader.result as string);
                    }
                };
                reader.readAsDataURL(file);
            }
        } catch (error: any) {
            toast.error(error.message);
            console.error('Error updating image:', error);
        }
    };

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{item ? 'Edit Item' : 'Create New Item'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSave}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" name="name" value={name} onChange={handleInputChange} required={!item} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={description} onChange={handleInputChange} required={!item} />
                    </Form.Group>
                    <Form.Group controlId="formCurrentBid">
                        <Form.Label>Current Bid</Form.Label>
                        <Form.Control placeholder="Enter price" name="currentBid" type='number' value={currentBid} onChange={handleInputChange} required={!item} />
                    </Form.Group>
                    <Form.Group controlId="formBiddingTimeLimit">
                        <Form.Label>Bidding Time Limit</Form.Label>
                        <Form.Control type="datetime-local" name="biddingTimeLimit" value={biddingTimeLimit} onChange={handleInputChange} required={!item} />
                    </Form.Group>
                    {image && (
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6">
                                    <img className='img-fluid' src={image} alt="Item Image" style={{ height: "200px", width: "200px" }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <Form.Group controlId="formItemImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" accept="image/*" name="image" onChange={handleImageUpload} required={!item} />
                    </Form.Group>
                    <Col className="text-end">
                        <Button type="submit" variant="success" className="me-2 mt-2" disabled={loading || (!formChanged && item)}>
                            {loading ? (item ? 'Saving...' : 'Creating...') : (item ? 'Save' : 'Create')}
                        </Button>
                        <Button type="submit" variant="secondary" className="mt-2" onClick={closeModal} disabled={loading}>Close</Button>
                    </Col>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
