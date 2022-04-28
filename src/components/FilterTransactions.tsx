import { Box, styled } from '@mui/system';
import SearchTransactions from 'components/SearchTransactions';
import SelectSort, { ITypeSort } from 'components/Select/SelectSort';
import SortByDate from 'components/SortByDate';
import { dateToString } from 'hooks/date';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect, useState } from 'react';
import {
    changePageParams,
    ORDER_SORT,
    SORT_TRANSACTION,
    transactionSelector,
} from 'store/reducers/TransactionSlice';
import SelectLimitTransactions from './Select/SelectLimitTransactions';

const StatBox = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    margin: '15px 0',
    gridColumnGap: '10px',
    gridRowGap: '10px',
});

const FilterTransactions = () => {
    const dataForSort: ITypeSort[] = [
        {
            name: 'Від нової до старої дати',
            sort: SORT_TRANSACTION.Date,
            order: ORDER_SORT.Desc,
        },
        {
            name: 'Від старої до нової дати',
            sort: SORT_TRANSACTION.Date,
            order: ORDER_SORT.Asc,
        },
        {
            name: 'За назвою - від А до Я',
            sort: SORT_TRANSACTION.Label,
            order: ORDER_SORT.Asc,
        },
        {
            name: 'За назвою - від Я до А',
            sort: SORT_TRANSACTION.Label,
            order: ORDER_SORT.Desc,
        },
        {
            name: 'За сумою - від прибутку до втрат',
            sort: SORT_TRANSACTION.Amount,
            order: ORDER_SORT.Desc,
        },
        {
            name: 'За сумою - від втрат до прибутку',
            sort: SORT_TRANSACTION.Amount,
            order: ORDER_SORT.Asc,
        },
    ];
    const dispatch = useAppDispatch();
    const { pageParams } = useAppSelector(transactionSelector);
    const [search, setSearch] = useState<string>('');
    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);
    const [typeSort, setTypeSort] = useState<ITypeSort>(dataForSort[0]);
    const [limit, setLimit] = useState<number>(3);

    useEffect(() => {
        let dateStartString = null,
            dateEndString = null;
        if (dateStart) dateStartString = dateToString(dateStart);
        if (dateEnd) dateEndString = dateToString(dateEnd);
        dispatch(
            changePageParams({
                ...pageParams,
                search,
                sort: typeSort.sort,
                orderSort: typeSort.order,
                dateStart: dateStartString,
                dateEnd: dateEndString,
                limit,
            })
        );
    }, [dispatch, search, dateStart, dateEnd, typeSort, limit]);

    return (
        <StatBox>
            <SearchTransactions setSearch={setSearch} />
            <SelectSort
                arrayTypeSort={dataForSort}
                typeSort={typeSort}
                setTypeSort={setTypeSort}
            />
            <SelectLimitTransactions limit={limit} setLimit={setLimit} />
            <SortByDate label="Транзакції з" setDate={setDateStart} />
            <SortByDate label="По" setDate={setDateEnd} />
        </StatBox>
    );
};

export default FilterTransactions;
