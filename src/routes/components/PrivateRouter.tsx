import { useAppDispatch } from 'hooks/redux';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH_PAGE } from 'routes';
import { authorizationUserByToken } from 'store/reducers/AuthSlice';

interface PrivateRouterProps {
    component: JSX.Element;
}

export const PrivateRouter: React.FC<PrivateRouterProps> = ({ component }) => {
    const token = localStorage.getItem('token');
    const dispatch = useAppDispatch();
    const location = useLocation();

    if (token) dispatch(authorizationUserByToken(token));
    else return <Navigate replace to={AUTH_PAGE} state={{ from: location }} />;

    return component;
};
