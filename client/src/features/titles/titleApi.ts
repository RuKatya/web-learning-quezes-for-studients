import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AddTitle, UpdateTitle } from './titleInterface';

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

export const removeTitle = createAsyncThunk("titles/removeTitles", async (id: number) => {
    try {
        const { data } = await axios.delete("/title-quiz/remove-title", { data: { id } })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updateTitle = createAsyncThunk("titles/updateTitle", async ({ id, TitletName }: UpdateTitle) => {
    try {
        const { data } = await axios.patch("/title-quiz/update-title", { id, TitletName })
        return data
    } catch (error) {
        console.log(error)
    }
})

