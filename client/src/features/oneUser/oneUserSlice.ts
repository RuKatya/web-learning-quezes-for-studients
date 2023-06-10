import { RootState } from "../../app/store";
// import { getAllUsers } from "./usersApi";
// import { UsersList, getAllUserPayload } from "./usersInterface";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUserPayload, oneUserInit } from "./oneUserInterface";
import { getOneUser } from "./oneUserApi";

const initialState: oneUserInit = {
    user: { UserID: 0, UserName: "", Email: "", UserRole: "user" },
    status: 'idle',
    message: ""
};

export const oneUserSlice = createSlice({
    name: "oneUser",
    initialState,
    reducers: {
        setTitleMessageEmpty: (state) => {
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOneUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOneUser.fulfilled, (state, action: PayloadAction<getUserPayload>) => {
                state.status = 'idle';

                const { continueWork, message, user } = action.payload

                if (continueWork) {
                    state.user = user
                } else {
                    state.message = message
                }
            })
            .addCase(getOneUser.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const { setTitleMessageEmpty } = oneUserSlice.actions
export const selectOneUser = (state: RootState) => state.oneUser.user;
export const oneUserMessage = (state: RootState) => state.oneUser.message;
export const oneUserStatus = (state: RootState) => state.oneUser.status;
export default oneUserSlice.reducer;