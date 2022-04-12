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
    justifyContent: 'center',
    [theme.breakpoints.up('xs')]: {
        flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        margin: '0 5%',
    },
}));

const BoxCategories = styled(Box)({
    margin: '0 50px 0 0',
});

const Header = styled('h1')(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontFamily: 'Arial, Helvetica, sans-serif',
    margin: 0,
}));

const BoxTransactions = styled(Box)(({ theme }) => ({
    margin: '0px 10px',
    [theme.breakpoints.up('md')]: {
        width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '80%',
    },
    [theme.breakpoints.up('xl')]: {
        width: '60%',
    },
}));

const DivTransactions = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
});

const Main: React.FC = () => {
    return (
        <BoxMain>
            <BoxCategories>
                <ListCategories isDeleteCategory={true} />
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
