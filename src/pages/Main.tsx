import { Box } from '@mui/material';
import styled from '@mui/system/styled';
import BaseBox from 'components/BaseBox';
import FormAddTransaction from 'components/FormAddTransaction';
import ListTransactions from 'components/ListTransactions';
import React from 'react';

const Header = styled('h1')(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontFamily: 'Arial, Helvetica, sans-serif',
    margin: 0,
}));

const BoxTransactions = styled(Box)({
    width: '100%',
});

const DivTransactions = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
});

const Main: React.FC = () => {
    return (
        <BaseBox isChangeCategory={true}>
            <BoxTransactions>
                <DivTransactions>
                    <Header>Список транзакцій</Header>
                    <FormAddTransaction />
                </DivTransactions>
                <ListTransactions />
            </BoxTransactions>
        </BaseBox>
    );
};

export default Main;
