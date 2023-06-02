export interface QuizInfo {
    rightAns: number,
    titleName: string,
    titleID: number
}

export interface QuizDoneInfo {
    quizInfo: QuizInfo,
    status: 'idle' | 'loading' | 'failed',
    message: string
}

export interface ReducerPayloadInfo {
    title: string | undefined,
    titleID: number
}