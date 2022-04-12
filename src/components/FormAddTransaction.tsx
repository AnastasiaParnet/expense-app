import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ITransaction } from 'models/ITransaction';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addTransaction } from 'store/reducers/ActionCreators';
import { authSelector } from 'store/reducers/AuthSlice';
import { transactionSelector } from 'store/reducers/TransactionSlice';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

interface InterfaceAddTransaction {
    label: string;
    amount: number;
}

const validationSchema = yup.object({
    label: yup.string().required('Введіть назву транзакції'),
    amount: yup.number().integer('number').required('Введіть суму'),
});

const FormAddTransaction: React.FC = () => {
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);
    const { transactions } = useAppSelector(transactionSelector);
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

    const clickAddTransaction = (data: InterfaceAddTransaction) => {
        reset();
        setOpen(false);
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
                id_category: 0,
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit(clickAddTransaction)}>
                            Додати
                        </Button>
                        <Button onClick={handleClose}>Відмінити</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default FormAddTransaction;
