import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFavQuizes = createAsyncThunk('savedFavQuizes/getFavQuizes', async () => {
    try {
        const { data } = await axios.get("/saved-quizes/get-all-saved-quizes")
        return data
    } catch (error) {
        console.log(error)
        return { message: "error" }
    }
})

interface SaveToFavQuizes {
    Title_QuizID: number
    Title_Name: string
    SubjectName: string
}

export const saveToFavQuizes = createAsyncThunk('savedFavQuizes/saveToFavQuizes', async ({ Title_QuizID, Title_Name, SubjectName }: SaveToFavQuizes) => {
    try {
        const { data } = await axios.post("/saved-quizes/save-to-quizes", { Title_QuizID, Title_Name, SubjectName })
        return data
    } catch (error) {
        console.log(error)
        return { message: "error" }
    }
})

interface RemoveFromFavQuizes {
    savedQuizID: number
}
export const removeFromFavQuizes = createAsyncThunk('savedFavQuizes/removeFromFavQuizes', async ({ savedQuizID }: RemoveFromFavQuizes) => {
    try {
        const { data } = await axios.delete("/saved-quizes/remove-from-quizes", { data: { savedQuizID } })
        return data
    } catch (error) {
        console.log(error)
        return { message: "error" }
    }
})