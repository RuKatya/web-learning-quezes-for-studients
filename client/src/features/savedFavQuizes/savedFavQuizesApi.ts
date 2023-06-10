import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFavQuizes = createAsyncThunk('savedFavQuizes/getFavQuizes', async () => {
    try {
        const { data } = await axios.get("/saved-quizes/get-all-saved-quizes")
        return data
    } catch (error) {
        console.log(error)
    }
})

interface SaveToFavQuizes {
    Title_QuizID: number
    Title_Name: string
}

export const saveToFavQuizes = createAsyncThunk('savedFavQuizes/saveToFavQuizes', async ({ Title_QuizID, Title_Name }: SaveToFavQuizes) => {
    try {
        const { data } = await axios.post("/saved-quizes/save-to-quizes", { Title_QuizID, Title_Name })
        return data
    } catch (error) {
        console.log(error)
    }
})