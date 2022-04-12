import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import Chart from 'components/Chart';
import ListCategories from 'components/ListCategories';
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

const BoxChart = styled(Box)(({ theme }) => ({
    height: '100%',
    margin: '10px',
    [theme.breakpoints.up('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
        width: '60%',
    },
    [theme.breakpoints.up('xl')]: {
        width: '50%',
    },
}));

const Graphics: React.FC = () => {
    return (
        <BoxMain>
            <Box>
                <ListCategories isDeleteCategory={false} />
            </Box>
            <BoxChart>
                <Chart />
            </BoxChart>
        </BoxMain>
    );
};

export default Graphics;
