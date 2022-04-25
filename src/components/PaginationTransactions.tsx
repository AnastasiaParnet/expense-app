import { Pagination } from '@mui/material';
import { styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect, useState } from 'react';
import {
    changePageParams,
    transactionSelector,
} from 'store/reducers/TransactionSlice';

const StatPagination = styled(Pagination)({
    display: 'flex',
    justifyContent: 'center',
});

const PaginationTransactions = () => {
    const dispatch = useAppDispatch();
    const [countPages, setCountPages] = useState<number>(1);
    const { totalTransactions, pageParams } =
        useAppSelector(transactionSelector);

    useEffect(() => {
        const newCountPages = Math.ceil(totalTransactions / pageParams.limit);
        if (newCountPages < pageParams.page)
            dispatch(changePageParams({ ...pageParams, page: newCountPages }));
        setCountPages(newCountPages);
    }, [dispatch, pageParams.limit, totalTransactions]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(changePageParams({ ...pageParams, page: value }));
    };

    return (
        <StatPagination
            count={countPages}
            page={pageParams.page}
            variant="outlined"
            color="primary"
            onChange={handleChange}
        />
    );
};

export default PaginationTransactions;
