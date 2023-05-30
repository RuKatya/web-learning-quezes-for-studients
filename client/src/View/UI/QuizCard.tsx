import React, { FC, useState } from 'react'
import { Questions } from '../../features/questions/questionsInterface'
import BtnQuiz from './BtnQuiz';

interface QuizCardProps {
    quest: Questions
}
const QuizCard: FC<QuizCardProps> = ({ quest }) => {
    const [flagAnswered, setFlagAnswered] = useState(false);

    // const bla = Object.keys(quest)
    // console.log(bla)

    return (
        <div>
            <div>{quest.QuestionText}</div>
            <BtnQuiz
                answer={quest.Answer1}
                answerNum={1}
                flagAnswered={flagAnswered}
                setFlagAnswered={setFlagAnswered}
                correctAns={quest.RigthQuestion}
            />
            <BtnQuiz
                answer={quest.Answer1}
                answerNum={2}
                flagAnswered={flagAnswered}
                setFlagAnswered={setFlagAnswered}
                correctAns={quest.RigthQuestion}
            />
            <BtnQuiz
                answer={quest.Answer1}
                answerNum={3}
                flagAnswered={flagAnswered}
                setFlagAnswered={setFlagAnswered}
                correctAns={quest.RigthQuestion}
            />
            <BtnQuiz
                answer={quest.Answer1}
                answerNum={4}
                flagAnswered={flagAnswered}
                setFlagAnswered={setFlagAnswered}
                correctAns={quest.RigthQuestion}
            />
        </div>
    )
}

export default QuizCard
