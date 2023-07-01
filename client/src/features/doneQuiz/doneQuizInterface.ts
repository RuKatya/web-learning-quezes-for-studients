
export interface QuizId {
    titleID: number
}

export interface QuizInfo extends QuizId {
    rightAns: number,
    titleName: string,
    totalQuestions: number
}

export interface QuizDoneInfo {
    quizInfo: QuizInfo,
    status: 'idle' | 'loading' | 'failed',
    message: string
}

export interface ReducerPayloadInfo extends QuizId {
    title: string | undefined,
    totalQuestions: number
}