import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useState } from 'react';
import { changeNameCategory } from 'store/reducers/ActionCreators';
import { authSelector } from 'store/reducers/AuthSlice';

interface FormEditCategoryProps {
    id: string;
    name: string;
}

const FormEditCategory: React.FC<FormEditCategoryProps> = ({ id, name }) => {
    const { idUser } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const [label, setLabel] = useState<string>(name);
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickEditCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (idUser && label) {
            const data = {
                idUser,
                idCategory: id,
                newLabel: label,
            };
            dispatch(changeNameCategory(data));
            setOpen(false);
        }
    };

    return (
        <>
            <EditIcon onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <form>
                    <DialogTitle>Зміна назви категорії</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Назва категорії"
                            variant="standard"
                            type="text"
                            value={label}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setLabel(e.target.value);
                            }}
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
