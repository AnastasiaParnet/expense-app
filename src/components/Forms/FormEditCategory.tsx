import EditIcon from '@mui/icons-material/Edit';
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
import { changeNameCategory } from 'store/reducers/CategorySlice';

interface FormEditCategoryProps {
    id: string;
    name: string;
}

interface EditCategory {
    label: string;
}

const FormEditCategory: React.FC<FormEditCategoryProps> = ({ id, name }) => {
    const { idUser } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);

    const { register, reset, getValues } = useForm<EditCategory>();

    const handleClickOpen = (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setOpen(false);
        reset();
    };

    const clickEditCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const label = getValues('label');
        if (idUser && label) {
            const dataForChange = {
                idUser,
                idCategory: id,
                newLabel: label,
            };
            dispatch(changeNameCategory(dataForChange));
        }
        setOpen(false);
        reset({ label: label.toUpperCase() });
    };

    return (
        <>
            <EditIcon onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <form onClick={(e) => e.stopPropagation()}>
                    <DialogTitle>Зміна назви категорії</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Назва категорії"
                            variant="standard"
                            type="text"
                            defaultValue={name.toUpperCase()}
                            {...register('label')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={clickEditCategory}>Змінити</Button>
                        <Button onClick={handleClose}>Відмінити</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default FormEditCategory;
