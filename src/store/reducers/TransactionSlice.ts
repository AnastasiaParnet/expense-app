import {
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { ITransaction } from '../../models/ITransaction';

interface TransactionState {
    transactions: ITransaction[];
}

const initialState: TransactionState = {
    transactions: [],
};

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        saveTransactions(state, action: PayloadAction<ITransaction[]>) {
            state.transactions = action.payload;
        },
        addTransaction(state, action: PayloadAction<ITransaction>) {
            state.transactions = [...state.transactions, action.payload];
        },
        clearTransaction(state) {
            state.transactions = [];
        },
    },
    extraReducers: {},
});

const rootState = (state: RootState) => state.transactionReducer;
export const transactionSelector = createDraftSafeSelector(
    rootState,
    (state) => {
        return state;
    }
);

export default transactionSlice.reducer;
