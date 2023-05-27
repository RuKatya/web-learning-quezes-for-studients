import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AddTitle, SaveTitleAs, UpdateTitle } from './titleInterface';

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

export const updateTitle = createAsyncThunk("titles/updateTitle", async ({ id, TitleName }: UpdateTitle) => {
    try {
        const { data } = await axios.patch("/title-quiz/update-title", { id, TitleName })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const saveDraftOrPublish = createAsyncThunk("titles/saveDraftOrPublish", async ({ draft, id }: SaveTitleAs) => {
    try {
        const { data } = await axios.patch("/title-quiz/save-draft-or-publish", { draft, id })
        return data
    } catch (error) {
        console.log(error)
    }
})

