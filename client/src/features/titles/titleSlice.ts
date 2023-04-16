import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Title {
    SubjectID: number,
    Title: string,
    Title_QuizID: number
}

interface TitleList {
    list: Array<Title>,
    status: 'idle' | 'loading' | 'failed',
    message: string
}

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

    }
})

export const { setTitleMessageEmpty } = titlesSlice.actions
export const selectTitles = (state: RootState) => state.titles.list;
export const subjectMessage = (state: RootState) => state.titles.message;
export const titlesSubjectsStatus = (state: RootState) => state.titles.message;
export default titlesSlice.reducer;
