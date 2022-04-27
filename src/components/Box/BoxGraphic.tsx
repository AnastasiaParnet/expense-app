import { Box, styled } from '@mui/system';
import BarGraph from 'components/Charts/BarGraph';
import LineGraph from 'components/Charts/LineGraph';
import RadarGraph from 'components/Charts/RadarGraph';
import SelectSort, { ITypeSort } from 'components/Select/SelectSort';
import SelectTypeChart from 'components/Select/SelectTypeChart';
import { dateForLabel } from 'hooks/date';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ITransaction } from 'models/ITransaction';
import React, { useEffect, useState } from 'react';
import { authSelector } from 'store/reducers/AuthSlice';
import {
    changePageParams,
    fetchTransactions,
    ORDER_SORT,
    SORT_TRANSACTION,
    transactionSelector,
} from 'store/reducers/TransactionSlice';

interface IDataForGraphic {
    date: string;
    amount: number;
}

enum TYPE_CHART {
    Line,
    Bar,
    Radar,
}

const BoxChart = styled(Box)({
    width: '90%',
    height: 400,
});

const BoxSelect = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '10px',
    margin: '0 0 10px 20px',
});

const BoxGraphic = () => {
    const dataForSort: ITypeSort[] = [
        {
            name: 'Від старої до нової дати',
            sort: SORT_TRANSACTION.Date,
            order: ORDER_SORT.Asc,
        },
        {
            name: 'Від нової до старої дати',
            sort: SORT_TRANSACTION.Date,
            order: ORDER_SORT.Desc,
        },
        // {
        //     name: 'За збільшенням суми',
        //     sort: SORT_TRANSACTION.Date,
        //     order: ORDER_SORT.Asc,
        // },
    ];
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);
    const { transactions, totalTransactions, pageParams } =
        useAppSelector(transactionSelector);
    const [typeChart, setTypeChart] = useState<TYPE_CHART>(TYPE_CHART.Line);
    const [typeSort, setTypeSort] = useState<ITypeSort>(dataForSort[0]);

    useEffect(() => {
        dispatch(
            changePageParams({
                ...pageParams,
                limit: totalTransactions,
                sort: typeSort.sort,
                orderSort: typeSort.order,
            })
        );
    }, [dispatch, totalTransactions, typeSort]);

    useEffect(() => {
        if (idUser) dispatch(fetchTransactions({ idUser, pageParams }));
    }, [dispatch, idUser, pageParams]);

    const dataForGraphic: IDataForGraphic[] = transactions.reduce(
        (mas: IDataForGraphic[], transaction: ITransaction) => {
            const indexLastData = mas.length - 1;
            let amount = transaction.amount;
            const dateString = dateForLabel(transaction.date);
            if (indexLastData > -1 && mas[indexLastData].date === dateString) {
                amount += mas[indexLastData].amount;
                mas.pop();
            }
            return [
                ...mas,
                {
                    date: dateString,
                    amount,
                },
            ];
        },
        []
    );

    if (dataForGraphic.length == 0) return <></>;

    return (
        <BoxChart>
            <BoxSelect>
                <SelectTypeChart
                    typeChart={typeChart}
                    setTypeChart={setTypeChart}
                />
                <SelectSort
                    arrayTypeSort={dataForSort}
                    typeSort={typeSort}
                    setTypeSort={setTypeSort}
                />
            </BoxSelect>
            {dataForGraphic.length > 0 &&
                ((typeChart == TYPE_CHART.Line && (
                    <LineGraph data={dataForGraphic} />
                )) ||
                    (typeChart == TYPE_CHART.Bar && (
                        <BarGraph data={dataForGraphic} />
                    )) ||
                    (typeChart == TYPE_CHART.Radar && (
                        <RadarGraph data={dataForGraphic} />
                    )))}
        </BoxChart>
    );
};

export default BoxGraphic;
export { type IDataForGraphic, TYPE_CHART };
