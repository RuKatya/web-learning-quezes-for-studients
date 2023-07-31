import { DeleteInterface } from "../subjects/subjectsInterface"

export interface Title {
    savedQuizID?: number | null,
    SubjectID: number,
    Title: string,
    Title_QuizID: number,
    Draft: number
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
    Title_QuizID: number,
    Draft: number
}

export interface UpdateTitle {
    id: number,
    TitleName: string
}

export interface UpdateTtileInterface extends DeleteInterface {
    TitleName: string
}

export interface SaveTitleAs {
    draft: boolean
    id: number
}

export interface SaveTitleAsPayload {
    continueWork: boolean,
    message: string,
    id: number
    Draft: number
}