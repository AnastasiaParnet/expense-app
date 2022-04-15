import {
    createAsyncThunk,
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { ICategory } from 'models/ICategory';
import { IUser } from 'models/IUser';
import { AppDispatch, RootState } from 'store/store';
import { v4 as uuidv4 } from 'uuid';

interface CategoryState {
    categories: ICategory[];
    arrayIdActualCategories: string[];
}

const initializationCategories = createAsyncThunk(
    'category/initialization',
    async (idUser: string, thunkAPI) => {
        try {
            const response = await axios.get<IUser>(
                `http://localhost:8000/users/${idUser}`
            );
            return response.data.categories;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося');
        }
    }
);

const addCategory = createAsyncThunk(
    'category/addCategory',
    async (
        {
            idUser,
            masCategories,
            labelNewCategory,
        }: {
            idUser: string;
            masCategories: ICategory[];
            labelNewCategory: string;
        },
        thunkAPI
    ) => {
        try {
            const newCategory: ICategory = {
                id: uuidv4(),
                label: labelNewCategory,
                read_only: false,
            };
            masCategories = [...masCategories, newCategory];
            const response = await axios.patch<IUser>(
                `http://localhost:8000/users/${idUser}`,
                {
                    categories: masCategories,
                }
            );
            return response.data.categories;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося');
        }
    }
);

const changeNameCategory = createAsyncThunk(
    'category/changeNameCategory',
    async (
        {
            idUser,
            idCategory,
            newLabel,
            masCategories,
        }: {
            idUser: string;
            idCategory: string;
            newLabel: string;
            masCategories: ICategory[];
        },
        thunkAPI
    ) => {
        try {
            masCategories = masCategories.map((category: ICategory) => {
                if (category.id === idCategory)
                    return {
                        id: category.id,
                        label: newLabel,
                        read_only: category.read_only,
                    };
                return category;
            });
            const response = await axios.patch<IUser>(
                `http://localhost:8000/users/${idUser}`,
                {
                    categories: masCategories,
                }
            );
            return response.data.categories;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося');
        }
    }
);

const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (
        {
            idUser,
            idCategory,
            masCategories,
        }: {
            idUser: string;
            idCategory: string;
            masCategories: ICategory[];
        },
        thunkAPI
    ) => {
        try {
            masCategories = masCategories.filter(
                (category: ICategory) => category.id !== idCategory
            );
            const response = await axios.patch<IUser>(
                `http://localhost:8000/users/${idUser}`,
                {
                    categories: masCategories,
                }
            );
            return response.data.categories;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося');
        }
    }
);

const changeActualCategories = (masId: string[]) => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.changeArrayIdActualCategories(masId));
};

const clearCategory = () => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.clearCategory());
};

const initialState: CategoryState = {
    categories: [],
    arrayIdActualCategories: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeArrayIdActualCategories(state, action: PayloadAction<string[]>) {
            state.arrayIdActualCategories = action.payload;
        },
        clearCategory(state) {
            state.categories = [];
            state.arrayIdActualCategories = [];
        },
    },
    extraReducers: {
        [initializationCategories.fulfilled.type]: (
            state,
            action: PayloadAction<ICategory[]>
        ) => {
            state.categories = action.payload;
        },
        [addCategory.fulfilled.type]: (
            state,
            action: PayloadAction<ICategory[]>
        ) => {
            state.categories = action.payload;
        },
        [changeNameCategory.fulfilled.type]: (
            state,
            action: PayloadAction<ICategory[]>
        ) => {
            state.categories = action.payload;
        },
        [deleteCategory.fulfilled.type]: (
            state,
            action: PayloadAction<ICategory[]>
        ) => {
            state.categories = action.payload;
        },
    },
});

const rootState = (state: RootState) => state.categoryReducer;
const categorySelector = createDraftSafeSelector(rootState, (state) => {
    return state;
});

export default categorySlice.reducer;
export {
    categorySlice,
    categorySelector,
    initializationCategories,
    addCategory,
    changeNameCategory,
    deleteCategory,
    changeActualCategories,
    clearCategory,
};
