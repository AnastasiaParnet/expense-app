import { Box, styled } from '@mui/system';
import FormRegistration from 'components/Forms/FormRegistration';
import React from 'react';

const BoxRegistration = styled(Box)({
    position: 'fixed',
    top: '25%',
    right: 0,
    bottom: 0,
    left: 0,
    textAlign: 'center',
});

const Registration: React.FC = () => {
    return (
        <BoxRegistration>
            <FormRegistration />
        </BoxRegistration>
    );
};

export default Registration;
