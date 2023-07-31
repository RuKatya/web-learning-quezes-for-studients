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

interface updateUserRoleInter {
    userId: number
    userRole: string
}

export const updateUserRole = createAsyncThunk("oneUser/updateRole", async ({ userId, userRole }: updateUserRoleInter) => {
    try {
        const { data } = await axios.patch('/users/update-user-role', { userId, userRole })
        return data
    } catch (error) {
        console.log(error)
    }
})