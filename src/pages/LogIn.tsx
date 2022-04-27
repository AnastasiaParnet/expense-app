import { Box, styled } from '@mui/system';
import FormLogIn from 'components/Forms/FormLogIn';
import React from 'react';

const BoxLogIn = styled(Box)({
    position: 'fixed',
    top: '30%',
    right: 0,
    bottom: 0,
    left: 0,
    textAlign: 'center',
});

const LogIn: React.FC = () => {
    return (
        <BoxLogIn>
            <FormLogIn />
        </BoxLogIn>
    );
};

export default LogIn;
