import { styled } from '@mui/system';
import ItemTransaction from 'components/ItemTransaction';
import { useAppSelector } from 'hooks/redux';
import { CategoryAnother, ICategory } from 'models/ICategory';
import { ITransaction } from 'models/ITransaction';
import React from 'react';
import { categorySelector } from 'store/reducers/CategorySlice';
import { transactionSelector } from 'store/reducers/TransactionSlice';

const Header = styled('h1')(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontFamily: 'Arial, Helvetica, sans-serif',
}));

const ListTransactions: React.FC = () => {
    const { actualCategory, categories } = useAppSelector(categorySelector);
    const { transactions } = useAppSelector(transactionSelector);

    return (
        <div>
            <Header>
                {categories
                    .find(
                        (category: ICategory) => category.id == actualCategory
                    )
                    ?.label.toUpperCase() ||
                    (CategoryAnother.id == actualCategory &&
                        CategoryAnother.label.toUpperCase())}
            </Header>
            <div>
                {transactions.map((tran: ITransaction) => {
                    if (tran.id_category === actualCategory)
                        return (
                            <ItemTransaction
                                label={tran.label}
                                category="Name"
                                date={tran.date}
                                amount={tran.amount}
                                key={tran.id}
                            ></ItemTransaction>
                        );
                })}
            </div>
        </div>
    );
};

export default ListTransactions;
