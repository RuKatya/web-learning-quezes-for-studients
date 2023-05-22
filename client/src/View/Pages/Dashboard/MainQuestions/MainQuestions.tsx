import React, { useEffect, useState } from 'react'
import { Form, useParams } from 'react-router-dom'
import { Questions } from '../../../../features/questions/questionsInterface'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { getQuestions, saveQuestions } from '../../../../features/questions/questionsApi'
import { selectQuestions } from '../../../../features/questions/questionsSlice'

const MainQuestions = () => {
    const { subjectId, titleId } = useParams()
    const dispatch = useAppDispatch()
    const selectQuest = useAppSelector(selectQuestions)
    const [questions, setQuestions] = useState([...selectQuest])

    useEffect(() => {
        setQuestions([...selectQuest])
    }, [selectQuest])

    useEffect(() => {
        dispatch(getQuestions(Number(titleId)))
    }, [titleId, dispatch])

    const hendleAddInput = () => {
        setQuestions((q) => {
            return [...q, { QuestionText: "", Answer1: "", Answer2: "", Answer3: "", Answer4: "", Title_QuizID: Number(titleId), RigthQuestion: "", SubjectID: Number(subjectId) }]
        })
    };

    const handleRemoveInput = (index: number) => {
        const rows = [...questions];
        rows.splice(index, 1);
        setQuestions(rows);
    };

    const hendleChanges = (e: any) => {
        const indexInput: number = Number(e.target.id)
        const nameInput: keyof Questions = e.target.name

        setQuestions((questions) => {
            const newArr: any[] = questions.slice();
            newArr[indexInput][nameInput] = e.target.value
            return newArr
        })
    }

    const hendleSaveQuestions = (draft: boolean) => {
        dispatch(saveQuestions({ questions, draft }))
    }

    return (
        <div>
            <h2>Questions</h2>
            <Form>
                {questions.map((input, index) => (
                    <div key={index}>
                        <div>
                            <textarea name="QuestionText" id={`${index}`} placeholder="Question" defaultValue={input.QuestionText} cols={30} rows={10} onChange={hendleChanges}></textarea>
                            <input type="text" id={`${index}`} name="Answer1" placeholder="Answer 1" defaultValue={input.Answer1} onChange={hendleChanges} />
                            <input type="text" id={`${index}`} name="Answer2" placeholder="Answer 2" defaultValue={input.Answer2} onChange={hendleChanges} />
                            <input type="text" id={`${index}`} name="Answer3" placeholder="Answer 3" defaultValue={input.Answer3} onChange={hendleChanges} />
                            <input type="text" id={`${index}`} name="Answer4" placeholder="Answer 4" defaultValue={input.Answer4} onChange={hendleChanges} />
                            <input type="text" id={`${index}`} name="RigthQuestion" placeholder='Right Question' defaultValue={input.RigthQuestion} onChange={hendleChanges} />
                        </div>
                        <div>
                            {questions.length !== 1 && (
                                <button type="button" onClick={() => handleRemoveInput(index)}>X</button>
                            )}
                        </div>
                    </div>
                ))}
                <button type='button' onClick={hendleAddInput}>+</button>
                <button type='button' onClick={() => hendleSaveQuestions(false)}>Save</button>
                <button type='button' onClick={() => hendleSaveQuestions(true)}>Save as Draft</button>
            </Form>
        </div>
    )
}

export default MainQuestions;