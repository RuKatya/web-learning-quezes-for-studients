import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UpdateQuest } from './questionsInterface';

export const getQuestions = createAsyncThunk("questions/getQuestions", async (Title_QuizID: number) => {
    const { data } = await axios.post("/title-questions/get-all-title-questions", { Title_QuizID })
    return data
})

export const saveQuestions = createAsyncThunk("questions/saveQuestions", async ({ questions, draft }: any) => {
    const { data } = await axios.post("/title-questions/save-new-questions", { questions, draft })
    return data
})

export const updateQuest = createAsyncThunk("questions/updateQuest", async ({ QuestionID, QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion }: UpdateQuest) => {
    const { data } = await axios.patch("/title-questions/update-question", { QuestionID, QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion })
    return data
})

export const deleteQuestion = createAsyncThunk("questions/deleteQuestion", async (id: number) => {
    const { data } = await axios.delete("/title-questions/delete-one-question", { data: { id } })
    return data
})

export const deleteManyQuestions = createAsyncThunk("questions/deleteManyQuestions", async (ids: Array<number>) => {
    const { data } = await axios.delete("/title-questions/delete-many-question", { data: { ids } })
    return data
})
