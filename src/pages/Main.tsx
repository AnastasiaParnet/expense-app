import { Box, Typography } from '@mui/material';
import styled from '@mui/system/styled';
import BaseBox from 'components/Box/BaseBoxHomePage';
import FilterTransactions from 'components/FilterTransactions';
import FormAddTransaction from 'components/Forms/FormAddTransaction';
import ListTransactions from 'components/ListTransactions';
import PaginationTransactions from 'components/PaginationTransactions';
import React from 'react';

const BoxTransactions = styled(Box)({
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr auto',
    overflow: 'auto',
});

const BoxTitle = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
});

const Main: React.FC = () => {
    return (
        <BaseBox isChangeCategory={true}>
            <BoxTransactions>
                <BoxTitle>
                    <Typography variant="h1">Список транзакцій</Typography>
                    <FormAddTransaction />
                </BoxTitle>
                <FilterTransactions />
                <ListTransactions />
                <PaginationTransactions />
            </BoxTransactions>
        </BaseBox>
    );
};

export default Main;
