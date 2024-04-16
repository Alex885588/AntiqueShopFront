import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { useAuth } from '../../ContextApi/AuthContextApi';
import { EditCreateModal } from './EditCreateModal';
import { ToastContainer, toast } from 'react-toastify';
import { SearchAndActions } from './SearchAndActions';
import { ItemCard } from './Card';
import { CustomPagination } from './CustomPagination';
import { Spinner } from '../Spinner/Spinner';
import 'react-toastify/dist/ReactToastify.css';

export function HomePage() {
    const [items, setItems] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any>({});
    const [sort, setSort] = useState<'ASC' | 'DESC'>('ASC');
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [search, setSearch] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [updateList, setUpdateList] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const context = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let itemsList = await context?.apiService.getPaginatedListAndSearch(10, offset, sort);
                const result: number = Math.ceil(itemsList.totalCount / 10);
                setLoading(false)
                setLastPage(result);
                setItems(itemsList.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [offset, sort, updateList]);

    useEffect(() => {
        const debouncedSearch = setTimeout(() => {
            if (!search.trim()) {
                return;
            }
            const fetchData = async () => {
                try {
                    let itemsList = await context?.apiService.getPaginatedListAndSearch(10, offset, sort, search);
                    setItems(itemsList.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, 300);
        return () => clearTimeout(debouncedSearch);
    }, [search]);

    if (loading || !items) {
        return <Spinner />;
    }

    const deleteCurrentItem = async (itemId: number) => {
        try {
            await context?.apiService.deleteItem(itemId);
            toast.success("Successfully deleted item");
            setUpdateList(!updateList);
        } catch (error: any) {
            toast.error(error.message);
            console.error('Error deleting item:', error);
        }
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const openModal = (item: any) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedItem({});
        setShowModal(false);
    };

    const handleSort = () => {
        setSort(prevSort => (prevSort === 'ASC' ? 'DESC' : 'ASC'));
    };

    return (
        <>
            <Navbar />
            <Container className='pb-5'>
                <Row>
                    <Col>
                        <h1>LIVE AUCTION</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <SearchAndActions search={search} onSearch={onSearch} handleSort={handleSort} isAdmin={context?.isAdmin} openModal={openModal} sort={sort} />
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {items && items.map(item => (
                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    isAdmin={context?.isAdmin}
                                    openModal={openModal}
                                    deleteCurrentItem={deleteCurrentItem}
                                />
                            ))}
                        </Row>
                        <CustomPagination offset={offset} setOffset={setOffset} page={page} setPage={setPage} lastPage={lastPage} />
                    </Col>
                </Row>
            </Container>
            <Footer />
            <EditCreateModal showModal={showModal} closeModal={closeModal} item={selectedItem} updateList={updateList} setUpdateList={setUpdateList} />
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
    );
};
