import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { Box, styled } from '@mui/system';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH, MAIN_SCREEN } from 'routes';
import { authSelector, registrationUser } from 'store/reducers/AuthSlice';
import * as yup from 'yup';

interface InterfaceRegistration {
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

const FormRegistration = () => {
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
        getValues,
    } = useForm<InterfaceRegistration>({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (idUser) navigate(MAIN_SCREEN);
    }, [idUser, navigate]);

    const isUniqueUsername = async (username: string) => {
        const response = await axios.get(
            `http://localhost:8000/users?username=${username}`
        );
        return response.data.length == 0;
    };

    const clickRegistration = async (data: InterfaceRegistration) => {
        const uniqueUsername = await isUniqueUsername(data.username);
        if (uniqueUsername) dispatch(registrationUser(data));
        else alert('Такий користувач вже існує, спробуйте щось інше');
    };

    const redirectToLogIn = () => {
        navigate(LOGIN_PATH);
    };

    return (
        <Form>
            <Title>Реєстрація</Title>
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
                    variant="contained"
                    onClick={handleSubmit(clickRegistration)}
                >
                    Зареєструватись
                </Button>
            </BoxInput>
            <BoxInput>
                <Button onClick={redirectToLogIn}>Повернутись назад</Button>
            </BoxInput>
        </Form>
    );
};

export default FormRegistration;
