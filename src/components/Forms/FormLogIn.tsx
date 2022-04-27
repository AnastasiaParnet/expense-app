import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MAIN_SCREEN, REGISTRATION_PATH } from 'routes';
import {
    authorizationUserByNameAndPassword,
    authSelector,
} from 'store/reducers/AuthSlice';
import * as yup from 'yup';

interface InterfaceLogIn {
    username: string;
    password: string;
}

const Form = styled('form')({
    display: 'inline-block',
    textAlign: 'center',
});

const BoxInput = styled(Box)({
    padding: '0 0 15px 0',
    width: '260px',
});

const BoxButton = styled(Box)({
    margin: '5px 0',
});

const validationSchema = yup.object({
    username: yup.string().required("Введіть ім'я користувача"),
    password: yup
        .string()
        .min(4, 'Менше 4-ох символів')
        .max(16, 'Більше 16-ти символів')
        .required('Введіть пароль'),
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

    const redirectToRegistration = () => {
        navigate(REGISTRATION_PATH);
    };

    return (
        <Form>
            <Typography variant="h1">Вхід</Typography>
            <BoxInput>
                <TextField
                    fullWidth
                    label="Ім'я користувача"
                    variant="standard"
                    {...register('username')}
                    error={errors?.username ? true : false}
                    helperText={
                        errors?.username
                            ? errors.username.message || 'Error!!!'
                            : ''
                    }
                />
            </BoxInput>
            <BoxInput>
                <TextField
                    fullWidth
                    label="Пароль"
                    type="password"
                    variant="standard"
                    {...register('password')}
                    error={errors?.password ? true : false}
                    helperText={
                        errors?.password
                            ? errors.password.message || 'Error!!!'
                            : ''
                    }
                />
            </BoxInput>
            <BoxButton>
                <Button
                    sx={{ width: '150px' }}
                    variant="contained"
                    onClick={handleSubmit(submitForm)}
                >
                    Ввійти
                </Button>
            </BoxButton>
            <BoxButton>
                <Button onClick={redirectToRegistration}>
                    Зареєструватись
                </Button>
            </BoxButton>
        </Form>
    );
};

export default FormLogIn;
