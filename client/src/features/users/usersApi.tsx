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

export const deleteOneUser = createAsyncThunk("users/deleteOneUser", async (userID: number) => {
    try {
        const { data } = await axios.delete('/users/delete-one-user', { data: { userID } })
        return data
    } catch (error) {
        console.log(error)
    }
})