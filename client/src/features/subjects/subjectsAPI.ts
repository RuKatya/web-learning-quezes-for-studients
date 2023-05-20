import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UpdateSubject } from './subjectsInterface';

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

export const removeSubject = createAsyncThunk("subjects/removeSubject", async (id: number) => {
    try {
        const { data } = await axios.delete("/subjects/remove-subject", { data: { id } })
        return data
    } catch (error) {
        console.log(error)
    }
})



export const updateSubject = createAsyncThunk("subjects/updateSubject", async ({ id, SubjectName }: UpdateSubject) => {
    try {
        const { data } = await axios.patch("/subjects/update-subject", { id, SubjectName })
        return data
    } catch (error) {
        console.log(error)
    }
})
