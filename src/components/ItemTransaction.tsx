import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormChangeTransaction from 'components/Forms/FormChangeTransaction';
import { dateToString } from 'hooks/date';
import { ITransaction } from 'models/ITransaction';
import React, { useEffect, useState } from 'react';

interface ItemTransactionProps {
    transaction: ITransaction;
    labelCategory: string;
    idExpandTransaction: string;
    setIdExpandTransaction: (id: string) => void;
}

const Label = styled('span')({
    fontSize: '18px',
});

const DivItem = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
});

const DivLabel = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Arial, Helvetica, sans-serif',
});

const Amount = styled('h1')({
    fontSize: '20px',
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
        <Accordion expanded={expand}>
            <AccordionSummary onClick={() => changeExpanded(transaction.id)}>
                <DivItem>
                    <DivLabel>
                        <Label>{transaction.label}</Label>
                        <span>{labelCategory.toUpperCase()}</span>
                    </DivLabel>
                    <DivLabel>
                        <Amount>{transaction.amount}</Amount>
                        <span>{dateToString(transaction.date)}</span>
                    </DivLabel>
                </DivItem>
            </AccordionSummary>
            <AccordionDetails>
                <FormChangeTransaction
                    transaction={transaction}
                    closeForm={() => changeExpanded(transaction.id)}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default ItemTransaction;
