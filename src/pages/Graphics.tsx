import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import BaseBox from 'components/Box/BaseBoxPage';
import BoxGraphic from 'components/Box/BoxGraphic';
import BoxMessageTransactions from 'components/Box/BoxMessageTransactions';
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
                <BoxGraphic />
            </BoxChart>
        </BaseBox>
    );
};

export default Graphics;
