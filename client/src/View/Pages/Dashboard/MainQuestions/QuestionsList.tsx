import { selectQuestions } from '../../../../features/questions/questionsSlice'
import { useAppSelector } from '../../../../app/hooks'
import { FC } from 'react'
import QuestionItem from './QuestionItem'

const QuestionsList: FC = () => {
    const selectQuest = useAppSelector(selectQuestions)

    return (
        <div>
            {selectQuest.length > 0 ? (selectQuest.map((quest) => (
                <QuestionItem key={quest.QuestionID} {...quest} />
            ))) : (<h2>No questions, to add new Question press "+"</h2>)}
        </div>
    )
}

export default QuestionsList
