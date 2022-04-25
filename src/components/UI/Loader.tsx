import { CircularProgress, styled } from '@mui/material';
import React from 'react';

const MyLoader = styled(CircularProgress)({
    color: 'rgb(188, 121, 148)',
    animationDuration: '550ms',
    justifyContent: 'center',
});

const Loader = () => {
    return (
        <MyLoader
            variant="indeterminate"
            disableShrink
            size={40}
            thickness={4}
        />
    );
};

export default Loader;
