import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Typography } from '@mui/material';
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
    confirmPassword: string;
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
    padding: '5px',
});

const validationSchema = yup.object({
    username: yup.string().required("Введіть ім'я користувача"),
    password: yup
        .string()
        .min(4, 'Менше 4-ох символів')
        .max(16, 'Більше 16-ти символів')
        .required('Введіть пароль'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Паролі не співпадають')
        .required('Введіть повторно пароль'),
});

const FormRegistration = () => {
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
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
            <Typography variant="h1">Реєстрація</Typography>
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
            <BoxInput>
                <TextField
                    fullWidth
                    label="Повторне введення паролю"
                    type="password"
                    variant="standard"
                    {...register('confirmPassword')}
                    error={errors?.confirmPassword ? true : false}
                    helperText={
                        errors?.confirmPassword
                            ? errors.confirmPassword.message || 'Error!!!'
                            : ''
                    }
                />
            </BoxInput>
            <BoxButton>
                <Button
                    variant="contained"
                    onClick={handleSubmit(clickRegistration)}
                >
                    Зареєструватись
                </Button>
            </BoxButton>
            <BoxButton>
                <Button onClick={redirectToLogIn}>Повернутись назад</Button>
            </BoxButton>
        </Form>
    );
};

export default FormRegistration;
