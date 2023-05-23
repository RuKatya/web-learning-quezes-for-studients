import { selectQuestions } from '../../../../features/questions/questionsSlice'
import { useAppSelector } from '../../../../app/hooks'

const QuestionsList = () => {
    const selectQuest = useAppSelector(selectQuestions)

    return (
        <div>
            {
                selectQuest.length > 0 ? (selectQuest.map((quest) => (
                    <div key={quest.QuestionID}>
                        <div>{quest.QuestionText}</div>
                    </div>
                ))) : (<h2>No questions</h2>)
            }

        </div>
    )
}

export default QuestionsList
