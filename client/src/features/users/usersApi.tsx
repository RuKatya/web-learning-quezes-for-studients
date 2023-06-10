import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
    try {
        const { data } = await axios.get('/users/get-all-users')
        return data
    } catch (error) {
        console.log(error)
    }
})