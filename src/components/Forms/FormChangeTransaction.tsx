import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ICategory } from 'models/ICategory';
import { ITransaction } from 'models/ITransaction';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { authSelector } from 'store/reducers/AuthSlice';
import { categorySelector } from 'store/reducers/CategorySlice';
import {
    changeTransaction,
    deleteTransaction,
} from 'store/reducers/TransactionSlice';
import * as yup from 'yup';

interface FormChangeTransactionProps {
    transaction: ITransaction;
    closeForm: () => void;
}

interface InterfaceChangeTransaction {
    label: string;
    amount: number;
    id_category: string;
    date: Date;
}

const StatTextField = styled(TextField)({
    margin: '10px 0',
});

const StatFormControl = styled(FormControl)({
    margin: '10px 0',
});

const BoxButton = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
});

const validationSchema = yup.object({
    label: yup.string().required('Введіть назву транзакції'),
    amount: yup.number().integer('number').required('Введіть суму'),
    id_category: yup.string().required('Оберіть категорію'),
});

const FormChangeTransaction: React.FC<FormChangeTransactionProps> = ({
    transaction,
    closeForm,
}) => {
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);
    const { categories } = useAppSelector(categorySelector);

    const {
        control,
        register,
        handleSubmit,
        formState: { isDirty, errors },
        reset,
    } = useForm<InterfaceChangeTransaction>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            label: transaction.label,
            amount: transaction.amount,
            id_category: transaction.id_category,
            date: new Date(transaction.date),
        },
    });

    useEffect(() => {
        reset({
            id_category: transaction.id_category,
            date: new Date(transaction.date),
        });
    }, [reset, transaction]);

    const clickChangeTransaction = (data: InterfaceChangeTransaction) => {
        if (idUser) {
            const newDataTransaction: ITransaction = {
                ...data,
                id: transaction.id,
                id_user: idUser,
            };
            dispatch(
                changeTransaction({
                    idUser,
                    newDataTransaction,
                })
            );
        }
        closeForm();
    };

    const cancelChange = () => {
        reset();
        closeForm();
    };

    const clickDeleteTransaction = () => {
        if (idUser) {
            const dataForDelete = {
                idUser,
                idTransaction: transaction.id,
            };
            dispatch(deleteTransaction(dataForDelete));
        }
    };

    return (
        <form>
            <StatTextField
                fullWidth
                size="small"
                label="Назва транзакції"
                variant="standard"
                {...register('label')}
                error={errors?.label ? true : false}
                helperText={
                    errors?.label ? errors.label.message || 'Error!!!' : ''
                }
            />
            <StatTextField
                fullWidth
                size="small"
                label="Сума транзакції"
                variant="standard"
                {...register('amount')}
                error={errors?.amount ? true : false}
                helperText={errors?.amount ? 'Введіть число' : ''}
            />
            <Controller
                control={control}
                name="id_category"
                render={({ field: { value, onChange } }) => (
                    <StatFormControl fullWidth size="small" variant="standard">
                        <InputLabel id="category">Назва категорії</InputLabel>
                        <Select
                            labelId="category"
                            id="demo-simple-select-standard"
                            value={value}
                            onChange={onChange}
                        >
                            {categories.map((category: ICategory) => {
                                return (
                                    !category.read_only && (
                                        <MenuItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.label.toUpperCase()}
                                        </MenuItem>
                                    )
                                );
                            })}
                            {categories.map((category: ICategory) => {
                                return (
                                    category.read_only && (
                                        <MenuItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            <em>
                                                {category.label.toUpperCase()}
                                            </em>
                                        </MenuItem>
                                    )
                                );
                            })}
                        </Select>
                    </StatFormControl>
                )}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange, value } }) => (
                        <DatePicker
                            disableFuture
                            label="Дата"
                            openTo="year"
                            views={['year', 'month', 'day']}
                            value={value}
                            onChange={onChange}
                            renderInput={(params) => (
                                <StatTextField {...params} />
                            )}
                        />
                    )}
                />
            </LocalizationProvider>
            <BoxButton>
                <Box>
                    <Button
                        disabled={!isDirty}
                        onClick={handleSubmit(clickChangeTransaction)}
                    >
                        Зберегти
                    </Button>
                    <Button disabled={!isDirty} onClick={cancelChange}>
                        Відмінити зміни
                    </Button>
                </Box>
                <Button onClick={clickDeleteTransaction}>Видалити</Button>
            </BoxButton>
        </form>
    );
};

export default FormChangeTransaction;
