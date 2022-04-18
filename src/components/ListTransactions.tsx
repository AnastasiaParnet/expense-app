import { Pagination, TextField } from '@mui/material';
import { styled } from '@mui/system';
import ItemTransaction from 'components/ItemTransaction';
import { useAppSelector } from 'hooks/redux';
import { ICategory } from 'models/ICategory';
import { ITransaction } from 'models/ITransaction';
import React, { useCallback, useEffect, useState } from 'react';
import { categorySelector } from 'store/reducers/CategorySlice';
import { transactionSelector } from 'store/reducers/TransactionSlice';

const DivGrid = styled('div')({
    display: 'grid',
    height: '70vh',
    gridTemplateRows: 'auto 1fr auto',
    gridRowGap: '10px',
    justifyItems: 'center',
    alignItems: 'start',
});

const DivList = styled('div')({
    width: '100%',
    height: '100%',
    overflow: 'auto',
});

const SearchTextField = styled(TextField)({
    margin: '10px 0',
});

const ListTransactions: React.FC = () => {
    const countTransactionsOnPage = 2;
    const { arrayIdActualCategories, categories } =
        useAppSelector(categorySelector);
    const { transactions } = useAppSelector(transactionSelector);
    const [masTransactions, setMasTransactions] = useState<ITransaction[]>([]);
    const [pageNow, setPageNow] = useState<number>(1);
    const [countPage, setCountPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
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

    const filterTransaction = useCallback(
        (transaction: ITransaction) => {
            const searchLowerCase = search.toLowerCase();
            return (
                (arrayIdActualCategories.length == 0 ||
                    arrayIdActualCategories.includes(
                        transaction.id_category
                    )) &&
                (!search ||
                    transaction.label.toLowerCase().includes(searchLowerCase))
            );
        },
        [arrayIdActualCategories, search]
    );

    const sortedTransaction = (tran1: ITransaction, tran2: ITransaction) => {
        const date1 = new Date(tran1.date);
        const date2 = new Date(tran2.date);
        return date2.getTime() - date1.getTime();
    };

    useEffect(() => {
        let newMasTransactions: ITransaction[] =
            transactions.filter(filterTransaction);
        setCountPage(
            Math.ceil(newMasTransactions.length / countTransactionsOnPage)
        );
        newMasTransactions = newMasTransactions
            .sort(sortedTransaction)
            .slice(
                (pageNow - 1) * countTransactionsOnPage,
                pageNow * countTransactionsOnPage
            );
        setMasTransactions(newMasTransactions);
    }, [
        arrayIdActualCategories,
        filterTransaction,
        pageNow,
        search,
        transactions,
    ]);

    return (
        <DivGrid>
            <SearchTextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Пошук транзакції по назві"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <DivList>
                {masTransactions.map((tran: ITransaction) => (
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
        </DivGrid>
    );
};

export default ListTransactions;
