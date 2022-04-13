import { ToggleButton } from '@mui/material';
import styled from '@mui/system/styled';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { CategoryAnother } from 'models/ICategory';
import React from 'react';
import { changeActualCategories } from 'store/reducers/ActionCreators';
import { categorySelector } from 'store/reducers/CategorySlice';

const StatToggleButton = styled(ToggleButton)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        width: '150px',
        margin: '0',
    },
    [theme.breakpoints.up('md')]: {
        width: '200px',
        margin: '0 0 10px 0',
    },
}));

const ButtonAllCategories = () => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector(categorySelector);

    const allCategories = () => {
        let masIdCategories = categories.map((category) => category.id);
        masIdCategories = [...masIdCategories, CategoryAnother.id];
        dispatch(changeActualCategories(masIdCategories));
    };

    return (
        <StatToggleButton value="" onClick={allCategories}>
            Всі категорії
        </StatToggleButton>
    );
};

export default ButtonAllCategories;
