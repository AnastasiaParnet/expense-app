import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';

const NavbarBase: React.FC = ({ children }) => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>{children}</Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavbarBase;
