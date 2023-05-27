import React, { FC, useState } from 'react'
import { Form } from 'react-router-dom'
import { Questions } from '../../../../features/questions/questionsInterface'
import { updateQuest } from '../../../../features/questions/questionsApi'
import { useAppDispatch } from '../../../../app/hooks'

export interface EditQuestProps {
    editItem: boolean,
    quest: Questions
}

const EditQuestionForm: FC<EditQuestProps> = ({ editItem, quest }) => {
    const dispatch = useAppDispatch()

    const hendleUpdateQuestion = (ev: React.SyntheticEvent) => {
        ev.preventDefault()

        const target = ev.target as typeof ev.target & {
            id: number
            QuestionText: { value: string },
            Answer1: { value: string },
            Answer2: { value: string },
            Answer3: { value: string },
            Answer4: { value: string },
            RigthQuestion: { value: string }
        }

        const QuestionID = Number(target.id)
        const QuestionText = target.QuestionText.value
        const Answer1 = target.Answer1.value
        const Answer2 = target.Answer2.value
        const Answer3 = target.Answer3.value
        const Answer4 = target.Answer4.value
        const RigthQuestion = target.RigthQuestion.value

        console.log(QuestionID, QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion)
        dispatch(updateQuest({ QuestionID, QuestionText, Answer1, Answer2, Answer3, Answer4, RigthQuestion }))


    }
    return <div>
        {editItem && (
            <Form onSubmit={hendleUpdateQuestion} id={`${quest.QuestionID}`}>
                <textarea
                    name="QuestionText"
                    placeholder="Question"
                    defaultValue={quest.QuestionText}
                    cols={30}
                    rows={10}></textarea>
                <input type="text" name="Answer1" defaultValue={quest.Answer1} />
                <input type="text" name="Answer2" defaultValue={quest.Answer2} />
                <input type="text" name="Answer3" defaultValue={quest.Answer3} />
                <input type="text" name="Answer4" defaultValue={quest.Answer4} />
                <select name="RigthQuestion" defaultValue={quest.RigthQuestion} required>
                    <option disabled> Choose rigth answer</option>
                    <option value="Answer1">A</option>
                    <option value="Answer2">B</option>
                    <option value="Answer3">C</option>
                    <option value="Answer4">D</option>
                </select>
                <button type="submit">Update</button>
            </Form>
        )}
    </div>
}

export default EditQuestionForm
