import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addNewTitle, getTitlesBySubjectID } from './titleApi';
import { NewTitle, TitleList, getTitleInterface } from './titleInterface';

const initialState: TitleList = {
    list: [],
    status: 'idle',
    message: ""
};

export const titlesSlice = createSlice({
    name: "titles",
    initialState,
    reducers: {
        setTitleMessageEmpty: (state) => {
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTitlesBySubjectID.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTitlesBySubjectID.fulfilled, (state, action: PayloadAction<getTitleInterface>) => {
                state.status = 'idle';

                const { continueWork, message, titles } = action.payload

                if (continueWork) {
                    state.list = titles
                } else {
                    state.message = message
                }
            })
            .addCase(getTitlesBySubjectID.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(addNewTitle.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewTitle.fulfilled, (state, action: PayloadAction<NewTitle>
            ) => {
                state.status = 'idle';
                console.log(action.payload)
                const { continueWork, message, Title, SubjectID, Title_QuizID } = action.payload


                if (continueWork) {
                    state.message = message
                    state.list = [...state.list, { SubjectID, Title, Title_QuizID }]
                } else {
                    state.message = message
                }
            })
            .addCase(addNewTitle.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const { setTitleMessageEmpty } = titlesSlice.actions
export const selectTitles = (state: RootState) => state.titles.list;
export const titlesMessage = (state: RootState) => state.titles.message;
export const titlesStatus = (state: RootState) => state.titles.status;
export default titlesSlice.reducer;
