import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getSubjectsInterface, NewSubject, Subjects } from './subjectsInterface';
import { addSubject, getSubjects } from './subjectsAPI';
import { SubjectList } from './subjectsInterface';


const initialState: Subjects = {
    list: [],
    status: 'idle',
    message: ""
};

export const subjectsSlice = createSlice({
    name: "subjects",
    initialState,
    reducers: {
        setMessageEmpty: (state) => {
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubjects.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSubjects.fulfilled, (state, action: PayloadAction<getSubjectsInterface>) => {
                state.status = 'idle';

                const { subjects, continueWork, message } = action.payload

                if (continueWork) {
                    state.list = subjects
                } else {
                    state.message = message
                }
            })
            .addCase(getSubjects.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(addSubject.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addSubject.fulfilled, (state, action: PayloadAction<NewSubject>) => {
                state.status = 'idle';
                const { SubjectID, SubjectName, continueWork, message } = action.payload
                // console.log(message)
                if (continueWork) {
                    state.message = message
                    state.list = [...state.list, { SubjectID, SubjectName }]
                } else {
                    state.message = message
                }
            })
            .addCase(addSubject.rejected, (state) => {
                state.status = 'failed';
            });

    }
})

export const { setMessageEmpty } = subjectsSlice.actions
export const selectSubject = (state: RootState) => state.subjects.list;
export const subjectMessage = (state: RootState) => state.subjects.message;
export default subjectsSlice.reducer;