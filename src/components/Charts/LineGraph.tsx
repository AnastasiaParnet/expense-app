import { IDataForGraphic } from 'components/Box/BoxGraphic';
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

interface LineGraphProps {
    data: IDataForGraphic[];
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
    const gradientOffset = (data: IDataForGraphic[]) => {
        const dataMax = Math.max(...data.map((i: IDataForGraphic) => i.amount));
        const dataMin = Math.min(...data.map((i: IDataForGraphic) => i.amount));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset(data);

    return (
        <ResponsiveContainer>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    style={{
                        fontFamily: 'Arial, Helvetica, sans-serif',
                    }}
                />
                <YAxis
                    style={{
                        fontFamily: 'Arial, Helvetica, sans-serif',
                    }}
                />
                <Tooltip />
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="green" stopOpacity={1} />
                        <stop offset={off} stopColor="red" stopOpacity={1} />
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
    );
};

export default LineGraph;
