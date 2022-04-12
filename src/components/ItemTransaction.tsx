import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';

interface ItemTransactionProps {
    label: string;
    category: string;
    date: string;
    amount: number;
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    margin: '10px 10% 10px 0px',
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const Label = styled('span')({
    fontSize: '20px',
});

const DivItem = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
});

const Amount = styled('h1')({
    fontSize: '20px',
    margin: 0,
});

const ItemTransaction: React.FC<ItemTransactionProps> = ({
    label,
    category,
    date,
    amount,
}) => {
    return (
        <Item>
            <DivItem>
                <Label>{label}</Label>
                <span>{category}</span>
            </DivItem>
            <DivItem>
                <Amount>{amount}</Amount>
                <span>{date}</span>
            </DivItem>
        </Item>
    );
};

export default ItemTransaction;
