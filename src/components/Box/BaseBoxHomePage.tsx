import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import FormAddCategory from 'components/Forms/FormAddCategory';
import ListCategories from 'components/ListCategories';
import React from 'react';

interface BaseBoxHomePageProps {
    isChangeCategory: boolean;
}

const BoxMain = styled(Box)(({ theme }) => ({
    display: 'grid',
    padding: '3%',
    overflow: 'auto',
    [theme.breakpoints.up('xs')]: {
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr',
        gridRowGap: '20px',
    },
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: '1fr',
        gridColumnGap: '50px',
        margin: '0 0 0 5%',
    },
    [theme.breakpoints.up('lg')]: {
        margin: '0 10%',
    },
    [theme.breakpoints.up('xl')]: {
        margin: '0 15%',
    },
}));

const BaseBoxHomePage: React.FC<BaseBoxHomePageProps> = ({
    children,
    isChangeCategory,
}) => {
    return (
        <BoxMain>
            <Box>
                <ListCategories isChangeCategory={isChangeCategory} />
                {isChangeCategory && <FormAddCategory />}
            </Box>
            {children}
        </BoxMain>
    );
};

export default BaseBoxHomePage;
