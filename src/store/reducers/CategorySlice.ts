import {
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { ICategory } from 'models/ICategory';
import { RootState } from 'store/store';

interface CategoryState {
    categories: ICategory[];
    actualCategories: number[];
}

const initialState: CategoryState = {
    categories: [],
    actualCategories: [],
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        initialCategory(state, action: PayloadAction<ICategory[]>) {
            state.categories = action.payload;
        },
        addCategory(state, action: PayloadAction<ICategory>) {
            state.categories = [...state.categories, action.payload];
        },
        changeActualCategories(state, action: PayloadAction<number[]>) {
            state.actualCategories = action.payload;
        },
        clearCategory(state) {
            state.categories = [];
            state.actualCategories = [];
        },
    },
});

const rootState = (state: RootState) => state.categoryReducer;
export const categorySelector = createDraftSafeSelector(rootState, (state) => {
    return state;
});

export default categorySlice.reducer;
