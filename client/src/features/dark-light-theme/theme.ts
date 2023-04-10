import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ThemeState } from './themeInterface';
import { getTheme } from '../../utils/useTheme';

const initialState: ThemeState = {
    themeColor: getTheme()
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setUserTheme: (state, action: PayloadAction<string>) => {
            localStorage.setItem("theme", action.payload);
            state.themeColor = action.payload
        }
    }
})

export const { setUserTheme } = themeSlice.actions
export const selectTheme = (state: RootState) => state.theme.themeColor;
export default themeSlice.reducer;