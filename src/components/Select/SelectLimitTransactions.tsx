import { SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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

    const changeLimit = (event: SelectChangeEvent<unknown>) => {
        setLimit(event.target.value as number);
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
