import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import BaseBox from 'components/BaseBox';
import BoxMessageTransactions from 'components/BoxMessageTransactions';
import Chart from 'components/Chart';
import React from 'react';

const BoxChart = styled(Box)({
    height: '100%',
    margin: '10px',
    width: '100%',
});

const Graphics: React.FC = () => {
    return (
        <BaseBox isChangeCategory={false}>
            <BoxChart>
                <BoxMessageTransactions />
                <Chart />
            </BoxChart>
        </BaseBox>
    );
};

export default Graphics;
