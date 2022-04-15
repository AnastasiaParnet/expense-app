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
            masTransactions,
            label,
            amount,
            idCategory,
        }: {
            idUser: string;
            masTransactions: ITransaction[];
            label: string;
            amount: number;
            idCategory: string;
        },
        thunkAPI
    ) => {
        try {
            const dateNowString = new Date().toLocaleString('ukr', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
            });
            const newTransaction: ITransaction = {
                id: uuidv4(),
                label,
                date: dateNowString,
                amount,
                id_category: idCategory,
            };
            masTransactions = [...masTransactions, newTransaction];
            const response = await axios.patch<IUser>(
                `http://localhost:8000/users/${idUser}`,
                {
                    transactions: masTransactions,
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
            masTransactions,
        }: {
            idUser: string;
            oldIdCategory: string;
            newIdCategory: string;
            masTransactions: ITransaction[];
        },
        thunkAPI
    ) => {
        try {
            masTransactions = masTransactions.map(
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
                    transactions: masTransactions,
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
    clearTransaction,
};
