import DeleteIcon from '@mui/icons-material/Delete';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { CategoryAnother, ICategory } from 'models/ICategory';
import React, { useEffect, useState } from 'react';
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
    const { categories, arrayIdActualCategories } =
        useAppSelector(categorySelector);
    const [actualCategories, setActualCategories] = useState<string[]>(
        arrayIdActualCategories
    );

    const clickDeleteCategory = (idCategory: string, idUser: string | null) => {
        if (idUser) {
            dispatch(deleteCategory({ idUser, idCategory }));
            dispatch(changeCategoryForTransactions({ idUser, idCategory }));
        }
    };

    const clickAllTransactions = () => {
        setActualCategories([]);
    };

    const clickOnCategory = (id: string) => {
        if (actualCategories.includes(id)) {
            setActualCategories(actualCategories.filter((el) => el !== id));
        } else setActualCategories([...actualCategories, id]);
    };

    useEffect(() => {
        dispatch(changeActualCategories(actualCategories));
        closeNavMenu();
    }, [closeNavMenu, dispatch, actualCategories]);

    return (
        <>
            <StatToggleButtonGroup
                orientation="vertical"
                value={actualCategories}
            >
                <ToggleButton value="" onClick={clickAllTransactions}>
                    Всі транзакції
                </ToggleButton>
                {categories.map((category: ICategory) => (
                    <ToggleButton
                        key={category.id}
                        value={category.id}
                        onClick={() => clickOnCategory(category.id)}
                    >
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
                <ToggleButton
                    value={CategoryAnother.id}
                    onClick={() => clickOnCategory(CategoryAnother.id)}
                >
                    {CategoryAnother.label}
                </ToggleButton>
            </StatToggleButtonGroup>
        </>
    );
};

export default ButtonGroupCategories;
