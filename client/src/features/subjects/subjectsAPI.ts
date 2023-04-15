import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSubjects = createAsyncThunk("subjects/getSubjects", async () => {
    try {
        const { data } = await axios.get('/subjects/get-all-subjects')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const addSubject = createAsyncThunk("subjects/addNewSubject", async (subjectName: string) => {
    try {
        const { data } = await axios.post("/subjects/save-new-subject", { subjectName })
        return data
    } catch (error) {
        console.log(error)
    }
})
