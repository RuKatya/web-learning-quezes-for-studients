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

export interface QuestionPayload {
    continueWork: boolean,
    message: string,
}

export interface Get_Save_QuestionsInterface extends QuestionPayload {
    questions: Array<Questions>
}

export interface DeleteQuestion extends QuestionPayload {
    id: number
}

export interface DeleteManyQuestions extends QuestionPayload {
    ids: Array<number>
}

export interface UpdateQuest {
    QuestionID: number
    QuestionText: string
    Answer1: string
    Answer2: string
    Answer3: string
    Answer4: string
    RigthQuestion: string
}

export interface UpdatePayload extends QuestionPayload, UpdateQuest { }