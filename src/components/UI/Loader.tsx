import { CircularProgress, styled } from '@mui/material';
import React from 'react';

const MyLoader = styled(CircularProgress)({
    margin: '20%',
    color: 'rgb(188, 121, 148)',
    animationDuration: '550ms',
    justifyContent: 'center',
});

const Loader: React.FC = () => {
    return (
        <MyLoader
            variant="indeterminate"
            disableShrink
            size={60}
            thickness={4}
        />
    );
};

export default Loader;
