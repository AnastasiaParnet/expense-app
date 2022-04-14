import ItemTransaction from 'components/ItemTransaction';
import { useAppSelector } from 'hooks/redux';
import { CategoryAnother, ICategory } from 'models/ICategory';
import { ITransaction } from 'models/ITransaction';
import React from 'react';
import { categorySelector } from 'store/reducers/CategorySlice';
import { transactionSelector } from 'store/reducers/TransactionSlice';

const ListTransactions: React.FC = () => {
    const { arrayIdActualCategories, categories } =
        useAppSelector(categorySelector);
    const { transactions } = useAppSelector(transactionSelector);

    const nameCategory = (idCategory: string) => {
        const category = categories.find(
            (category: ICategory) => category.id == idCategory
        );
        if (category) return category.label;
        if (CategoryAnother.id == idCategory) return CategoryAnother.label;
        return '';
    };

    return (
        <div>
            {transactions.map((tran: ITransaction) => {
                if (
                    arrayIdActualCategories.length == 0 ||
                    arrayIdActualCategories.includes(tran.id_category)
                )
                    return (
                        <ItemTransaction
                            label={tran.label}
                            category={nameCategory(tran.id_category)}
                            date={tran.date}
                            amount={tran.amount}
                            key={tran.id}
                        ></ItemTransaction>
                    );
            })}
        </div>
    );
};

export default ListTransactions;
