import { getDataFromServer } from "../users/usersInterface"

export interface SavedQuiz {
    savedQuizID: number
    Title_QuizID: number,
    Title_Name: string,
    SubjectName: string
}

export interface savedQuizesInit {
    count: number
    list: Array<SavedQuiz>
    status: 'idle' | 'loading' | 'failed'
    message?: string
}

export interface GetSavedQuizedPayload extends getDataFromServer {
    quizes: Array<SavedQuiz>
}

export interface saveToFavQuizesPayload extends getDataFromServer {
    savedQuizID: number
    Title_QuizID: number
    Title_Name: string
    SubjectName: string
}

export interface RemoveFromFavQuizes extends getDataFromServer {
    savedQuizID: number
}