import { Box, Button, Menu } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import ButtonGroupCategories from './ButtonGroupCategories';

interface ListCategoriesProps {
    isDeleteCategory: boolean;
}

const BigBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    [theme.breakpoints.up('xs')]: {
        display: 'none',
    },
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const SmallBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    padding: '0',
    [theme.breakpoints.up('xs')]: {
        display: 'flex',
    },
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

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

const ListCategories: React.FC<ListCategoriesProps> = ({
    isDeleteCategory,
}) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box>
            <SmallBox>
                <Button variant="outlined" onClick={handleOpenNavMenu}>
                    Категорії
                </Button>
                <StatMenu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                >
                    <ButtonGroupCategories
                        isDeleteCategory={isDeleteCategory}
                        closeNavMenu={handleCloseNavMenu}
                    />
                </StatMenu>
            </SmallBox>
            <BigBox>
                <ButtonGroupCategories
                    isDeleteCategory={isDeleteCategory}
                    closeNavMenu={handleCloseNavMenu}
                />
            </BigBox>
        </Box>
    );
};

export default ListCategories;
