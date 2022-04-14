import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import Chart from 'components/Chart';
import ListCategories from 'components/ListCategories';
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
        margin: '0 0 0 5%',
    },
    [theme.breakpoints.up('lg')]: {
        margin: '0 10%',
    },
    [theme.breakpoints.up('xl')]: {
        margin: '0 15%',
    },
}));

const BoxChart = styled(Box)(({ theme }) => ({
    height: '100%',
    margin: '10px',
    width: '100%',
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
