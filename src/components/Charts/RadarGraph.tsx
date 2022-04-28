import { IDataForGraphic } from 'components/Box/BoxGraphic';
import React from 'react';
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
} from 'recharts';

interface RadarGraphProps {
    data: IDataForGraphic[];
}

const RadarGraph: React.FC<RadarGraphProps> = ({ data }) => {
    return (
        <ResponsiveContainer>
            <RadarChart outerRadius={150} width={500} height={500} data={data}>
                <PolarGrid />
                <PolarAngleAxis
                    dataKey="date"
                    style={{
                        fontFamily: 'Arial, Helvetica, sans-serif',
                    }}
                />
                <PolarRadiusAxis
                    style={{
                        fontFamily: 'Arial, Helvetica, sans-serif',
                    }}
                />
                <Radar
                    name="Mike"
                    dataKey="amount"
                    stroke="rgb(203, 133, 161)"
                    fill="rgb(203, 133, 161)"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default RadarGraph;
