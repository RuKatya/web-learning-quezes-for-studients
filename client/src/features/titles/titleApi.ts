import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AddTitle } from './titleInterface';

export const getTitlesBySubjectID = createAsyncThunk("titles/getTitles", async (SubjectID: number) => {
    try {
        const { data } = await axios.post('/title-quiz/get-all-titles', { SubjectID })
        return data
    } catch (error) {
        console.log(error)
    }
})


export const addNewTitle = createAsyncThunk("titles/sendTitles", async ({ SubjectID, Title }: AddTitle) => {
    try {
        const { data } = await axios.post('/title-quiz/save-new-title', { SubjectID, Title })
        return data
    } catch (error) {
        console.log(error)
    }
})