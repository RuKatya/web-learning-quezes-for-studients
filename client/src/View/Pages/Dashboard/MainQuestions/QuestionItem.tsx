import { FC } from 'react'
import { Questions } from '../../../../features/questions/questionsInterface'
import { deleteQuestion } from '../../../../features/questions/questionsApi'
import { useAppDispatch } from '../../../../app/hooks'

const QuestionItem: FC<Questions> = ({ ...quest }) => {
    const dispatch = useAppDispatch()

    const hendleDeleteQuestion = (id: number) => {
        console.log(quest.QuestionID)
        console.log(id)
        const approveUserToDelete = window.confirm("Are you sure you want to delete the question?")

        if (approveUserToDelete) {
            const makeSureToDelete = prompt(`To delete the subject, please write Delete Question`)

            if (makeSureToDelete === "Delete Question") {
                dispatch(deleteQuestion(id))
                console.log(`deleted ${id}`)
            } else {
                alert("Wrong Value")
            }
        }
    }

    return (
        <div>
            <div key={quest.QuestionID}>
                <p>Question: {quest.QuestionText}</p>
                <p style={{
                    color: quest.RigthQuestion === "Answer1" ? "green" : "none"
                }}>A: {quest.Answer1}</p>
                <p style={{
                    color: quest.RigthQuestion === "Answer2" ? "green" : "none"
                }}>B: {quest.Answer2}</p>
                <p style={{
                    color: quest.RigthQuestion === "Answer3" ? "green" : "none"
                }}>C: {quest.Answer3}</p>
                <p style={{
                    color: quest.RigthQuestion === "Answer4" ? "green" : "none"
                }}>D: {quest.Answer4}</p>
            </div>
            <div>
                <button onClick={() => hendleDeleteQuestion(Number(quest.QuestionID))}>Delete</button>
                <button>Edit</button>
            </div>
        </div>
    )
}

export default QuestionItem
