import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkLogin = createAsyncThunk("auth/check-auth", async () => {
    try {
        const { data } = await axios.get('/users/check-cookies')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const logout = createAsyncThunk("auth/user-logout", async () => {
    try {
        const { data } = await axios.get('/users/user-logout')
        return data
    } catch (error) {
        console.log(error)
    }
})