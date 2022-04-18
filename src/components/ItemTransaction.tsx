import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormChangeTransaction from 'components/Forms/FormChangeTransaction';
import { dateToString } from 'hooks/date';
import { ITransaction } from 'models/ITransaction';
import React, { useState } from 'react';

interface ItemTransactionProps {
    transaction: ITransaction;
    category: string;
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
    category,
}) => {
    const [expand, setExpand] = useState<boolean>(false);

    const changeExpanded = () => {
        setExpand((prev) => !prev);
    };

    return (
        <Accordion expanded={expand}>
            <AccordionSummary onClick={changeExpanded}>
                <DivItem>
                    <DivLabel>
                        <Label>{transaction.label}</Label>
                        <span>{category.toUpperCase()}</span>
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
                    closeForm={changeExpanded}
                />
            </AccordionDetails>
        </Accordion>
    );
};

export default ItemTransaction;
