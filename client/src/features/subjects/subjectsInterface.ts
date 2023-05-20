export interface SubjectList {
    SubjectID: number,
    SubjectName: string,
}

export interface Subjects {
    list: Array<SubjectList>
    status: 'idle' | 'loading' | 'failed'
    message: string
}

export interface NewSubject extends SubjectList {
    continueWork: boolean,
    message: string
}

export interface getSubjectsInterface {
    continueWork: boolean,
    message: string,
    subjects: Array<SubjectList>
}

export interface DeleteInterface {
    continueWork: boolean,
    message: string,
    id: number,
}

export interface UpdateSubjectInterface extends DeleteInterface {
    SubjectName: string
}

export interface UpdateSubject {
    id: number,
    SubjectName: string
}