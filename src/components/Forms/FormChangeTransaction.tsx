import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ICategory } from 'models/ICategory';
import { ITransaction } from 'models/ITransaction';
import React from 'react';
import { useForm } from 'react-hook-form';
import { authSelector } from 'store/reducers/AuthSlice';
import { categorySelector } from 'store/reducers/CategorySlice';
import {
    changeTransaction,
    transactionSelector,
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
}

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
    const { transactions } = useAppSelector(transactionSelector);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InterfaceChangeTransaction>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
    });

    const clickChangeTransaction = (data: InterfaceChangeTransaction) => {
        if (
            data.label !== transaction.label ||
            data.amount !== transaction.amount ||
            data.id_category !== transaction.id_category
        ) {
            const newDataTransaction: ITransaction = {
                ...data,
                id: transaction.id,
                date: transaction.date,
            };
            dispatch(
                changeTransaction({
                    idUser: idUser || '',
                    newDataTransaction,
                    transactions,
                })
            );
        }
        closeForm();
    };

    const cancelChange = () => {
        closeForm();
        reset();
    };

    return (
        <form>
            <TextField
                fullWidth
                label="Назва транзакції"
                variant="standard"
                defaultValue={transaction.label}
                {...register('label')}
                error={errors?.label ? true : false}
                helperText={
                    errors?.label ? errors.label.message || 'Error!!!' : ''
                }
            />
            <TextField
                fullWidth
                label="Сума транзакції"
                variant="standard"
                defaultValue={transaction.amount}
                {...register('amount')}
                error={errors?.amount ? true : false}
                helperText={errors?.amount ? 'Введіть число' : ''}
            />
            <FormControl fullWidth variant="standard">
                <InputLabel id="category">Назва категорії</InputLabel>
                <Select
                    labelId="category"
                    id="demo-simple-select-standard"
                    defaultValue={transaction.id_category}
                    {...register('id_category')}
                >
                    {categories.map((category: ICategory) => {
                        return (
                            !category.read_only && (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.label.toUpperCase()}
                                </MenuItem>
                            )
                        );
                    })}
                    {categories.map((category: ICategory) => {
                        return (
                            category.read_only && (
                                <MenuItem key={category.id} value={category.id}>
                                    <em>{category.label.toUpperCase()}</em>
                                </MenuItem>
                            )
                        );
                    })}
                </Select>
            </FormControl>
            <Button onClick={handleSubmit(clickChangeTransaction)}>
                Змінити
            </Button>
            <Button onClick={cancelChange}>Відмінити зміни</Button>
        </form>
    );
};

export default FormChangeTransaction;
