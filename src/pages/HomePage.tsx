import { Box, styled } from '@mui/system';
import NavbarBase from 'components/Navbar/NavbarBase';
import NavbarHome from 'components/Navbar/NavbarHome';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GRAPHICS_SCREEN, MAIN_SCREEN } from 'routes';
import { authSelector } from 'store/reducers/AuthSlice';
import { initializationCategories } from 'store/reducers/CategorySlice';
import { initializationTransactions } from 'store/reducers/TransactionSlice';
import Graphics from './Graphics';
import Main from './Main';

const HomeBox = styled(Box)({
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
});

export const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { idUser } = useAppSelector(authSelector);

    useEffect(() => {
        if (idUser) {
            dispatch(initializationCategories(idUser));
            dispatch(initializationTransactions(idUser));
        }
    }, [dispatch, idUser]);

    return (
        <HomeBox>
            <NavbarBase>
                <NavbarHome />
            </NavbarBase>
            <Routes>
                <Route path={MAIN_SCREEN} element={<Main />} />
                <Route path={GRAPHICS_SCREEN} element={<Graphics />} />
                <Route path="*" element={<Navigate to={MAIN_SCREEN} />} />
            </Routes>
        </HomeBox>
    );
};
