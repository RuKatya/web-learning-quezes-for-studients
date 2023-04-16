import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/dark-light-theme/theme';
import subjectsReducer from '../features/subjects/subjectsSlice';
import titlesReducer from '../features/titles/titleSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    subjects: subjectsReducer,
    titles: titlesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
