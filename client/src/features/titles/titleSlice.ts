import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addNewTitle, getTitlesBySubjectID, removeTitle, updateTitle } from './titleApi';
import { NewTitle, TitleList, UpdateTtileInterface, getTitleInterface } from './titleInterface';
import { DeleteInterface } from '../subjects/subjectsInterface';

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
                const { continueWork, message, Title, SubjectID, Title_QuizID, Draft } = action.payload


                if (continueWork) {
                    state.message = message
                    state.list = [...state.list, { SubjectID, Title, Title_QuizID, Draft }]
                } else {
                    state.message = message
                }
            })
            .addCase(addNewTitle.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(removeTitle.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeTitle.fulfilled, (state, action: PayloadAction<DeleteInterface>) => {
                state.status = 'idle';
                const { id, continueWork, message } = action.payload

                if (continueWork) {
                    state.list = state.list.filter(item => item.Title_QuizID !== id)
                    state.message = message
                } else {
                    state.message = message
                }
            })
            .addCase(removeTitle.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(updateTitle.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTitle.fulfilled, (state, action: PayloadAction<UpdateTtileInterface>
            ) => {
                state.status = 'idle';

                console.log(action.payload)
                const { id, continueWork, message, TitleName } = action.payload

                if (continueWork) {
                    state.list = state.list.map(item => item.Title_QuizID === id ? { ...item, Title: TitleName } : item)
                    state.message = message
                } else {
                    state.message = message
                }
            })
            .addCase(updateTitle.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const { setTitleMessageEmpty } = titlesSlice.actions
export const selectTitles = (state: RootState) => state.titles.list;
export const titlesMessage = (state: RootState) => state.titles.message;
export const titlesStatus = (state: RootState) => state.titles.status;
export default titlesSlice.reducer;
