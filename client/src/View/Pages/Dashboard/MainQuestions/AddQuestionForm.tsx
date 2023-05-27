import { useState } from 'react'
import { Questions } from '../../../../features/questions/questionsInterface'
import { Form, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/hooks'
import { saveQuestions } from '../../../../features/questions/questionsApi'
import EditQuestionForm from './EditQuestionForm'

const AddQuestionForm = () => {
    const [questions, setQuestions] = useState<Array<Questions>>([])
    const { subjectId, titleId } = useParams()
    const dispatch = useAppDispatch()

    // ---- Add New Input ---- //
    const hendleAddInput = () => {
        setQuestions((q) => {
            return [...q, { QuestionText: "", Answer1: "", Answer2: "", Answer3: "", Answer4: "", Title_QuizID: Number(titleId), RigthQuestion: "", SubjectID: Number(subjectId) }]
        })
    };

    // ---- Remove Input ---- //
    const handleRemoveInput = (index: number) => {
        const rows = [...questions];
        rows.splice(index, 1);
        setQuestions(rows);
    };

    // ---- Save Changes of Input ---- //
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

    // ---- Save Questions ---- //
    const hendleSaveQuestions = (draft: boolean) => {
        const values = questions.flatMap(ques => Object.values(ques))
        const allEmpty = values.some((val) => {
            return val.length === 0
        })

        if (allEmpty) {
            return alert("All fields are required")
        }

        dispatch(saveQuestions({ questions, draft }))
    }

    return (
        <div>
            <Form>
                {questions.map((input, index) => (
                    <div key={index}>
                        <div>
                            <textarea
                                name="QuestionText"
                                id={`${index}`}
                                placeholder="Question"
                                defaultValue={input.QuestionText}
                                cols={30}
                                rows={10}
                                onChange={hendleChanges}
                                required
                                minLength={5}></textarea>
                            <input
                                type="text"
                                id={`${index}`}
                                name="Answer1"
                                placeholder="Answer 1"
                                defaultValue={input.Answer1}
                                onChange={hendleChanges}
                                required
                                minLength={2}
                            />
                            <input
                                type="text"
                                id={`${index}`}
                                name="Answer2"
                                placeholder="Answer 2"
                                defaultValue={input.Answer2}
                                onChange={hendleChanges}
                                required
                                minLength={2}
                            />
                            <input
                                type="text"
                                id={`${index}`}
                                name="Answer3"
                                placeholder="Answer 3"
                                defaultValue={input.Answer3}
                                onChange={hendleChanges}
                                required
                                minLength={2}
                            />
                            <input
                                type="text"
                                id={`${index}`}
                                name="Answer4"
                                placeholder="Answer 4"
                                defaultValue={input.Answer4}
                                onChange={hendleChanges}
                                required
                                minLength={2}
                            />
                            <select name="RigthQuestion" id={`${index}`} onChange={hendleChanges} defaultValue={"default"} required>
                                <option disabled value={"default"}> Choose rigth answer</option>
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
                        <button type='button' onClick={() => hendleSaveQuestions(false)}>Publish</button>
                        <button type='button' onClick={() => hendleSaveQuestions(true)}>Save as Draft</button>
                    </>
                )}
            </Form>
        </div>
    )
}

export default AddQuestionForm
