import { FC } from 'react'
import { SubjectList } from '../../../../features/subjects/subjectsInterface'
import SubjectItem from './SubjectItem'
import { selectSubject } from '../../../../features/subjects/subjectsSlice'
import { useAppSelector } from '../../../../app/hooks'

// export interface SubjectListInterface {
//     subjects: Array<SubjectList>
// }

const Subjects: FC = () => {
    const subjects = useAppSelector(selectSubject)

    return (<div className='dashboardInfo__listOfItems'>{
        subjects.length > 0 ? subjects.map((sub: SubjectList) => (
            <SubjectItem key={sub.SubjectID} sub={sub} />
        )) : (<h1 className='dashboardInfo__noSubjects-info'>No Subjects</h1>)
    }</div>)
}

export default Subjects
