export interface Title {
    SubjectID: number,
    Title: string,
    Title_QuizID: number
}

export interface TitleList {
    list: Array<Title>,
    status: 'idle' | 'loading' | 'failed',
    message: string
}

export interface getTitleInterface {
    continueWork: boolean,
    message: string,
    titles: Array<Title>
}

export interface AddTitle {
    SubjectID: number
    Title: string
}

export interface NewTitle extends AddTitle {
    continueWork: boolean,
    message: string,
    Title_QuizID: number
}