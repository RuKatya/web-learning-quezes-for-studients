import { FC, useRef } from "react";
// import { addScore } from "../../features/score/scoreSlice";

interface BtnQuizProps {
  answer: string,
  answerNum: number,
  flagAnswered: boolean,
  setFlagAnswered: Function,
  correctAns: string
}
const BtnQuiz: FC<BtnQuizProps> = ({ answer, answerNum, flagAnswered, setFlagAnswered, correctAns }) => {
  // const dispatch = useDispatch();
  const refAnswer = useRef<HTMLButtonElement>(null);

  const checkAns = (ev: any, ifCorrectAns: string) => {
    if (!flagAnswered) {
      setFlagAnswered(true)

      if (ifCorrectAns == ev.target.name) {
        alert("Right")
        refAnswer.current !== null && refAnswer.current?.classList.toggle("right__answer")
        console.log(`da`)
      } else {
        alert("Wrong!")
        refAnswer.current !== null && refAnswer.current?.classList.toggle("wrong__answer")
        console.log(`net`)
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
