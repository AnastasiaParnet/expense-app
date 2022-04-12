import DeleteIcon from '@mui/icons-material/Delete';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { CategoryAnother, ICategory } from 'models/ICategory';
import React, { useEffect } from 'react';
import {
    changeActualCategory,
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
    const { categories, actualCategory } = useAppSelector(categorySelector);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        nextView: number
    ) => {
        let idActualCategory = nextView;
        if (!idActualCategory) idActualCategory = CategoryAnother.id;
        dispatch(changeActualCategory(idActualCategory));
        closeNavMenu();
    };

    const clickDeleteCategory = (idCategory: number, idUser: number | null) => {
        if (idUser) {
            dispatch(deleteCategory({ idUser, idCategory }));
            dispatch(changeCategoryForTransactions({ idUser, idCategory }));
        }
    };

    useEffect(() => {
        if (
            categories.findIndex(
                (category: ICategory) => category.id == actualCategory
            ) == -1
        )
            dispatch(changeActualCategory(CategoryAnother.id));
    }, [actualCategory, categories, dispatch]);

    return (
        <StatToggleButtonGroup
            orientation="vertical"
            value={actualCategory}
            exclusive
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
    );
};

export default ButtonGroupCategories;
