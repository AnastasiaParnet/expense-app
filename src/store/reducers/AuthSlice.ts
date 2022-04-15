import {
    createAsyncThunk,
    createDraftSafeSelector,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import crypto from 'crypto-js';
import { IUser } from 'models/IUser';
import { AppDispatch, RootState } from '../store';

interface AuthState {
    idUser: string | null;
}

const authorizationUserByNameAndPassword = createAsyncThunk(
    'user/authUserByPassword',
    async (
        { username, password }: { username: string; password: string },
        thunkAPI
    ) => {
        try {
            const response = await axios.get<IUser[]>(
                `http://localhost:8000/users?username=${username}`
            );
            const user = response.data[0];
            const bytes = crypto.AES.decrypt(user.password, 'secret_key');
            const decryptedPassword = bytes.toString(crypto.enc.Utf8);
            if (decryptedPassword === password) {
                localStorage.setItem('token', user.token);
                return user.id;
            }
            return null;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося знайти користувача');
        }
    }
);

const authorizationUserByToken = createAsyncThunk(
    'user/fetchByToken',
    async (token: string, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/users?token=${token}`
            );
            const user = response.data[0];
            if (user) return user.id;
            return null;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не вдалося знайти користувача');
        }
    }
);

const clearUser = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.clearUser());
};

const initialState: AuthState = {
    idUser: null,
};

const authSlice = createSlice({
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
const authSelector = createDraftSafeSelector(rootState, (state) => {
    return state;
});

export default authSlice.reducer;
export {
    authSlice,
    authSelector,
    authorizationUserByNameAndPassword,
    authorizationUserByToken,
    clearUser,
};
