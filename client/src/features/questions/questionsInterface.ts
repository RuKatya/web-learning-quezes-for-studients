export interface Questions {
    QuestionID?: number
    QuestionText: string
    Answer1: string
    Answer2: string
    Answer3: string
    Answer4: string
    RigthQuestion: string
    SubjectID: number
    Title_QuizID: number
}

export interface QuestionsList {
    list: Array<Questions>,
    status: 'idle' | 'loading' | 'failed',
    message: string
}

export interface getQuestionsInterface {
    continueWork: boolean,
    message: string,
    questions: Array<Questions>
}