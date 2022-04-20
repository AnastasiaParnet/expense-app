import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
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
    padding: '25px 10%',
    border: '1px solid rgb(52, 35, 42)',
    textAlign: 'center',
});

const Title = styled('h1')({
    margin: 0,
});

const BoxInput = styled(Box)({
    padding: '7px',
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

    const redirectToRegistration = () => {
        navigate(REGISTRATION_PATH);
    };

    return (
        <Form>
            <Title style={{ textAlign: 'center' }}>Вхід</Title>
            <BoxInput>
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
            </BoxInput>
            <BoxInput>
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
            </BoxInput>
            <BoxInput>
                <Button
                    sx={{ width: '150px' }}
                    variant="contained"
                    onClick={handleSubmit(submitForm)}
                >
                    Ввійти
                </Button>
            </BoxInput>
            <BoxInput>
                <Button onClick={redirectToRegistration}>
                    Зареєструватись
                </Button>
            </BoxInput>
        </Form>
    );
};

export default FormLogIn;
