import { Box, styled } from '@mui/system';
import { dateToString } from 'hooks/date';
import { useAppSelector } from 'hooks/redux';
import { ITransaction } from 'models/ITransaction';
import React from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { categorySelector } from 'store/reducers/CategorySlice';
import { transactionSelector } from 'store/reducers/TransactionSlice';

interface IDataForGraphic {
    date: string;
    amount: number;
}

const BoxChart = styled(Box)({
    width: '90%',
    height: 400,
});

const Chart: React.FC = () => {
    const { transactions } = useAppSelector(transactionSelector);
    const { arrayIdActualCategories } = useAppSelector(categorySelector);

    const dataForGraphic: IDataForGraphic[] = transactions
        .filter(
            (tran: ITransaction) =>
                arrayIdActualCategories.length == 0 ||
                arrayIdActualCategories.includes(tran.id_category)
        )
        .reduce((mas: IDataForGraphic[], transaction: ITransaction) => {
            const indexLastData = mas.length - 1;
            let amount = transaction.amount;
            const dateString = dateToString(transaction.date);
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
        }, []);

    const gradientOffset = (dataForGraphic: IDataForGraphic[]) => {
        const dataMax = Math.max(
            ...dataForGraphic.map((i: IDataForGraphic) => i.amount)
        );
        const dataMin = Math.min(
            ...dataForGraphic.map((i: IDataForGraphic) => i.amount)
        );

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset(dataForGraphic);

    if (dataForGraphic.length == 0) return <></>;

    return (
        <BoxChart>
            <ResponsiveContainer>
                <AreaChart data={dataForGraphic}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <defs>
                        <linearGradient
                            id="splitColor"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset={off}
                                stopColor="green"
                                stopOpacity={1}
                            />
                            <stop
                                offset={off}
                                stopColor="red"
                                stopOpacity={1}
                            />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#000"
                        fill="url(#splitColor)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </BoxChart>
    );
};

export default Chart;
