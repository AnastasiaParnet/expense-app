import {
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { ICategory } from 'models/ICategory';
import { RootState } from 'store/store';

interface CategoryState {
    categories: ICategory[];
    arrayIdActualCategories: string[];
}

const initialState: CategoryState = {
    categories: [],
    arrayIdActualCategories: [],
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        saveCategories(state, action: PayloadAction<ICategory[]>) {
            state.categories = action.payload;
        },
        addCategory(state, action: PayloadAction<ICategory>) {
            state.categories = [...state.categories, action.payload];
        },
        changeArrayIdActualCategories(state, action: PayloadAction<string[]>) {
            state.arrayIdActualCategories = action.payload;
        },
        clearCategory(state) {
            state.categories = [];
            state.arrayIdActualCategories = [];
        },
    },
});

const rootState = (state: RootState) => state.categoryReducer;
export const categorySelector = createDraftSafeSelector(rootState, (state) => {
    return state;
});

export default categorySlice.reducer;
