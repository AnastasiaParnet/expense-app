import { yupResolver } from '@hookform/resolvers/yup';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { CategoryAnother, ICategory } from 'models/ICategory';
import { ITransaction } from 'models/ITransaction';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addTransaction } from 'store/reducers/ActionCreators';
import { authSelector } from 'store/reducers/AuthSlice';
import { categorySelector } from 'store/reducers/CategorySlice';
import { transactionSelector } from 'store/reducers/TransactionSlice';
import * as yup from 'yup';

interface InterfaceAddTransaction {
    label: string;
    amount: number;
    category: number;
}

const validationSchema = yup.object({
    label: yup.string().required('Введіть назву транзакції'),
    amount: yup.number().integer('number').required('Введіть суму'),
    category: yup.number().required('Оберіть категорію'),
});

const FormAddTransaction: React.FC = () => {
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);
    const { transactions } = useAppSelector(transactionSelector);
    const { categories } = useAppSelector(categorySelector);
    const [open, setOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InterfaceAddTransaction>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        reset();
        handleClose();
    };

    const clickAddTransaction = (data: InterfaceAddTransaction) => {
        reset();
        setOpen(false);
        console.log(data);
        if (idUser) {
            const dateNowString = new Date().toLocaleString('ukr', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
            });
            const newTransaction: ITransaction = {
                id: transactions.length + 1,
                label: data.label,
                date: dateNowString,
                amount: data.amount,
                id_category: data.category,
            };
            const dataForAdd = {
                idUser,
                newTransaction,
            };
            dispatch(addTransaction(dataForAdd));
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Додати транзакцію
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form>
                    <DialogTitle>Нова транзакція</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Зверніть увагу. Відємне значення транзакції є
                            витратою, додатнє - доходом.
                        </DialogContentText>
                        <TextField
                            fullWidth
                            label="Назва транзакції"
                            variant="standard"
                            {...register('label')}
                            error={errors?.label ? true : false}
                            helperText={
                                errors?.label
                                    ? errors.label.message || 'Error!!!'
                                    : ''
                            }
                        />
                        <TextField
                            fullWidth
                            label="Сума транзакції"
                            variant="standard"
                            {...register('amount')}
                            error={errors?.amount ? true : false}
                            helperText={errors?.amount ? 'Введіть число' : ''}
                        />
                        <FormControl
                            variant="standard"
                            fullWidth
                            error={errors?.category ? true : false}
                        >
                            <InputLabel id="category">
                                Назва категорії
                            </InputLabel>
                            <Select
                                labelId="category"
                                id="demo-simple-select-standard"
                                defaultValue={CategoryAnother.id}
                                {...register('category')}
                            >
                                {categories.map((category: ICategory) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.label}
                                    </MenuItem>
                                ))}
                                <MenuItem value={CategoryAnother.id}>
                                    <em>{CategoryAnother.label}</em>
                                </MenuItem>
                            </Select>
                            {errors.category && (
                                <FormHelperText>
                                    Оберіть категорію
                                </FormHelperText>
                            )}
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit(clickAddTransaction)}>
                            Додати
                        </Button>
                        <Button onClick={handleCancel}>Відмінити</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default FormAddTransaction;
