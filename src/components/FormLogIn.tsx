import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MAIN_SCREEN } from 'routes';
import { authorizationUserByNameAndPassword } from 'store/reducers/ActionCreators';
import { authSelector } from 'store/reducers/AuthSlice';
import * as yup from 'yup';

interface InterfaceLogIn {
    username: string;
    password: string;
}

const Form = styled('form')({
    display: 'inline-block',
    padding: '25px',
    border: '1px solid rgb(52, 35, 42)',
    whiteSpace: 'normal',
    verticalAlign: 'middle',
    textAlign: 'left',
});

const DivInput = styled('div')({
    padding: '5%',
    textAlign: 'center',
});

const validationSchema = yup.object({
    username: yup.string().required("Введіть ім'я користувача"),
    password: yup.string().min(4).max(16).required('Введіть пароль'),
});

const FormLogIn: React.FC = () => {
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InterfaceLogIn>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (idUser) navigate(MAIN_SCREEN);
    }, [idUser, navigate]);

    const submitForm = (data: InterfaceLogIn) => {
        dispatch(authorizationUserByNameAndPassword(data));
    };

    return (
        <Form>
            <DivInput>
                <TextField
                    label="Ім'я користувача"
                    variant="filled"
                    {...register('username')}
                    error={errors?.username ? true : false}
                    helperText={
                        errors?.username
                            ? errors.username.message || 'Error!!!'
                            : ''
                    }
                />
            </DivInput>
            <DivInput>
                <TextField
                    label="Пароль"
                    type="password"
                    variant="filled"
                    {...register('password')}
                    error={errors?.password ? true : false}
                    helperText={
                        errors?.password
                            ? errors.password.message || 'Error!!!'
                            : ''
                    }
                />
            </DivInput>
            <DivInput>
                <Button variant="text" onClick={handleSubmit(submitForm)}>
                    Ввійти
                </Button>
            </DivInput>
        </Form>
    );
};

export default FormLogIn;
