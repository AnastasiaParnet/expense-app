import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { ORDER_SORT, SORT_TRANSACTION } from 'store/reducers/TransactionSlice';

interface ITypeSort {
    name: string;
    sort: SORT_TRANSACTION;
    order: ORDER_SORT;
}

interface SelectSortProps {
    arrayTypeSort: ITypeSort[];
    typeSort: ITypeSort;
    setTypeSort: (data: ITypeSort) => void;
}

const SelectSort: React.FC<SelectSortProps> = ({
    arrayTypeSort,
    typeSort,
    setTypeSort,
}) => {
    const changeTypeSort = (e: SelectChangeEvent<unknown>) => {
        const type = arrayTypeSort.find(
            (type) => type.name == (e.target.value as string)
        );
        if (type) setTypeSort(type);
    };

    return (
        <FormControl>
            <InputLabel id="sort">Вид сортування</InputLabel>
            <Select
                labelId="sort"
                id="sort"
                value={typeSort.name}
                label="Вид сортування"
                onChange={changeTypeSort}
            >
                {arrayTypeSort.map((elem) => (
                    <MenuItem key={elem.name} value={elem.name}>
                        {elem.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectSort;
export { type ITypeSort };
