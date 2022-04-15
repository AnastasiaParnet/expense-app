import { Box } from '@mui/material';
import styled from '@mui/system/styled';
import FormAddCategory from 'components/FormAddCategory';
import FormAddTransaction from 'components/FormAddTransaction';
import ListCategories from 'components/ListCategories';
import ListTransactions from 'components/ListTransactions';
import React from 'react';

const BoxMain = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '3%',
    justifyContent: 'space-between',
    [theme.breakpoints.up('xs')]: {
        flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        margin: '0 5%',
    },
    [theme.breakpoints.up('lg')]: {
        margin: '0 10%',
    },
    [theme.breakpoints.up('xl')]: {
        margin: '0 15%',
    },
}));

const BoxCategories = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        margin: '5px 0 20px 0',
    },
    [theme.breakpoints.up('md')]: {
        margin: '0 50px 0 0',
    },
}));

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
        <BoxMain>
            <BoxCategories>
                <ListCategories isChangeCategory={true} />
                <FormAddCategory />
            </BoxCategories>
            <BoxTransactions>
                <DivTransactions>
                    <Header>Список транзакцій</Header>
                    <FormAddTransaction />
                </DivTransactions>
                <ListTransactions />
            </BoxTransactions>
        </BoxMain>
    );
};

export default Main;
