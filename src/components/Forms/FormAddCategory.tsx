import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authSelector } from 'store/reducers/AuthSlice';
import { addCategory, categorySelector } from 'store/reducers/CategorySlice';
import * as yup from 'yup';

interface InterfaceAddCategory {
    label: string;
}

const validationSchema = yup.object({
    label: yup.string().required('Введіть назву категорії'),
});

const FormAddCategory: React.FC = () => {
    const { idUser } = useAppSelector(authSelector);
    const { categories } = useAppSelector(categorySelector);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InterfaceAddCategory>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickAddCategory = (data: InterfaceAddCategory) => {
        const inputLabel = data.label.toLowerCase();
        const idCategoryInArrayCategories = categories.findIndex(
            (category) => category.label == inputLabel
        );
        if (idUser && idCategoryInArrayCategories === -1) {
            const dataForAdd = {
                idUser,
                labelNewCategory: inputLabel,
                categories,
            };
            dispatch(addCategory(dataForAdd));
        }
        reset();
        setOpen(false);
    };

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen}>
                <AddIcon />
                Додати категорію
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form>
                    <DialogTitle>Нова категорія</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Назва категорії"
                            variant="standard"
                            {...register('label')}
                            error={errors?.label ? true : false}
                            helperText={
                                errors?.label
                                    ? errors.label.message || 'Error!!!'
                                    : ''
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit(clickAddCategory)}>
                            Додати
                        </Button>
                        <Button onClick={handleClose}>Відмінити</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default FormAddCategory;
