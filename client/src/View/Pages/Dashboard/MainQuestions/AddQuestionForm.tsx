import { useState } from 'react'
import { Questions } from '../../../../features/questions/questionsInterface'
import { Form, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/hooks'
import { saveQuestions } from '../../../../features/questions/questionsApi'

const AddQuestionForm = () => {
    const [questions, setQuestions] = useState<Array<Questions>>([])
    const { subjectId, titleId } = useParams()
    const dispatch = useAppDispatch()

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

    const hendleChanges = (ev: React.SyntheticEvent) => {
        const target = ev.target as typeof ev.target & {
            value: string, id: number, name: string
        }

        const indexInput = target.id
        const nameInput = target.name

        setQuestions((questions) => {
            const newArr: any[] = questions.slice();
            newArr[indexInput][nameInput] = target.value
            return newArr
        })
    }

    const hendleSaveQuestions = (draft: boolean) => {
        dispatch(saveQuestions({ questions, draft }))
        setQuestions([])
    }

    return (
        <div>
            <Form>
                {questions.map((input, index) => (
                    <div key={index}>
                        <div>
                            <textarea name="QuestionText" id={`${index}`} placeholder="Question" defaultValue={input.QuestionText} cols={30} rows={10} onChange={hendleChanges}></textarea>
                            <input type="text" id={`${index}`} name="Answer1" placeholder="Answer 1" defaultValue={input.Answer1} onChange={hendleChanges} />
                            <input type="text" id={`${index}`} name="Answer2" placeholder="Answer 2" defaultValue={input.Answer2} onChange={hendleChanges} />
                            <input type="text" id={`${index}`} name="Answer3" placeholder="Answer 3" defaultValue={input.Answer3} onChange={hendleChanges} />
                            <input type="text" id={`${index}`} name="Answer4" placeholder="Answer 4" defaultValue={input.Answer4} onChange={hendleChanges} />
                            <select name="RigthQuestion" id={`${index}`} onChange={hendleChanges}>
                                <option value="Answer1">A</option>
                                <option value="Answer2">B</option>
                                <option value="Answer3">C</option>
                                <option value="Answer4">D</option>
                            </select>
                        </div>
                        <div>
                            {questions.length > 0 && (
                                <button type="button" onClick={() => handleRemoveInput(index)}>X</button>
                            )}
                        </div>
                    </div>
                ))}
                <button type='button' onClick={hendleAddInput}>+</button>
                {questions.length > 0 && (
                    <>
                        <button type='button' onClick={() => hendleSaveQuestions(false)}>Save</button>
                        <button type='button' onClick={() => hendleSaveQuestions(true)}>Save as Draft</button>
                    </>
                )}
            </Form>
        </div>
    )
}

export default AddQuestionForm
