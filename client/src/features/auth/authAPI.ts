import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export interface LoginUser {
//     email: string
//     password: string
// }

// export const loginUser = createAsyncThunk("auth/login-user", async ({ email, password }: LoginUser) => {
//     try {
//         const { data } = await axios.post('/users/login-user', { email, password })
//         return data
//     } catch (error) {

//     }
// })