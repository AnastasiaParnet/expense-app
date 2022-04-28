import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import styled from '@mui/system/styled';
import { useAppDispatch } from 'hooks/redux';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GRAPHICS_SCREEN, LOGIN_PATH, MAIN_SCREEN } from 'routes';
import { clearUser } from 'store/reducers/AuthSlice';
import { clearCategory } from 'store/reducers/CategorySlice';
import { clearTransaction } from 'store/reducers/TransactionSlice';

const SmallBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    padding: '0',
    width: '66px',
    [theme.breakpoints.up('xs')]: {
        display: 'flex',
    },
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

const BigTypography = styled(Typography)(({ theme }) => ({
    mr: 2,
    [theme.breakpoints.up('xs')]: {
        display: 'none',
    },
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
})) as typeof Typography;

const BigBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    margin: '0 20px',
    [theme.breakpoints.up('xs')]: {
        display: 'none',
    },
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const SmallTypography = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    [theme.breakpoints.up('xs')]: {
        display: 'flex',
    },
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
})) as typeof Typography;

const SmallButton = styled(Button)({
    my: 2,
    color: 'white',
    display: 'block',
});

const StatMenu = styled(Menu)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        display: 'block',
    },
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
    '& .MuiList-root': {
        padding: '0',
    },
}));

const StatLink = styled(Link)({
    textDecoration: 'none',
    color: 'rgb(52, 35, 42)',
});

const ActiveLink = styled(Link)({
    textDecoration: 'none',
    fontWeight: '600',
    color: 'rgb(52, 35, 42)',
});

const pages = [
    { name: 'Головна сторінка', link: MAIN_SCREEN },
    { name: 'Статистика', link: GRAPHICS_SCREEN },
];

const NavbarHome: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const logOut = () => {
        localStorage.removeItem('token');
        dispatch(clearUser());
        dispatch(clearCategory());
        dispatch(clearTransaction());
        navigate(LOGIN_PATH);
    };

    return (
        <>
            <BigTypography variant="h6" noWrap component="div">
                МОЇ ФІНАНСИ
            </BigTypography>
            <BigBox>
                {pages.map((page) => (
                    <SmallButton key={page.link} onClick={handleCloseNavMenu}>
                        {location.pathname == page.link ? (
                            <ActiveLink to={page.link}>{page.name}</ActiveLink>
                        ) : (
                            <StatLink to={page.link}>{page.name}</StatLink>
                        )}
                    </SmallButton>
                ))}
            </BigBox>
            <SmallBox>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <StatMenu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                >
                    {pages.map((page) => (
                        <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                                {location.pathname == page.link ? (
                                    <ActiveLink to={page.link}>
                                        {page.name}
                                    </ActiveLink>
                                ) : (
                                    <StatLink to={page.link}>
                                        {page.name}
                                    </StatLink>
                                )}
                            </Typography>
                        </MenuItem>
                    ))}
                </StatMenu>
            </SmallBox>
            <SmallTypography variant="h6" noWrap component="div">
                МОЇ ФІНАНСИ
            </SmallTypography>
            <Box>
                <Button color="inherit" onClick={logOut}>
                    Вийти
                </Button>
            </Box>
        </>
    );
};

export default NavbarHome;
