import React, { FC, useEffect, useState } from 'react'
import { Questions } from '../../features/questions/questionsInterface'
import BtnQuiz from './BtnQuiz';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectdoneQuiz, setQuizRightAns } from '../../features/doneQuiz/doneQuizSlice';

interface QuizCardProps {
    quest: Questions
}

const QuizCard: FC<QuizCardProps> = ({ quest }) => {
    const dispatch = useAppDispatch();
    const [flagAnswered, setFlagAnswered] = useState<boolean>(false);
    const [rightAns, setRightAns] = useState<boolean>(false)
    const [showAnswer, setShowAnswer] = useState<boolean>(false)
    const doneQuiz = useAppSelector(selectdoneQuiz)

    useEffect(() => {
        if (rightAns) {
            dispatch(setQuizRightAns(doneQuiz.rightAns + 1))
        }
    }, [rightAns])

    return (
        <div>
            <div>{quest.QuestionText}</div>
            <BtnQuiz
                answer={quest.Answer1}
                answerNum={1}
                flagAnswered={flagAnswered}
                setFlagAnswered={setFlagAnswered}
                correctAns={quest.RigthQuestion}
                setRightAns={setRightAns}
            />
            <BtnQuiz
                answer={quest.Answer1}
                answerNum={2}
                flagAnswered={flagAnswered}
                setFlagAnswered={setFlagAnswered}
                correctAns={quest.RigthQuestion}
                setRightAns={setRightAns}
            />
            <BtnQuiz
                answer={quest.Answer1}
                answerNum={3}
                flagAnswered={flagAnswered}
                setFlagAnswered={setFlagAnswered}
                correctAns={quest.RigthQuestion}
                setRightAns={setRightAns}
            />
            <BtnQuiz
                answer={quest.Answer1}
                answerNum={4}
                flagAnswered={flagAnswered}
                setFlagAnswered={setFlagAnswered}
                correctAns={quest.RigthQuestion}
                setRightAns={setRightAns}
            />
            {flagAnswered && !rightAns && (<button onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? "X" : "Show Right Answer"}</button>)}
            {showAnswer && <p>{
                quest.RigthQuestion.includes("1") ? "Answer A"
                    : quest.RigthQuestion.includes("2") ? "Answer B"
                        : quest.RigthQuestion.includes("3") ? "Answer C"
                            : "Answer D"
            }
            </p>}
        </div>
    )
}

export default QuizCard
