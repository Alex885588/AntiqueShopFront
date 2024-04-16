import { useEffect, useState } from 'react';
import { ToastContainer } from "react-toastify";
import { Form, Button, Table } from 'react-bootstrap';
import { useAuth } from "../../ContextApi/AuthContextApi";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { BillModal } from "./BillModal";

export function ProfilePage() {
    const [balance, setBalance] = useState(0);
    const [notificationPercentage, setNotificationPercentage] = useState(0);
    const [historyOfBid, setHistoryOfBid] = useState<any>(false);
    const [showBillModal, setShowBillModal] = useState(false);
    const [selectedBid, setSelectedBid] = useState('');
    const context = useAuth()

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const user = await context?.apiService.getUserById()
                const historyOfBids = await context?.apiService.getLastBidsByUserIdList()
                if (historyOfBids?.data.length !== 0)
                    setHistoryOfBid(historyOfBids?.data)
                setBalance(user?.data.autoBidBalance)
                setNotificationPercentage(user?.data.notificationParcentage)
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        if (context?.isAuthenticated) {
            fetchItemData();
        }
    }, [context?.isAuthenticated]);

    const handleBalanceChange = (e: any) => {
        setBalance(e.target.value);
    };

    const handlePercentageChange = (e: any) => {
        setNotificationPercentage(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await context?.apiService.updateUser(balance, notificationPercentage)
        setBalance(result?.data.autoBidBalance)
        setNotificationPercentage(result?.data.notificationPercentage)
    };

    const handleBillButtonClick = (bid: any) => {
        setSelectedBid(bid);
        setShowBillModal(true);
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Profile Page</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-4' controlId="balance">
                        <Form.Label>Balance</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter balance"
                            value={balance}
                            onChange={handleBalanceChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-4' controlId="notificationPercentage">
                        <Form.Label>Notification Percentage</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter notification percentage"
                            value={notificationPercentage}
                            onChange={handlePercentageChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
                {historyOfBid && <><h1 className="mt-5">Bidding History</h1>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item Name</th>
                                <th>Bid Amount</th>
                                <th>Bid Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyOfBid?.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.antiques.name}</td>
                                    <td>{item.bidAmount}$</td>
                                    <td>
                                        {item.bidStatus ? item.bidStatus : (item.antiques.biddingInProgress ? "in progress" : "lost")}
                                    </td>
                                    <td>{item.bidStatus ? <Button onClick={() => handleBillButtonClick(item.antiques.currentBid)}>Bill</Button> : null}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table></>}
            </div>
            <Footer />
            <BillModal selectedBid={selectedBid} showBillModal={showBillModal} setShowBillModal={setShowBillModal} />
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
        </>
    )
}