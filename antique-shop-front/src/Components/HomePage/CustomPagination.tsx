import { Pagination } from 'react-bootstrap';

interface CustomPaginationProps {
    offset: number;
    setOffset: (offset: number) => void;
    page: number;
    setPage: (page: number) => void;
    lastPage: number;
}

export function CustomPagination({ offset, setOffset, page, setPage, lastPage }: CustomPaginationProps) {
    return (
        <Pagination className='mb-5 mt-5 justify-content-center'>
            {offset !== 0 && (
                <Pagination.Prev
                    onClick={() => {
                        setOffset(offset - 10);
                        setPage(page - 1);
                    }}
                />
            )}
            {[...Array(lastPage)].map((_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === page}
                    onClick={() => {
                        setOffset(index * 10);
                        setPage(index + 1);
                    }}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            {lastPage > page && (
                <Pagination.Next
                    onClick={() => {
                        setOffset(offset + 10);
                        setPage(page + 1);
                    }}
                />
            )}
        </Pagination>
    );
}
