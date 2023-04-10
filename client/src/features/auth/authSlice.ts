import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AuthState, User } from './authInterface';

const initialState: AuthState = {
    user: {
        isLogin: false,
        userName: "",
        userRole: ""
    },
    status: 'idle',
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogin: (state, action: PayloadAction<User>) => {
            console.log(action.payload)
            state.user = {
                isLogin: action.payload.isLogin,
                userName: action.payload.userName,
                userRole: action.payload.userRole
            }
        }
    }
})

export const { userLogin } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth.user;
export default authSlice.reducer;