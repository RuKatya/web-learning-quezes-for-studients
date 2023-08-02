import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectdoneQuiz } from '../../../features/doneQuiz/doneQuizSlice'

const DoneQuiz = () => {
  const doneQuiz = useAppSelector(selectdoneQuiz)
  console.log(doneQuiz)
  return (
    <div>
      <h2>Quiz: {doneQuiz.titleName}</h2>
      <h1>Total: {doneQuiz.rightAns}/{doneQuiz.totalQuestions}</h1>
      <h1>{doneQuiz.rightAns / doneQuiz.totalQuestions * 100}%</h1>
    </div>
  )
}

export default DoneQuiz