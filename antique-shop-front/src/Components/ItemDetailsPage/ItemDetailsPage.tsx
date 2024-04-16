import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { useAuth } from '../../ContextApi/AuthContextApi';
import { useParams } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { BiddingOptions } from './BiddingOptions';
import { BiddingResults } from './BiddingResult';
import { WinningBidModal } from './WinningBidModal';
import { NoParticipantsModal } from './NoParticipantsModal ';
import { useSocket } from '../../Hooks/socket.hooks';

export function ItemDetailsPage() {
    const { id } = useParams();
    const itemId = parseInt(id!);
    const context = useAuth();
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [bid, setBid] = useState(0);
    const [currentBid, setCurrentBid] = useState(0);
    const [autoBidCheckbox, setAutoBidCheckbox] = useState(false);
    const [winner, setWinner] = useState(false);
    const [isBiddingOver, setBiddingOver] = useState(true);
    const [winnerUsername, setWinnerUsername] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showNoPartModal, setShowNoPartModal] = useState(false);
    const [notificationContent, setNotificationContent] = useState<any>({});
    const [historyOfBids, setHistoryOfBids] = useState<any>(null);

    const { socket } = useSocket();
    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.on('antiqueUpdated', (response: any) => {
            if (!response?.value) {
                return null;
            }
            setCurrentBid(response.value);
            setBid(parseInt(response.value) + 1);
            setWinner(false)
        });
        socket.on('antiquesUpdateError', (error: any) => {
            toast.error(error?.message)
        });
        socket.on('antiquesWin', (response: any) => {
            if (response.notification) {
                toast.success("Bidding Alert");
            }
            setWinner(true)
        })
        socket.on('notificationAboutWin', (response: any) => {
            setNotificationContent(response);
            setShowModal(true);
        })
    }, [socket]);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const allInformationAboutItem = await context?.apiService.getAllInformationAboutItemById(itemId)
                setBiddingOver(allInformationAboutItem?.data.antiqueInfo.biddingInProgress)
                setItem(allInformationAboutItem?.data.antiqueInfo);
                setCurrentBid(allInformationAboutItem?.data.antiqueInfo.currentBid);
                setBid(allInformationAboutItem?.data.antiqueInfo.currentBid + 1);
                if (allInformationAboutItem?.data.historyOfBids.length === 0 && !allInformationAboutItem?.data.antiqueInfo.biddingInProgress) {
                    setShowNoPartModal(true)
                    setLoading(false);
                    return
                }
                if (allInformationAboutItem?.data.winnerInformation && allInformationAboutItem?.data.winnerInformation.user_id === context?.userId) {
                    setWinner(true)
                }
                if (!allInformationAboutItem?.data.antiqueInfo.biddingInProgress) {
                    setHistoryOfBids(allInformationAboutItem?.data.historyOfBids)
                    setWinnerUsername(allInformationAboutItem?.data.username)
                }
                if (allInformationAboutItem?.data.autoBids) {
                    setAutoBidCheckbox(allInformationAboutItem?.data.autoBids)
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        if (context?.isAuthenticated) {
            fetchItemData();
        }
    }, [itemId, context?.isAuthenticated, context?.apiService, bid, isBiddingOver]);

    if (loading || !item) {
        return <Spinner />;
    }

    const handleChange = (e: any) => {
        const newBid = parseFloat(e.target.value);
        if (newBid > currentBid) setBid(e.target.value);
    };

    const biddingItem = async () => {
        if (bid <= currentBid) {
            toast.error('Bid must be more than the previous one');
            return;
        }
        if (socket) {
            socket.emit('updateAntiques', { id: itemId, currentBid: bid });
        }
    };

    const handleAutoBidCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!autoBidCheckbox) {
            try {
                const result = await context?.apiService.autoBidOn(itemId)
                if (result) {
                    setAutoBidCheckbox(true);
                    return
                }
            } catch (error: any) {
                console.log(error)
                toast.error(error.response.data.message);
                return
            }
        } else {
            const result = await context?.apiService.autoBidOff(itemId)
            if (result) {
                setAutoBidCheckbox(false);
                return
            }
        }
    };

    return (
        <>
            <Navbar />
            <Container className="mt-5 item-details-page pb-5">
                <Row className="mb-5">
                    <Col md={6}>
                        <h2>{item?.name}</h2>
                        <img className="img-fluid" src={item?.antiquesImg} alt="Item Image" style={{ width: '400px', height: '400px' }} />
                        <div className="mb-3">
                            <h5>Item Description:</h5>
                            <p>{item?.description}</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        {showNoPartModal && <NoParticipantsModal />}
                        {!showNoPartModal && isBiddingOver && (
                            <BiddingOptions
                                bid={bid}
                                currentBid={currentBid}
                                autoBidCheckbox={autoBidCheckbox}
                                handleChange={handleChange}
                                biddingItem={biddingItem}
                                handleAutoBidCheckboxChange={handleAutoBidCheckboxChange}
                                winner={winner}
                                biddingTimeLimit={item?.biddingTimeLimit}
                                setBiddingOver={setBiddingOver}
                            />
                        )
                        }
                        {
                            !showNoPartModal && !isBiddingOver && (
                                <BiddingResults winnerUsername={winnerUsername} currentBid={currentBid} historyOfBids={historyOfBids} />
                            )
                        }

                    </Col>
                </Row>
            </Container>
            <Footer />
            <WinningBidModal showModal={showModal} notificationContent={notificationContent} setShowModal={setShowModal} setNotificationContent={setNotificationContent} />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>);
}
