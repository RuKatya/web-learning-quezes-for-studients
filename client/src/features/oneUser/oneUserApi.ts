import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOneUser = createAsyncThunk("oneUser/getOneUser", async (userID: number) => {
    try {
        const { data } = await axios.post('/users/get-one-user', { userID })
        return data
    } catch (error) {
        console.log(error)
    }
})