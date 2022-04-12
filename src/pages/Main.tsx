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
    },
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

const Main: React.FC = () => {
    return (
        <BoxMain>
            <Box>
                <ListCategories isDeleteCategory={true} />
                <FormAddCategory />
            </Box>
            <BoxTransactions>
                <ListTransactions />
                <FormAddTransaction />
            </BoxTransactions>
        </BoxMain>
    );
};

export default Main;
