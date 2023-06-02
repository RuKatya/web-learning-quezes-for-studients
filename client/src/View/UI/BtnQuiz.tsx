import { FC, useRef } from "react";
// import { addScore } from "../../features/score/scoreSlice";

interface BtnQuizProps {
  answer: string,
  answerNum: number,
  flagAnswered: boolean,
  setFlagAnswered: Function,
  correctAns: string,
  setRightAns: Function
}
const BtnQuiz: FC<BtnQuizProps> = ({ answer, answerNum, flagAnswered, setFlagAnswered, correctAns, setRightAns }) => {
  // const dispatch = useDispatch();
  const refAnswer = useRef<HTMLButtonElement>(null);

  const checkAns = (ev: any, correctAns: string) => {
    if (!flagAnswered) {
      setFlagAnswered(true)

      if (correctAns === ev.target.name) {
        setRightAns(true)
        refAnswer.current !== null && refAnswer.current?.classList.toggle("right__answer")
      } else {
        setRightAns(false)
        refAnswer.current !== null && refAnswer.current?.classList.toggle("wrong__answer")
      }
    } else {
      alert("You Alredy Answered This Question")
    }
  };

  return (
    <button
      ref={refAnswer}
      onClick={(ev) => checkAns(ev, correctAns)}
      className="ansBtn"
      name={`Answer${answerNum}`}
    >
      {answer}
    </button>
  )
};

export default BtnQuiz;
