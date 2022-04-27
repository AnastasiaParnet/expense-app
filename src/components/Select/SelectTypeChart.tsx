import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TYPE_CHART } from 'components/Box/BoxGraphic';
import React from 'react';

interface SelectTypeChartProps {
    typeChart: TYPE_CHART;
    setTypeChart: (data: TYPE_CHART) => void;
}

const SelectTypeChart: React.FC<SelectTypeChartProps> = ({
    typeChart,
    setTypeChart,
}) => {
    const changeTypeChart = (e: any) => {
        setTypeChart(e.target.value);
    };

    return (
        <FormControl>
            <InputLabel id="diagram">Вид діаграми</InputLabel>
            <Select
                labelId="diagram"
                id="diagram"
                value={typeChart}
                label="Вид діаграми"
                onChange={changeTypeChart}
            >
                <MenuItem value={TYPE_CHART.Line}>Лінійна діаграма</MenuItem>
                <MenuItem value={TYPE_CHART.Bar}>Гістограма</MenuItem>
                <MenuItem value={TYPE_CHART.Radar}>Радарна діаграма</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SelectTypeChart;
