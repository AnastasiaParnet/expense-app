import { Pagination, TextField } from '@mui/material';
import { styled } from '@mui/system';
import ItemTransaction from 'components/ItemTransaction';
import { useDebounce } from 'hooks/react';
import { useAppSelector } from 'hooks/redux';
import { ICategory } from 'models/ICategory';
import { ITransaction } from 'models/ITransaction';
import React, { useCallback, useEffect, useState } from 'react';
import { categorySelector } from 'store/reducers/CategorySlice';
import { transactionSelector } from 'store/reducers/TransactionSlice';

const DivGrid = styled('div')({
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    gridRowGap: '10px',
    overflow: 'auto',
});

const DivList = styled('div')({
    overflow: 'auto',
});

const SearchTextField = styled(TextField)({
    margin: '10px 0',
});

const StatPagination = styled(Pagination)({
    display: 'flex',
    justifyContent: 'center',
});

const ListTransactions: React.FC = () => {
    const countTransactionsOnPage = 3;
    const { arrayIdActualCategories, categories } =
        useAppSelector(categorySelector);
    const { transactions } = useAppSelector(transactionSelector);
    const [masTransactions, setMasTransactions] = useState<ITransaction[]>([]);
    const [pageNow, setPageNow] = useState<number>(1);
    const [countPage, setCountPage] = useState<number>(1);
    const [inputSearch, setInputSearch] = useState<string>('');
    const [idExpandTransaction, setIdExpandTransaction] = useState<string>('');

    const debouncedSearch = useDebounce(inputSearch, 300);

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
            const searchLowerCase = debouncedSearch.toLowerCase();
            return (
                (arrayIdActualCategories.length == 0 ||
                    arrayIdActualCategories.includes(
                        transaction.id_category
                    )) &&
                (!debouncedSearch ||
                    transaction.label.toLowerCase().includes(searchLowerCase))
            );
        },
        [arrayIdActualCategories, debouncedSearch]
    );

    const sortedTransaction = (tran1: ITransaction, tran2: ITransaction) => {
        const date1 = new Date(tran1.date);
        const date2 = new Date(tran2.date);
        return date2.getTime() - date1.getTime();
    };

    useEffect(() => {
        let newMasTransactions: ITransaction[] =
            transactions.filter(filterTransaction);
        const newCountPage = Math.ceil(
            newMasTransactions.length / countTransactionsOnPage
        );
        setCountPage(newCountPage);
        if (newCountPage < pageNow) setPageNow(1);
        newMasTransactions = newMasTransactions
            .sort(sortedTransaction)
            .slice(
                (pageNow - 1) * countTransactionsOnPage,
                pageNow * countTransactionsOnPage
            );
        setMasTransactions(newMasTransactions);
    }, [arrayIdActualCategories, filterTransaction, pageNow, transactions]);

    return (
        <DivGrid>
            <SearchTextField
                fullWidth
                size="small"
                id="outlined-basic"
                label="Пошук транзакції по назві"
                variant="outlined"
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
            />
            <DivList>
                {masTransactions.map((tran: ITransaction) => (
                    <ItemTransaction
                        transaction={tran}
                        labelCategory={nameCategory(tran.id_category)}
                        idExpandTransaction={idExpandTransaction}
                        setIdExpandTransaction={setIdExpandTransaction}
                        key={tran.id}
                    ></ItemTransaction>
                ))}
            </DivList>
            <StatPagination
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
