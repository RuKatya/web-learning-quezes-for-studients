import React, { useState } from 'react'
import { Form, useParams } from 'react-router-dom'

interface Questions {
    QuestionID?: number
    QuestionText: string
    Answer1: string
    Answer2: string
    Answer3: string
    Answer4: string
    RigthQuestion: string
    SubjectID: number
    Title_QuizID: number
}

const MainQuestions = () => {
    const { subjectId, titleId } = useParams()

    const [questions, setQuestions] = useState<Array<Questions>>([{ QuestionText: "", Answer1: "", Answer2: "", Answer3: "", Answer4: "", RigthQuestion: "", SubjectID: Number(subjectId), Title_QuizID: Number(titleId) }])

    const hendleAddInput = () => {
        setQuestions((q) => {
            return [...q, { QuestionText: "", Answer1: "", Answer2: "", Answer3: "", Answer4: "", RigthQuestion: "", SubjectID: Number(subjectId), Title_QuizID: Number(titleId) }]
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
        const value: string = e.target.value

        setQuestions((questions) => {
            const newArr: any[] = questions.slice();
            newArr[indexInput][nameInput] = value
            return newArr
        })
    }

    const hendleSaveQuestions = () => {

    }

    const hendleSaveAsDraftQuestions = () => {

    }

    return (
        <div>
            <h2>Questions</h2>
            <Form>
                {questions.map((input, index) => (
                    <>
                        <div>
                            <textarea name="QuestionText" id={`${index}`} value={input.QuestionText} cols={30} rows={10} onChange={hendleChanges}></textarea>
                            <input type="text" id={`${index}`} name="Answer1" value={input.Answer1} onChange={hendleChanges} />
                            <input type="text" id={`${index}`} name="Answer2" value={input.Answer2} onChange={hendleChanges} />
                            <input type="text" id={`${index}`} name="Answer3" value={input.Answer3} onChange={hendleChanges} />
                            <input type="text" id={`${index}`} name="Answer4" value={input.Answer4} onChange={hendleChanges} />
                            <input type="text" id={`${index}`} name="RigthQuestion" value={input.RigthQuestion} onChange={hendleChanges} />
                        </div>
                        <div>
                            {questions.length !== 1 && (
                                <button type="button" onClick={() => handleRemoveInput(index)}>X</button>
                            )}
                        </div>
                    </>
                ))}
                <button type='button' onClick={hendleAddInput}>+</button>
                <button type='submit'>Add new Questions</button>
            </Form>
        </div>
    )
}

export default MainQuestions
