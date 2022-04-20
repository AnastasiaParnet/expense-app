import DeleteIcon from '@mui/icons-material/Delete';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ICategory } from 'models/ICategory';
import React, { useEffect, useState } from 'react';
import { authSelector } from 'store/reducers/AuthSlice';
import {
    categorySelector,
    changeActualCategories,
    deleteCategory,
} from 'store/reducers/CategorySlice';
import {
    changeCategoryForTransactions,
    transactionSelector,
} from 'store/reducers/TransactionSlice';
import FormEditCategory from './Forms/FormEditCategory';

interface ButtonGroupCategoriesProps {
    isChangeCategory: boolean;
    closeNavMenu(): void;
}

const StatToggleButtonGroup = styled(ToggleButtonGroup)({
    width: '200px',
});

const ToggleButtonChange = styled(ToggleButton)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        '& svg': {
            color: 'rgba(0,0,0,0.54)',
        },
    },
    [theme.breakpoints.up('md')]: {
        '& svg': {
            color: 'rgba(0,0,0,0)',
        },
        '&:hover': {
            '& svg': {
                color: 'rgba(0,0,0,0.54)',
            },
        },
    },
}));

const ButtonGroupCategories: React.FC<ButtonGroupCategoriesProps> = ({
    isChangeCategory,
    closeNavMenu,
}) => {
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);
    const { transactions } = useAppSelector(transactionSelector);
    const { categories, arrayIdActualCategories } =
        useAppSelector(categorySelector);
    const [actualCategories, setActualCategories] = useState<string[]>(
        arrayIdActualCategories
    );

    const clickDeleteCategory = (
        event: React.MouseEvent<SVGSVGElement>,
        idCategory: string,
        idUser: string | null
    ) => {
        event.stopPropagation();
        if (idUser) {
            const newIdCategoryForTransactions = categories.find(
                (category) => category.read_only
            )?.id;
            dispatch(
                changeCategoryForTransactions({
                    idUser,
                    oldIdCategory: idCategory,
                    newIdCategory: newIdCategoryForTransactions || '',
                    transactions,
                })
            );
            dispatch(
                deleteCategory({
                    idUser,
                    idCategory,
                    categories,
                })
            );
            if (arrayIdActualCategories.includes(idCategory)) {
                const newActualCategories = actualCategories.filter(
                    (category) => category !== idCategory
                );
                setActualCategories(newActualCategories);
            }
        }
    };

    const clickAllTransactions = () => {
        setActualCategories([]);
        closeNavMenu();
    };

    const clickOnCategory = (id: string) => {
        if (actualCategories.includes(id)) {
            setActualCategories(actualCategories.filter((el) => el !== id));
        } else setActualCategories([...actualCategories, id]);
    };

    useEffect(() => {
        dispatch(changeActualCategories(actualCategories));
    }, [dispatch, actualCategories]);

    return (
        <>
            <StatToggleButtonGroup
                orientation="vertical"
                value={actualCategories}
            >
                <ToggleButton value="" onClick={clickAllTransactions}>
                    Всі транзакції
                </ToggleButton>
                {categories.map((category: ICategory) => {
                    return (
                        !category.read_only && (
                            <ToggleButtonChange
                                key={category.id}
                                value={category.id}
                                onClick={() => clickOnCategory(category.id)}
                            >
                                {category.label}
                                {isChangeCategory && (
                                    <div
                                        style={{
                                            height: '24px',
                                        }}
                                    >
                                        <FormEditCategory
                                            id={category.id}
                                            name={category.label}
                                        />
                                        <DeleteIcon
                                            onClick={(event) => {
                                                clickDeleteCategory(
                                                    event,
                                                    category.id,
                                                    idUser
                                                );
                                            }}
                                        />
                                    </div>
                                )}
                            </ToggleButtonChange>
                        )
                    );
                })}
                {categories.map((category: ICategory) => {
                    return (
                        category.read_only && (
                            <ToggleButton
                                key={category.id}
                                value={category.id}
                                onClick={() => clickOnCategory(category.id)}
                            >
                                {category.label}
                            </ToggleButton>
                        )
                    );
                })}
            </StatToggleButtonGroup>
        </>
    );
};

export default ButtonGroupCategories;
