import {
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
    authorizationUserByNameAndPassword,
    authorizationUserByToken,
} from './ActionCreators';

interface AuthState {
    idUser: string | null;
}

const initialState: AuthState = {
    idUser: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser(state) {
            state.idUser = null;
        },
    },
    extraReducers: {
        [authorizationUserByNameAndPassword.fulfilled.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.idUser = action.payload;
        },
        [authorizationUserByToken.fulfilled.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.idUser = action.payload;
        },
    },
});

const rootState = (state: RootState) => state.authReducer;
export const authSelector = createDraftSafeSelector(rootState, (state) => {
    return state;
});

export default authSlice.reducer;
