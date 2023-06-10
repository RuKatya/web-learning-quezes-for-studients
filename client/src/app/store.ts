import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/dark-light-theme/theme';
import subjectsReducer from '../features/subjects/subjectsSlice';
import titlesReducer from '../features/titles/titleSlice';
import questionsReducer from '../features/questions/questionsSlice';
import doneQuizReducer from '../features/doneQuiz/doneQuizSlice';
import usersReducer from '../features/users/usersSlice';
import oneUserReducer from '../features/oneUser/oneUserSlice';
import savedFavQuizesReducer from '../features/savedFavQuizes/savedFavQuizesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    subjects: subjectsReducer,
    titles: titlesReducer,
    questions: questionsReducer,
    doneQuiz: doneQuizReducer,
    users: usersReducer,
    oneUser: oneUserReducer,
    savedFavQuizes: savedFavQuizesReducer
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
