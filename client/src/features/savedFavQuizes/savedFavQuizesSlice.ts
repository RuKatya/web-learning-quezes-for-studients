import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GetSavedQuizedPayload, RemoveFromFavQuizes, savedQuizesInit, saveToFavQuizesPayload } from './savedFavQuizesInterface';
import { getFavQuizes, removeFromFavQuizes, saveToFavQuizes } from './savedFavQuizesApi';

const initialState: savedQuizesInit = {
    count: 0,
    list: [],
    status: 'idle',
    message: ""
}

export const savedFavQuizesSlice = createSlice({
    name: "savedFavQuizes",
    initialState,
    reducers: {
        setMessageEmpty: (state) => {
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFavQuizes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFavQuizes.fulfilled, (state, action: PayloadAction<GetSavedQuizedPayload>) => {
                state.status = 'idle';
                const { continueWork, quizes, message } = action.payload

                if (continueWork) {
                    state.count = quizes.length
                    state.list = quizes
                } else {
                    state.message = message
                    state.list = []
                }
            })
            .addCase(getFavQuizes.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(saveToFavQuizes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveToFavQuizes.fulfilled, (state, action: PayloadAction<saveToFavQuizesPayload>) => {
                state.status = 'idle';

                const { continueWork, message, savedQuizID, Title_QuizID, Title_Name, SubjectName } = action.payload

                if (continueWork) {
                    state.list = [...state.list, { savedQuizID, Title_QuizID, Title_Name, SubjectName }]
                    state.count = state.list.length
                } else {
                    state.message = message
                }
            })
            .addCase(saveToFavQuizes.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(removeFromFavQuizes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeFromFavQuizes.fulfilled, (state, action: PayloadAction<RemoveFromFavQuizes>
            ) => {
                state.status = 'idle';

                const { continueWork, message, savedQuizID } = action.payload

                if (continueWork) {
                    state.list = state.list.filter(item => item.savedQuizID !== savedQuizID)
                    state.count = state.list.length
                } else {
                    state.message = message
                }
            })
            .addCase(removeFromFavQuizes.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const { setMessageEmpty } = savedFavQuizesSlice.actions
export const selectSavedQuizes = (state: RootState) => state.savedFavQuizes.list;
export const countSavedQuizes = (state: RootState) => state.savedFavQuizes.count;
export const SavedQuizesMessage = (state: RootState) => state.savedFavQuizes.message;
export const SavedQuizesStatus = (state: RootState) => state.savedFavQuizes.status;
export default savedFavQuizesSlice.reducer;