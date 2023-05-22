import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { QuestionsList, getQuestionsInterface } from './questionsInterface';
import { getQuestions, saveQuestions } from './questionsApi';


const initialState: QuestionsList = {
    list: [],
    status: 'idle',
    message: ""
};

export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getQuestions.fulfilled, (state, action: PayloadAction<getQuestionsInterface>) => {
                state.status = 'idle';

                const { continueWork, message, questions } = action.payload

                if (continueWork) {
                    state.list = questions
                } else {
                    state.message = message
                }
            })
            .addCase(getQuestions.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(saveQuestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveQuestions.fulfilled, (state, action) => {
                state.status = 'idle';

                console.log(action.payload)

                const { continueWork, message, questions } = action.payload

                if (continueWork) {
                    state.list = questions
                } else {
                    state.message = message
                }


                // const { continueWork, message, questions } = action.payload

                // if (continueWork) {
                //     questions.length > 0 ?
                //         state.list = questions :
                //         state.list = []
                // } else {
                //     state.message = message
                // }
            })
            .addCase(saveQuestions.rejected, (state) => {
                state.status = 'failed';
            })
    }
})


export const selectQuestions = (state: RootState) => state.questions.list;
export const questionsMessage = (state: RootState) => state.questions.message;
export const questionsStatus = (state: RootState) => state.questions.status;
export default questionsSlice.reducer;