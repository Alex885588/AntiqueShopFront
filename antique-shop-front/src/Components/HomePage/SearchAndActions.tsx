import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

interface SearchAndActionsProps {
    search: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSort: () => void;
    isAdmin?: boolean;
    openModal: (item: any) => void;
    sort: 'ASC' | 'DESC';
}

export function SearchAndActions({ search, onSearch, handleSort, isAdmin, openModal, sort }: SearchAndActionsProps) {
    return (
        <> <InputGroup className="mb-3">
            <FormControl
                placeholder="Search by Name or Description"
                value={search}
                onChange={onSearch}
            />
            <Button variant="primary" onClick={handleSort} style={{ width: '150px' }}>
                Sort {sort === 'ASC' ? 'Ascending' : 'Descending'}
            </Button>
        </InputGroup>
            <div className="admin-actions mb-2">
                {isAdmin !== undefined && isAdmin && (
                    <Button variant="success" onClick={() => openModal(null)}>
                        Create New Item<Plus />
                    </Button>
                )}
            </div></>

    );
}
