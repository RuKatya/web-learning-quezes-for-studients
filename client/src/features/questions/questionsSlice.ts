import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { QuestionsList, Get_Save_QuestionsInterface, DeleteQuestion, DeleteManyQuestions, UpdatePayload } from './questionsInterface';
import { deleteManyQuestions, deleteQuestion, getQuestions, saveQuestions, updateQuest } from './questionsApi';


const initialState: QuestionsList = {
    list: [],
    status: 'idle',
    message: ""
};

export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestionMessageEmpty: (state) => {
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            // ---- Get Question ---- //
            .addCase(getQuestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getQuestions.fulfilled, (state, action: PayloadAction<Get_Save_QuestionsInterface>) => {
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
            // ---- Save Questions ---- //
            .addCase(saveQuestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveQuestions.fulfilled, (state, action: PayloadAction<Get_Save_QuestionsInterface>) => {
                state.status = 'idle';

                console.log(action.payload)

                const { continueWork, message, questions } = action.payload

                if (continueWork) {
                    // questions.forEach((el: Questions) => {
                    //     state.list = [...state.list, el]
                    // });
                    state.list = questions
                    state.message = message
                } else {
                    state.message = message
                }
            })
            .addCase(saveQuestions.rejected, (state) => {
                state.status = 'failed';
            })
            // ---- Update Question ---- //
            .addCase(updateQuest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateQuest.fulfilled, (state, action: PayloadAction<UpdatePayload>) => {
                state.status = 'idle';

                const { continueWork, message, QuestionID, QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion } = action.payload

                if (continueWork) {
                    state.list = state.list.map(item => item.QuestionID === QuestionID ? { ...item, QuestionID, QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion } : item)
                    state.message = message
                } else {
                    state.message = message
                }
            })
            .addCase(updateQuest.rejected, (state) => {
                state.status = 'failed';
            })
            // ---- Delete Question ---- //
            .addCase(deleteQuestion.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteQuestion.fulfilled, (state, action: PayloadAction<DeleteQuestion>) => {
                state.status = 'idle';

                console.log(action.payload)

                const { continueWork, message, id } = action.payload

                if (continueWork) {
                    state.list = state.list.filter(item => item.QuestionID !== id)
                    state.message = message
                } else {
                    state.message = message
                }
            })
            .addCase(deleteQuestion.rejected, (state) => {
                state.status = 'failed';
            })
            // ---- Delete Many Questions ---- //
            .addCase(deleteManyQuestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteManyQuestions.fulfilled, (state, action: PayloadAction<DeleteManyQuestions>) => {
                state.status = 'idle';

                const { continueWork, ids, message } = action.payload

                if (continueWork) {
                    ids.forEach((id: number) => {
                        state.list = state.list.filter(item => item.QuestionID !== id)
                    });
                    state.message = message
                } else {
                    state.message = message
                }
            })
            .addCase(deleteManyQuestions.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const { setQuestionMessageEmpty } = questionsSlice.actions
export const selectQuestions = (state: RootState) => state.questions.list;
export const questionsMessage = (state: RootState) => state.questions.message;
export const questionsStatus = (state: RootState) => state.questions.status;
export default questionsSlice.reducer;