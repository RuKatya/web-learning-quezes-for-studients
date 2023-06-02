import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectdoneQuiz } from '../../../features/doneQuiz/doneQuizSlice'

const DoneQuiz = () => {
    const doneQuiz = useAppSelector(selectdoneQuiz)
  return (
    <div>
        <h2>Quiz: {doneQuiz.titleName}</h2>
        <h1>Total: {doneQuiz.rightAns}</h1>
    </div>
  )
}

export default DoneQuiz