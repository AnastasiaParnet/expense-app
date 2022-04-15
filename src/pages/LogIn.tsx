import { styled } from '@mui/system';
import FormLogIn from 'components/Forms/FormLogIn';
import React from 'react';

const DivLogIn = styled('div')({
    position: 'fixed',
    top: '25%',
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'auto',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    fontSize: 0,
});

const LogIn: React.FC = () => {
    return (
        <DivLogIn>
            <FormLogIn />
        </DivLogIn>
    );
};

export default LogIn;
