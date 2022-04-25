import { Box } from '@mui/material';
import styled from '@mui/system/styled';
import BaseBox from 'components/BaseBox';
import FormAddTransaction from 'components/Forms/FormAddTransaction';
import ListTransactions from 'components/ListTransactions';
import PaginationTransactions from 'components/PaginationTransactions';
import SearchTransactions from 'components/SearchTransactions';
import React from 'react';

const Header = styled('h1')(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontFamily: 'Arial, Helvetica, sans-serif',
    margin: 0,
}));

const BoxTransactions = styled(Box)({
    display: 'grid',
    gridTemplateRows: 'auto auto 1fr auto',
    overflow: 'auto',
});

const BoxTitle = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
});

const Main: React.FC = () => {
    return (
        <BaseBox isChangeCategory={true}>
            <BoxTransactions>
                <BoxTitle>
                    <Header>Список транзакцій</Header>
                    <FormAddTransaction />
                </BoxTitle>
                <SearchTransactions />
                <ListTransactions />
                <PaginationTransactions />
            </BoxTransactions>
        </BaseBox>
    );
};

export default Main;
