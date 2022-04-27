import { Box, styled } from '@mui/system';
import ItemTransaction from 'components/ItemTransaction';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ICategory } from 'models/ICategory';
import { ITransaction } from 'models/ITransaction';
import React, { useEffect, useState } from 'react';
import { authSelector } from 'store/reducers/AuthSlice';
import { categorySelector } from 'store/reducers/CategorySlice';
import {
    fetchTransactions,
    transactionSelector,
} from 'store/reducers/TransactionSlice';
import BoxMessageTransactions from './Box/BoxMessageTransactions';

const BoxList = styled(Box)({
    overflow: 'auto',
});

const ListTransactions: React.FC = () => {
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);
    const { categories } = useAppSelector(categorySelector);
    const { transactions, pageParams } = useAppSelector(transactionSelector);
    const [idExpandTransaction, setIdExpandTransaction] = useState<string>('');

    const nameCategory = (idCategory: string) => {
        const category = categories.find(
            (category: ICategory) => category.id == idCategory
        );
        if (category) return category.label;
        return '';
    };

    useEffect(() => {
        if (idUser) {
            dispatch(
                fetchTransactions({
                    idUser,
                    pageParams,
                })
            );
        }
    }, [dispatch, idUser, pageParams]);

    return (
        <BoxList>
            <BoxMessageTransactions />
            {transactions.map((tran: ITransaction) => (
                <ItemTransaction
                    transaction={tran}
                    labelCategory={nameCategory(tran.id_category)}
                    idExpandTransaction={idExpandTransaction}
                    setIdExpandTransaction={setIdExpandTransaction}
                    key={tran.id}
                ></ItemTransaction>
            ))}
        </BoxList>
    );
};

export default ListTransactions;
