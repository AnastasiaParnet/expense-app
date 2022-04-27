import { Alert, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Loader from 'components/UI/Loader';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { transactionSelector } from 'store/reducers/TransactionSlice';

const BoxMessageTransactions = () => {
    const { isLoading, error, transactions } =
        useAppSelector(transactionSelector);
    return (
        <Box sx={{ textAlign: 'center' }}>
            {isLoading && <Loader />}
            {error && <Alert severity="error">{error}</Alert>}
            {!isLoading && !error && transactions.length == 0 && (
                <Typography variant="h1">
                    За цим запитом немає транзакцій
                </Typography>
            )}
        </Box>
    );
};

export default BoxMessageTransactions;
