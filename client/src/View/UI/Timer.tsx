// import { useEffect, useState } from 'react'

const Timer = () => {
    // const [seconds, setSeconds] = useState<number>(0); //timer
    // const [minuts, setMinuts] = useState<number | string>(0); //timer


    // useEffect(() => {
    // setTimeout(() => setSeconds(seconds + 1), 1000)
    // setSeconds(seconds + 1)
    // if(seconds > 0) {

    // }
    // if (seconds > 0 && arrayNum < 23) {
    //     setTimeout(() => setSeconds(seconds - 1), 1000);
    // } else if (seconds === 0) {
    //     setSeconds(0);
    //     navigation("/total", { replace: true });
    // // }
    // let sec: any = seconds % 60;
    // if (sec < 10) {
    //     sec = "0" + sec;
    // }

    // if (Number(minuts) < 10) {
    //     setMinuts("0" + minuts)
    // }
    // }, [seconds])




    return (
        <div className="timer">
            {/* {minuts}: {seconds} */}
            {/* {Math.floor(seconds / 60)}:{sec} */}
        </div>
    );
}

export default Timer
