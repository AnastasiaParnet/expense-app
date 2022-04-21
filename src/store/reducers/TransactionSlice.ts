import {
    createAsyncThunk,
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
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
            const response = await axios.get<ITransaction[]>(
                `http://localhost:8000/transactions`,
                {
                    params: {
                        id_user: idUser,
                        _sort: 'date',
                        _order: 'desc',
                    },
                }
            );
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(
                'Не вдалося ініціалізувати транзакції'
            );
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
        }: {
            idUser: string;
            label: string;
            amount: number;
            idCategory: string;
        },
        thunkAPI
    ) => {
        try {
            const date = new Date(new Date().setHours(0, 0, 0, 0));
            const newTransaction: ITransaction = {
                id: uuidv4(),
                label,
                date,
                amount,
                id_category: idCategory,
                id_user: idUser,
            };
            const response = await axios.post<ITransaction>(
                `http://localhost:8000/transactions`,
                newTransaction
            );
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося додати транзакцію');
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
        }: {
            idUser: string;
            oldIdCategory: string;
            newIdCategory: string;
        },
        thunkAPI
    ) => {
        try {
            const response_transactions = await axios.get<ITransaction[]>(
                'http://localhost:8000/transactions',
                {
                    params: {
                        id_user: idUser,
                        id_category: oldIdCategory,
                    },
                }
            );
            const transactions = response_transactions.data;
            for (const tran of transactions) {
                await axios.patch<ITransaction>(
                    `http://localhost:8000/transactions/${tran.id}`,
                    {
                        params: {
                            id_user: idUser,
                        },
                    }
                );
            }
            const response = await axios.get<ITransaction[]>(
                'http://localhost:8000/transactions',
                {
                    params: {
                        id_user: idUser,
                    },
                }
            );
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(
                'Не вдалося змінити категорію для транзакцій'
            );
        }
    }
);

const changeTransaction = createAsyncThunk(
    'transaction/changeTransaction',
    async (
        {
            idUser,
            newDataTransaction,
        }: {
            idUser: string;
            newDataTransaction: ITransaction;
        },
        thunkAPI
    ) => {
        try {
            const response = await axios.patch<ITransaction>(
                `http://localhost:8000/transactions/${newDataTransaction.id}`,
                {
                    ...newDataTransaction,
                }
            );
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося змінити транзакцію');
        }
    }
);

const deleteTransaction = createAsyncThunk(
    'transaction/delete',
    async (
        {
            idUser,
            idTransaction,
        }: {
            idUser: string;
            idTransaction: string;
        },
        thunkAPI
    ) => {
        try {
            const response = await axios.delete<ITransaction>(
                `http://localhost:8000/transactions/${idTransaction}`
            );
            if (Object.keys(response.data).length == 0) return idTransaction;
            return '';
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося видалити транзакцію');
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
            action: PayloadAction<ITransaction>
        ) => {
            state.transactions = [...state.transactions, action.payload];
        },
        [changeCategoryForTransactions.fulfilled.type]: (
            state,
            action: PayloadAction<ITransaction[]>
        ) => {
            state.transactions = action.payload;
        },
        [changeTransaction.fulfilled.type]: (
            state,
            action: PayloadAction<ITransaction>
        ) => {
            const transactionWithNewData: ITransaction = action.payload;
            state.transactions = state.transactions.map((transaction) => {
                if (transaction.id == transactionWithNewData.id)
                    return transactionWithNewData;
                return transaction;
            });
        },
        [deleteTransaction.fulfilled.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            const idDeleteTransaction = action.payload;
            state.transactions = state.transactions.filter(
                (transaction) => transaction.id !== idDeleteTransaction
            );
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
