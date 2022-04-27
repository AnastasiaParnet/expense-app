import {
    createAsyncThunk,
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { dateNow } from 'hooks/date';
import { AppDispatch, RootState } from 'store/store';
import { v4 as uuidv4 } from 'uuid';
import { ITransaction } from '../../models/ITransaction';

interface IPageParams {
    page: number;
    limit: number;
    search: string;
    sort: SORT_TRANSACTION;
    orderSort: ORDER_SORT;
    dateStart: string | null;
    dateEnd: string | null;
    arrayIdActualCategories: string[];
}

enum SORT_TRANSACTION {
    Label = 'label',
    Date = 'date',
    Amount = 'amount',
}

enum ORDER_SORT {
    Asc = 'asc',
    Desc = 'desc',
}

interface TransactionState {
    transactions: ITransaction[];
    isLoading: boolean;
    error: string;
    totalTransactions: number;
    pageParams: IPageParams;
}

const fetchTransactions = createAsyncThunk(
    'transaction/fetchByPage',
    async (
        {
            idUser,
            pageParams,
        }: {
            idUser: string;
            pageParams: IPageParams;
        },
        thunkAPI
    ) => {
        try {
            const response = await axios.get<ITransaction[]>(
                `http://localhost:8000/transactions`,
                {
                    params: {
                        id_user: idUser,
                        id_category: pageParams.arrayIdActualCategories,
                        label_like: pageParams.search,
                        _page: pageParams.page,
                        _limit: pageParams.limit,
                        _sort: pageParams.sort,
                        date_gte: pageParams.dateStart,
                        date_lte: pageParams.dateEnd,
                        _order: pageParams.orderSort,
                    },
                }
            );
            return {
                transactions: response.data,
                totalTransactions: response.headers['x-total-count'],
            };
        } catch (e) {
            return thunkAPI.rejectWithValue(
                'Не вдалося ініціалізувати транзакції'
            );
        }
    }
);

const addTransaction =
    ({
        idUser,
        label,
        amount,
        idCategory,
        pageParams,
    }: {
        idUser: string;
        label: string;
        amount: number;
        idCategory: string;
        pageParams: IPageParams;
    }) =>
    async (dispatch: AppDispatch) => {
        try {
            const newTransaction: ITransaction = {
                id: uuidv4(),
                label,
                date: dateNow(),
                amount,
                id_category: idCategory,
                id_user: idUser,
            };
            await axios.post<ITransaction>(
                `http://localhost:8000/transactions`,
                newTransaction
            );
            dispatch(fetchTransactions({ idUser, pageParams }));
        } catch (e) {
            console.error(e);
            dispatch(
                transactionSlice.actions.changeError(
                    'Не вдалося додати транзакцію'
                )
            );
        }
    };

const changeCategoryForTransactions =
    ({
        idUser,
        oldIdCategory,
        newIdCategory,
        pageParams,
    }: {
        idUser: string;
        oldIdCategory: string;
        newIdCategory: string;
        pageParams: IPageParams;
    }) =>
    async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get<ITransaction[]>(
                'http://localhost:8000/transactions',
                {
                    params: {
                        id_user: idUser,
                        id_category: oldIdCategory,
                    },
                }
            );
            for (const tran of response.data) {
                await axios.patch<ITransaction>(
                    `http://localhost:8000/transactions/${tran.id}`,
                    {
                        id_category: newIdCategory,
                    }
                );
            }
            dispatch(fetchTransactions({ idUser, pageParams }));
        } catch (e) {
            console.error(e);
            dispatch(
                transactionSlice.actions.changeError(
                    'Не вдалося змінити категорію для транзакцій'
                )
            );
        }
    };

const changeTransaction =
    ({
        idUser,
        newDataTransaction,
        pageParams,
    }: {
        idUser: string;
        newDataTransaction: ITransaction;
        pageParams: IPageParams;
    }) =>
    async (dispatch: AppDispatch) => {
        try {
            await axios.patch<ITransaction>(
                `http://localhost:8000/transactions/${newDataTransaction.id}`,
                {
                    ...newDataTransaction,
                }
            );
            dispatch(fetchTransactions({ idUser, pageParams }));
        } catch (e) {
            console.error(e);
            dispatch(
                transactionSlice.actions.changeError(
                    'Не вдалося змінити транзакцію'
                )
            );
        }
    };

const deleteTransaction =
    ({
        idUser,
        idTransaction,
        pageParams,
    }: {
        idUser: string;
        idTransaction: string;
        pageParams: IPageParams;
    }) =>
    async (dispatch: AppDispatch) => {
        try {
            await axios.delete<ITransaction>(
                `http://localhost:8000/transactions/${idTransaction}`
            );
            dispatch(fetchTransactions({ idUser, pageParams }));
        } catch (e) {
            console.error(e);
            dispatch(
                transactionSlice.actions.changeError(
                    'Не вдалося видалити транзакцію'
                )
            );
        }
    };

const changePageParams =
    (pageParams: IPageParams) => (dispatch: AppDispatch) => {
        dispatch(transactionSlice.actions.changePageParams(pageParams));
    };

const clearTransaction = () => (dispatch: AppDispatch) => {
    dispatch(transactionSlice.actions.clearTransaction());
};

const initialState: TransactionState = {
    transactions: [],
    totalTransactions: 1,
    isLoading: false,
    error: '',
    pageParams: {
        page: 1,
        limit: 3,
        search: '',
        sort: SORT_TRANSACTION.Date,
        orderSort: ORDER_SORT.Desc,
        dateStart: '',
        dateEnd: '',
        arrayIdActualCategories: [],
    },
};

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        changeError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        changePageParams(state, action: PayloadAction<IPageParams>) {
            state.pageParams = action.payload;
        },
        clearTransaction(state) {
            state.transactions = [];
        },
    },
    extraReducers: {
        [fetchTransactions.pending.type]: (state) => {
            state.transactions = [];
            state.isLoading = true;
            state.error = '';
        },
        [fetchTransactions.fulfilled.type]: (state, action) => {
            state.transactions = action.payload.transactions;
            state.totalTransactions = action.payload.totalTransactions;
            state.isLoading = false;
            state.error = '';
        },
        [fetchTransactions.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.transactions = [];
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

const rootState = (state: RootState) => state.transactionReducer;
const transactionSelector = createDraftSafeSelector(rootState, (state) => {
    return state;
});

export default transactionSlice.reducer;
export {
    type IPageParams,
    SORT_TRANSACTION,
    ORDER_SORT,
    transactionSlice,
    transactionSelector,
    fetchTransactions,
    addTransaction,
    changeCategoryForTransactions,
    changeTransaction,
    deleteTransaction,
    clearTransaction,
    changePageParams,
};
