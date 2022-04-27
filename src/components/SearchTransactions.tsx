import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useDebounce } from 'hooks/react';
import React, { useEffect, useState } from 'react';

interface SearchTransactionsProps {
    setSearch: (search: string) => void;
}

const SearchTextField = styled(TextField)({
    gridColumn: '1/span 2',
});

const SearchTransactions: React.FC<SearchTransactionsProps> = ({
    setSearch,
}) => {
    const [inputSearch, setInputSearch] = useState<string>('');

    const debouncedSearch = useDebounce(inputSearch, 300);

    useEffect(() => {
        setSearch(debouncedSearch);
    }, [debouncedSearch, setSearch]);

    return (
        <SearchTextField
            fullWidth
            id="outlined-basic"
            label="Пошук транзакції по назві"
            variant="outlined"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
        />
    );
};

export default SearchTransactions;
