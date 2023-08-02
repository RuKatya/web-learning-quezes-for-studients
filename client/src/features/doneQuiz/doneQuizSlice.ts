import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { QuizDoneInfo, ReducerPayloadInfo } from './doneQuizInterface';

const initialState: QuizDoneInfo = {
    quizInfo: {
        rightAns: 0,
        titleName: '',
        titleID: 0,
        totalQuestions: 0
    },
    status: 'idle',
    message: ""
};

export const doneQuizSlice = createSlice({
    name: "doneQuiz",
    initialState,
    reducers: {
        setQuizInfo: (state, action: PayloadAction<ReducerPayloadInfo>) => {
            state.quizInfo = {
                rightAns: 0,
                titleName: action.payload.title || "No data",
                titleID: action.payload.titleID,
                totalQuestions: action.payload.totalQuestions
            }
        },
        setQuizRightAns: (state, action) => {
            state.quizInfo = {
                rightAns: action.payload,
                titleName: state.quizInfo.titleName,
                titleID: state.quizInfo.titleID,
                totalQuestions: state.quizInfo.totalQuestions
            }
        }
    },
    extraReducers: (builder) => { }
})

export const { setQuizInfo, setQuizRightAns } = doneQuizSlice.actions

export const selectdoneQuiz = (state: RootState) => state.doneQuiz.quizInfo;
export const doneQuizMessage = (state: RootState) => state.doneQuiz.message;
export const doneQuizStatus = (state: RootState) => state.doneQuiz.status;
export default doneQuizSlice.reducer;