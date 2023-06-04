import { FC, useState } from 'react'
import QuestionItem from './QuestionItem'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import { selectQuestions } from '../../../../../features/questions/questionsSlice'
import { deleteManyQuestions } from '../../../../../features/questions/questionsApi'

const QuestionsList: FC = () => {
    const dispatch = useAppDispatch()
    const selectQuest = useAppSelector(selectQuestions)
    const [arrQuestToDelete, setArrQuestToDelete] = useState<Array<number>>([])

    return (
        <div>
            {arrQuestToDelete.length > 0 ? (
                <button onClick={() => dispatch(deleteManyQuestions(arrQuestToDelete))}>Delete All Selected</button>
            ) : null}
            {selectQuest.length > 0 ? (selectQuest.map((quest) => (
                <QuestionItem key={quest.QuestionID} {...quest} setArrQuestToDelete={setArrQuestToDelete} arrQuestToDelete={arrQuestToDelete} />
            ))) : (<h2>No questions, to add new Question press "+"</h2>)}
        </div>
    )
}

export default QuestionsList
