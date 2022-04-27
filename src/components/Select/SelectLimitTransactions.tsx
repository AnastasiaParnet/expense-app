import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/system';
import React from 'react';

interface SelectLimitTransactionsProps {
    limit: number;
    setLimit: (limit: number) => void;
}

const SelectLimitTransactions: React.FC<SelectLimitTransactionsProps> = ({
    limit,
    setLimit,
}) => {
    const numberLimit = [3, 5, 10];
    const changeLimit = (e: any) => {
        setLimit(e.target.value);
    };

    return (
        <FormControl>
            <InputLabel id="limit">К-ть транзакцій</InputLabel>
            <Select
                labelId="limit"
                id="limit"
                value={limit}
                label="Age"
                onChange={changeLimit}
            >
                {numberLimit.map((elem: number) => (
                    <MenuItem key={elem} value={elem}>
                        {elem}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectLimitTransactions;
