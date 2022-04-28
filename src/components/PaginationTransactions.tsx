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

const PaginationTransactions: React.FC = () => {
    const dispatch = useAppDispatch();
    const [countPages, setCountPages] = useState<number>(1);
    const { totalTransactions, pageParams } =
        useAppSelector(transactionSelector);

    useEffect(() => {
        const newCountPages = Math.ceil(totalTransactions / pageParams.limit);
        if (newCountPages == 0)
            dispatch(changePageParams({ ...pageParams, page: 1 }));
        else if (newCountPages < pageParams.page)
            dispatch(changePageParams({ ...pageParams, page: newCountPages }));
        setCountPages(newCountPages);
    }, [dispatch, pageParams.limit, totalTransactions]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(changePageParams({ ...pageParams, page: value }));
    };

    return (
        <>
            {countPages > 0 && (
                <StatPagination
                    count={countPages}
                    page={pageParams.page}
                    variant="outlined"
                    color="primary"
                    onChange={handleChange}
                />
            )}
        </>
    );
};

export default PaginationTransactions;
