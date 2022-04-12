import DeleteIcon from '@mui/icons-material/Delete';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { CategoryAnother, ICategory } from 'models/ICategory';
import React from 'react';
import {
    changeActualCategories,
    changeCategoryForTransactions,
    deleteCategory,
} from 'store/reducers/ActionCreators';
import { authSelector } from 'store/reducers/AuthSlice';
import { categorySelector } from 'store/reducers/CategorySlice';
import FormEditCategory from './FormEditCategory';

interface ButtonGroupCategoriesProps {
    isDeleteCategory: boolean;
    closeNavMenu(): void;
}

const StatToggleButtonGroup = styled(ToggleButtonGroup)({
    width: '200px',
});

const ButtonGroupCategories: React.FC<ButtonGroupCategoriesProps> = ({
    isDeleteCategory,
    closeNavMenu,
}) => {
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);
    const { categories, actualCategories } = useAppSelector(categorySelector);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newCategories: number[]
    ) => {
        dispatch(changeActualCategories(newCategories));
        closeNavMenu();
    };

    const clickDeleteCategory = (idCategory: number, idUser: number | null) => {
        if (idUser) {
            dispatch(deleteCategory({ idUser, idCategory }));
            dispatch(changeCategoryForTransactions({ idUser, idCategory }));
        }
    };

    return (
        <>
            <StatToggleButtonGroup
                orientation="vertical"
                value={actualCategories}
                onChange={handleChange}
            >
                {categories.map((category: ICategory) => (
                    <ToggleButton key={category.id} value={category.id}>
                        {category.label}
                        {isDeleteCategory && (
                            <div>
                                <FormEditCategory
                                    id={category.id}
                                    name={category.label}
                                />
                                <DeleteIcon
                                    onClick={() =>
                                        clickDeleteCategory(category.id, idUser)
                                    }
                                />
                            </div>
                        )}
                    </ToggleButton>
                ))}
                <ToggleButton value={CategoryAnother.id}>
                    {CategoryAnother.label}
                </ToggleButton>
            </StatToggleButtonGroup>
        </>
    );
};

export default ButtonGroupCategories;
