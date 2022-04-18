import {
    createAsyncThunk,
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from 'models/IUser';
import { AppDispatch, RootState } from 'store/store';
import { v4 as uuidv4 } from 'uuid';
import { ITransaction } from '../../models/ITransaction';

interface TransactionState {
    transactions: ITransaction[];
}

const initializationTransactions = createAsyncThunk(
    'transaction/initialization',
    async (idUser: string, thunkAPI) => {
        try {
            const response = await axios.get<IUser>(
                `http://localhost:8000/users/${idUser}`
            );
            return response.data.transactions;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося');
        }
    }
);

const addTransaction = createAsyncThunk(
    'transaction/addTransaction',
    async (
        {
            idUser,
            label,
            amount,
            idCategory,
            transactions,
        }: {
            idUser: string;
            label: string;
            amount: number;
            idCategory: string;
            transactions: ITransaction[];
        },
        thunkAPI
    ) => {
        try {
            const newTransaction: ITransaction = {
                id: uuidv4(),
                label,
                date: new Date(),
                amount,
                id_category: idCategory,
            };
            const newMasTransactions = [...transactions, newTransaction];
            const response = await axios.patch<IUser>(
                `http://localhost:8000/users/${idUser}`,
                {
                    transactions: newMasTransactions,
                }
            );
            return response.data.transactions;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося');
        }
    }
);

const changeCategoryForTransactions = createAsyncThunk(
    'transaction/changeCategory',
    async (
        {
            idUser,
            oldIdCategory,
            newIdCategory,
            transactions,
        }: {
            idUser: string;
            oldIdCategory: string;
            newIdCategory: string;
            transactions: ITransaction[];
        },
        thunkAPI
    ) => {
        try {
            const newMasTransactions = transactions.map(
                (transaction: ITransaction) => {
                    if (transaction.id_category == oldIdCategory) {
                        return {
                            ...transaction,
                            id_category: newIdCategory,
                        };
                    }
                    return transaction;
                }
            );
            const response = await axios.patch<IUser>(
                `http://localhost:8000/users/${idUser}`,
                {
                    transactions: newMasTransactions,
                }
            );
            return response.data.transactions;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося');
        }
    }
);

const changeTransaction = createAsyncThunk(
    'transaction/changeTransaction',
    async (
        {
            idUser,
            newDataTransaction,
            transactions,
        }: {
            idUser: string;
            newDataTransaction: ITransaction;
            transactions: ITransaction[];
        },
        thunkAPI
    ) => {
        try {
            const newMasTransactions = transactions.map(
                (transaction: ITransaction) => {
                    if (transaction.id == newDataTransaction.id) {
                        return newDataTransaction;
                    }
                    return transaction;
                }
            );
            const response = await axios.patch<IUser>(
                `http://localhost:8000/users/${idUser}`,
                {
                    transactions: newMasTransactions,
                }
            );
            return response.data.transactions;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося');
        }
    }
);

const deleteTransaction = createAsyncThunk(
    'transaction/delete',
    async (
        {
            idUser,
            idTransaction,
            transactions,
        }: {
            idUser: string;
            idTransaction: string;
            transactions: ITransaction[];
        },
        thunkAPI
    ) => {
        try {
            const newMasTransactions = transactions.filter(
                (transaction: ITransaction) => transaction.id !== idTransaction
            );
            const response = await axios.patch<IUser>(
                `http://localhost:8000/users/${idUser}`,
                {
                    transactions: newMasTransactions,
                }
            );
            return response.data.transactions;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося');
        }
    }
);

const clearTransaction = () => (dispatch: AppDispatch) => {
    dispatch(transactionSlice.actions.clearTransaction());
};

const initialState: TransactionState = {
    transactions: [],
};

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        clearTransaction(state) {
            state.transactions = [];
        },
    },
    extraReducers: {
        [initializationTransactions.fulfilled.type]: (
            state,
            action: PayloadAction<ITransaction[]>
        ) => {
            state.transactions = action.payload;
        },
        [addTransaction.fulfilled.type]: (
            state,
            action: PayloadAction<ITransaction[]>
        ) => {
            state.transactions = action.payload;
        },
        [changeCategoryForTransactions.fulfilled.type]: (
            state,
            action: PayloadAction<ITransaction[]>
        ) => {
            state.transactions = action.payload;
        },
        [changeTransaction.fulfilled.type]: (
            state,
            action: PayloadAction<ITransaction[]>
        ) => {
            state.transactions = action.payload;
        },
        [deleteTransaction.fulfilled.type]: (
            state,
            action: PayloadAction<ITransaction[]>
        ) => {
            state.transactions = action.payload;
        },
    },
});

const rootState = (state: RootState) => state.transactionReducer;
const transactionSelector = createDraftSafeSelector(rootState, (state) => {
    return state;
});

export default transactionSlice.reducer;
export {
    transactionSlice,
    transactionSelector,
    initializationTransactions,
    addTransaction,
    changeCategoryForTransactions,
    changeTransaction,
    deleteTransaction,
    clearTransaction,
};
