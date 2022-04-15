import { Pagination } from '@mui/material';
import { styled } from '@mui/system';
import ItemTransaction from 'components/ItemTransaction';
import { useAppSelector } from 'hooks/redux';
import { ICategory } from 'models/ICategory';
import { ITransaction } from 'models/ITransaction';
import React, { useEffect, useState } from 'react';
import { categorySelector } from 'store/reducers/CategorySlice';
import { transactionSelector } from 'store/reducers/TransactionSlice';

const DivList = styled('div')({
    margin: '10px 0',
});

const ListTransactions: React.FC = () => {
    const countTransactionsOnPage = 5;
    const { arrayIdActualCategories, categories } =
        useAppSelector(categorySelector);
    const { transactions } = useAppSelector(transactionSelector);
    const [masTransactions, setMasTransactions] = useState<ITransaction[]>([]);
    const [pageNow, setPageNow] = useState<number>(1);
    const [countPage, setCountPage] = useState<number>(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNow(value);
    };

    const nameCategory = (idCategory: string) => {
        const category = categories.find(
            (category: ICategory) => category.id == idCategory
        );
        if (category) return category.label;
        return '';
    };

    useEffect(() => {
        const newMasTransactions: ITransaction[] = transactions.filter(
            (transaction: ITransaction) =>
                arrayIdActualCategories.length == 0 ||
                arrayIdActualCategories.includes(transaction.id_category)
        );
        setMasTransactions(newMasTransactions);
        setCountPage(
            Math.ceil(newMasTransactions.length / countTransactionsOnPage)
        );
    }, [arrayIdActualCategories, transactions]);

    const partTransactions = () => {
        return masTransactions.slice(
            (pageNow - 1) * countTransactionsOnPage,
            pageNow * countTransactionsOnPage
        );
    };

    return (
        <>
            <DivList>
                {partTransactions().map((tran: ITransaction) => (
                    <ItemTransaction
                        transaction={tran}
                        category={nameCategory(tran.id_category)}
                        key={tran.id}
                    ></ItemTransaction>
                ))}
            </DivList>
            <Pagination
                count={countPage}
                page={pageNow}
                variant="outlined"
                color="primary"
                onChange={handleChange}
            />
        </>
    );
};

export default ListTransactions;
