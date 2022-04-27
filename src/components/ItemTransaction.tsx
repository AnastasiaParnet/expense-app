import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import FormChangeTransaction from 'components/Forms/FormChangeTransaction';
import { dateForLabel } from 'hooks/date';
import { ITransaction } from 'models/ITransaction';
import React, { useEffect, useState } from 'react';

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        name_transaction: true;
        label_transaction: true;
    }
}

interface ItemTransactionProps {
    transaction: ITransaction;
    labelCategory: string;
    idExpandTransaction: string;
    setIdExpandTransaction: (id: string) => void;
}

const BoxItem = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

const BoxLabel = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
});

const Amount = styled('h1')({
    fontSize: '25px',
    margin: 0,
});

const ItemTransaction: React.FC<ItemTransactionProps> = ({
    transaction,
    labelCategory,
    idExpandTransaction,
    setIdExpandTransaction,
}) => {
    const [expand, setExpand] = useState<boolean>(false);

    const changeExpanded = (id: string) => {
        if (!expand) setIdExpandTransaction(id);
        else setIdExpandTransaction('');
    };

    useEffect(() => {
        if (idExpandTransaction == transaction.id) setExpand(true);
        else setExpand(false);
    }, [idExpandTransaction, transaction.id]);

    return (
        <Box>
            <Accordion expanded={expand}>
                <AccordionSummary
                    onClick={() => changeExpanded(transaction.id)}
                >
                    <BoxItem>
                        <BoxLabel>
                            <Typography variant="name_transaction">
                                {transaction.label}
                            </Typography>
                            <Typography variant="label_transaction">
                                {labelCategory.toUpperCase()}
                            </Typography>
                        </BoxLabel>
                        <BoxLabel>
                            <Amount>{transaction.amount}</Amount>
                            <Typography variant="label_transaction">
                                {dateForLabel(transaction.date)}
                            </Typography>
                        </BoxLabel>
                    </BoxItem>
                </AccordionSummary>
                <AccordionDetails>
                    <FormChangeTransaction
                        transaction={transaction}
                        closeForm={() => changeExpanded(transaction.id)}
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default ItemTransaction;
