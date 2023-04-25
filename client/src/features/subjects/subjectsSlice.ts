import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DeleteInterface, getSubjectsInterface, NewSubject, Subjects, UpdateInterface } from './subjectsInterface';
import { addSubject, getSubjects, removeSubject, updateSubject } from './subjectsAPI';

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

                if (continueWork) {
                    state.message = message
                    state.list = [...state.list, { SubjectID, SubjectName }]
                } else {
                    state.message = message
                }
            })
            .addCase(addSubject.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(removeSubject.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeSubject.fulfilled, (state, action: PayloadAction<DeleteInterface>) => {
                state.status = 'idle';
                const { id, continueWork, message } = action.payload
                console.log(id)

                if (continueWork) {
                    state.list = state.list.filter(item => item.SubjectID !== id)
                    state.message = message
                } else {
                    state.message = message
                }
            })
            .addCase(removeSubject.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(updateSubject.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSubject.fulfilled, (state, action: PayloadAction<UpdateInterface>) => {
                state.status = 'idle';
                const { id, continueWork, message, SubjectName } = action.payload

                if (continueWork) {
                    state.list = state.list.map(item => item.SubjectID == id ? { ...item, SubjectName } : item)
                    state.message = message
                } else {
                    state.message = message
                }
            })
            .addCase(updateSubject.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export const { setMessageEmpty } = subjectsSlice.actions
export const selectSubject = (state: RootState) => state.subjects.list;
export const subjectSubjectsMessage = (state: RootState) => state.subjects.message;
export const subjectSubjectsStatus = (state: RootState) => state.subjects.status;
export default subjectsSlice.reducer;