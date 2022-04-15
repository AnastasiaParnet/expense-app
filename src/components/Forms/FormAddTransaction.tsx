import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ICategory } from 'models/ICategory';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authSelector } from 'store/reducers/AuthSlice';
import { categorySelector } from 'store/reducers/CategorySlice';
import {
    addTransaction,
    transactionSelector,
} from 'store/reducers/TransactionSlice';
import * as yup from 'yup';

interface InterfaceAddTransaction {
    label: string;
    amount: number;
    idCategory: string;
}

const validationSchema = yup.object({
    label: yup.string().required('Введіть назву транзакції'),
    amount: yup.number().integer('number').required('Введіть суму'),
    idCategory: yup.string().required('Оберіть категорію'),
});

const FormAddTransaction: React.FC = () => {
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);
    const { categories } = useAppSelector(categorySelector);
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

    const handleCancel = () => {
        reset();
        handleClose();
    };

    const clickAddTransaction = (data: InterfaceAddTransaction) => {
        reset();
        setOpen(false);
        if (idUser) {
            const dataForAdd = {
                ...data,
                idUser,
                transactions,
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
                            error={errors?.idCategory ? true : false}
                        >
                            <InputLabel id="category">
                                Назва категорії
                            </InputLabel>
                            <Select
                                labelId="category"
                                id="demo-simple-select-standard"
                                defaultValue=""
                                {...register('idCategory')}
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
                            {errors.idCategory && (
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
