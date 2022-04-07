import {
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { ICategory } from 'models/ICategory';
import { RootState } from 'store/store';

interface CategoryState {
    categories: ICategory[];
    actualCategory: number;
}

const initialState: CategoryState = {
    categories: [],
    actualCategory: -1,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        initialCategory(state, action: PayloadAction<ICategory[]>) {
            state.categories = action.payload;
            state.actualCategory = 0;
        },
        changeActualCategory(state, action: PayloadAction<number>) {
            state.actualCategory = action.payload;
        },
    },
});

const rootState = (state: RootState) => state.categoryReducer;
export const categorySelector = createDraftSafeSelector(rootState, (state) => {
    return state;
});

export default categorySlice.reducer;
