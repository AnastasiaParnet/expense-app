import { IDataForGraphic } from 'components/Box/BoxGraphic';
import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface BarGraphProps {
    data: IDataForGraphic[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
    return (
        <ResponsiveContainer>
            <BarChart data={data}>
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
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="amount" fill="rgb(203, 133, 161)" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarGraph;
