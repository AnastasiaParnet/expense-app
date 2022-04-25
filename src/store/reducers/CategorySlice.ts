import {
    createAsyncThunk,
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { ICategory } from 'models/ICategory';
import { AppDispatch, RootState } from 'store/store';
import { v4 as uuidv4 } from 'uuid';

interface CategoryState {
    categories: ICategory[];
}

const initializationCategories = createAsyncThunk(
    'category/initialization',
    async (idUser: string, thunkAPI) => {
        try {
            const response = await axios.get<ICategory[]>(
                `http://localhost:8000/categories`,
                {
                    params: {
                        id_user: idUser,
                    },
                }
            );
            if (response.data.length == 0) {
                const masCategoriesForNewUser: ICategory[] = [
                    {
                        id: uuidv4(),
                        label: 'інше',
                        read_only: true,
                        id_user: idUser,
                    },
                    {
                        id: uuidv4(),
                        label: 'зарплатня',
                        read_only: false,
                        id_user: idUser,
                    },
                    {
                        id: uuidv4(),
                        label: 'подарунки',
                        read_only: false,
                        id_user: idUser,
                    },
                    {
                        id: uuidv4(),
                        label: 'подорож',
                        read_only: false,
                        id_user: idUser,
                    },
                ];
                let masResponseData: ICategory[] = [];
                for (const category of masCategoriesForNewUser) {
                    const response = await axios.post<ICategory>(
                        'http://localhost:8000/categories',
                        category
                    );
                    masResponseData = [...masResponseData, response.data];
                }
                console.log(masResponseData);
                return masResponseData;
            }
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(
                'Не вдалося ініціалізувати категорії'
            );
        }
    }
);

const addCategory = createAsyncThunk(
    'category/addCategory',
    async (
        {
            idUser,
            labelNewCategory,
        }: {
            idUser: string;
            labelNewCategory: string;
        },
        thunkAPI
    ) => {
        try {
            const newCategory: ICategory = {
                id: uuidv4(),
                label: labelNewCategory,
                read_only: false,
                id_user: idUser,
            };
            const response = await axios.post<ICategory>(
                `http://localhost:8000/categories`,
                newCategory
            );
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося додати категорію');
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
        }: {
            idUser: string;
            idCategory: string;
            newLabel: string;
        },
        thunkAPI
    ) => {
        try {
            const response = await axios.patch<ICategory>(
                `http://localhost:8000/categories/${idCategory}`,
                {
                    id: idCategory,
                    label: newLabel,
                }
            );
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(
                'Не вдалося змінити назву категорії'
            );
        }
    }
);

const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (
        {
            idUser,
            idCategory,
        }: {
            idUser: string;
            idCategory: string;
        },
        thunkAPI
    ) => {
        try {
            console.log('category1');
            const response = await axios.delete<ICategory>(
                `http://localhost:8000/categories/${idCategory}`
            );
            console.log('category2');
            if (Object.keys(response.data).length == 0) return idCategory;
            return '';
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося видалити категорію');
        }
    }
);

const clearCategory = () => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.clearCategory());
};

const initialState: CategoryState = {
    categories: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        clearCategory(state) {
            state.categories = [];
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
            action: PayloadAction<ICategory>
        ) => {
            state.categories = [...state.categories, action.payload];
        },
        [changeNameCategory.fulfilled.type]: (
            state,
            action: PayloadAction<ICategory>
        ) => {
            const categoryWithNewName: ICategory = action.payload;
            state.categories = state.categories.map((category) => {
                if (category.id == categoryWithNewName.id)
                    return categoryWithNewName;
                return category;
            });
        },
        [deleteCategory.fulfilled.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            const idDeleteCategory = action.payload;
            state.categories = state.categories.filter(
                (category) => category.id !== idDeleteCategory
            );
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
    clearCategory,
};
