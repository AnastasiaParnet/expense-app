import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useDebounce } from 'hooks/react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect, useState } from 'react';
import {
    changePageParams,
    transactionSelector,
} from 'store/reducers/TransactionSlice';

const SearchTextField = styled(TextField)({
    margin: '10px 0',
});

const SearchTransactions = () => {
    const dispatch = useAppDispatch();
    const { pageParams } = useAppSelector(transactionSelector);
    const [inputSearch, setInputSearch] = useState<string>('');

    const debouncedSearch = useDebounce(inputSearch, 300);

    useEffect(() => {
        dispatch(changePageParams({ ...pageParams, search: debouncedSearch }));
    }, [debouncedSearch, dispatch]);

    return (
        <SearchTextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="Пошук транзакції по назві"
            variant="outlined"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
        />
    );
};

export default SearchTransactions;
