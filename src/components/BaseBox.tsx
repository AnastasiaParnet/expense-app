import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import FormAddCategory from 'components/Forms/FormAddCategory';
import ListCategories from 'components/ListCategories';
import React from 'react';

interface BaseBoxProps {
    isChangeCategory: boolean;
}

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

const BoxCategories = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        margin: '5px 0 20px 0',
    },
    [theme.breakpoints.up('md')]: {
        margin: '0 50px 0 0',
    },
}));

const BaseBox: React.FC<BaseBoxProps> = ({ children, isChangeCategory }) => {
    return (
        <BoxMain>
            <BoxCategories>
                <ListCategories isChangeCategory={isChangeCategory} />
                {isChangeCategory && <FormAddCategory />}
            </BoxCategories>
            {children}
        </BoxMain>
    );
};

export default BaseBox;
