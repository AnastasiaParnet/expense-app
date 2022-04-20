import { Box } from '@mui/material';
import styled from '@mui/system/styled';
import BaseBox from 'components/BaseBox';
import FormAddTransaction from 'components/Forms/FormAddTransaction';
import ListTransactions from 'components/ListTransactions';
import React from 'react';

const Header = styled('h1')(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontFamily: 'Arial, Helvetica, sans-serif',
    margin: 0,
}));

const BoxTransactions = styled(Box)({
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
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
                <ListTransactions />
            </BoxTransactions>
        </BaseBox>
    );
};

export default Main;
