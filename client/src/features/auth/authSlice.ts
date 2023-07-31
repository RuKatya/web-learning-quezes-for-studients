import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AuthState, CheckLogin, User } from './authInterface';
import { checkLogin, logout } from './authAPI';

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
            state.user = {
                isLogin: action.payload.isLogin,
                userName: action.payload.userName,
                userRole: action.payload.userRole
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkLogin.fulfilled, (state, action: PayloadAction<CheckLogin>) => {
                state.status = 'idle';
                if (action.payload.continueWork) {
                    state.user = {
                        isLogin: action.payload.isLogin,
                        userName: action.payload.userName,
                        userRole: action.payload.userRole
                    }
                } else {
                    state.user = {
                        isLogin: false,
                        userName: "",
                        userRole: ""
                    }
                }
            })
            .addCase(checkLogin.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state, action: PayloadAction<{ continueWork: boolean, isLogin: boolean }>) => {
                state.status = 'idle';
                state.user = {
                    isLogin: action.payload.isLogin,
                    userName: "",
                    userRole: ""
                }

            })
            .addCase(logout.rejected, (state) => {
                state.status = 'failed';
            });
    }
})

export const { userLogin } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth.user;
export default authSlice.reducer;