import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(188, 121, 148)',
        },
        secondary: {
            main: 'rgb(125, 100, 110)',
        },
    },
    typography: {
        h1: { fontFamily: 'Arial, Helvetica, sans-serif' },
        span: { fontFamily: 'Arial, Helvetica, sans-serif' },
    },
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    textAlign: 'right',
                    display: 'flex',
                    justifyContent: 'space-between',
                },
            },
        },
        MuiBox: {
            styleOverrides: {
                root: {
                    padding: '2%',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                fontFamily: 'Arial, Helvetica, sans-serif',
                h1: {
                    fontSize: '20px',
                    color: 'rgb(0, 0, 0, 0.6)',
                },
                name_transaction: {
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '18px',
                },
                label_transaction: {
                    fontFamily: 'Arial, Helvetica, sans-serif',
                },
            },
        },
    },
});

export default theme;
