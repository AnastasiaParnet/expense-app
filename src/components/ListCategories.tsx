import { Box, Menu, ToggleButton } from '@mui/material';
import { styled } from '@mui/system';
import ButtonGroupCategories from 'components/ButtonGroupCategories';
import React, { useState } from 'react';

interface ListCategoriesProps {
    isChangeCategory: boolean;
}

const StatBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: 'column',
    },
}));

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

const StatToggleButton = styled(ToggleButton)({
    width: '150px',
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

const ListCategories: React.FC<ListCategoriesProps> = ({
    isChangeCategory,
}) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <StatBox>
            <Box>
                <SmallBox>
                    <StatToggleButton value="" onClick={handleOpenNavMenu}>
                        Категорії
                    </StatToggleButton>
                    <StatMenu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        <ButtonGroupCategories
                            isChangeCategory={isChangeCategory}
                            closeNavMenu={handleCloseNavMenu}
                        />
                    </StatMenu>
                </SmallBox>
                <BigBox>
                    <ButtonGroupCategories
                        isChangeCategory={isChangeCategory}
                        closeNavMenu={handleCloseNavMenu}
                    />
                </BigBox>
            </Box>
        </StatBox>
    );
};

export default ListCategories;
