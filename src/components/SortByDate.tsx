import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDebounce } from 'hooks/react';
import React, { useEffect } from 'react';

interface SortByDateProps {
    label: string;
    setDate: (date: Date | null) => void;
}

const StatStack = styled(Stack)({
    gridColumn: 'span 2',
});

const SortByDate: React.FC<SortByDateProps> = ({ label, setDate }) => {
    const [value, setValue] = React.useState<Date | null>(null);

    const changeValue = (value: Date | null) => {
        setValue(value);
    };

    const debouncedDate = useDebounce(value, 1500);

    useEffect(() => {
        setDate(debouncedDate);
    }, [debouncedDate, setDate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StatStack>
                <DatePicker
                    disableFuture
                    label={label}
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={value}
                    onChange={changeValue}
                    renderInput={(params) => <TextField {...params} />}
                />
            </StatStack>
        </LocalizationProvider>
    );
};

export default SortByDate;
