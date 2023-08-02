import { RootState } from "../../app/store";
import { deleteOneUser, getAllUsers } from "./usersApi";
import { UsersList, getAllUserPayload } from "./usersInterface";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UsersList = {
    list: [],
    status: 'idle',
    message: ""
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setTitleMessageEmpty: (state) => {
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<getAllUserPayload>) => {
                state.status = 'idle';

                const { continueWork, message, users } = action.payload

                if (continueWork) {
                    state.list = users
                } else {
                    state.message = message
                }
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(deleteOneUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteOneUser.fulfilled, (state, action
                //: PayloadAction<getUserPayload>
            ) => {
                state.status = 'idle';
                console.log(action.payload)

                const { continueWork, userID, message } = action.payload

                if (continueWork) {
                    state.list = state.list.filter(item => item.UserID !== userID)
                } else {
                    state.message = message
                }
            })
            .addCase(deleteOneUser.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const { setTitleMessageEmpty } = usersSlice.actions
export const selectUsers = (state: RootState) => state.users.list;
export const usersMessage = (state: RootState) => state.users.message;
export const usersStatus = (state: RootState) => state.users.status;
export default usersSlice.reducer;