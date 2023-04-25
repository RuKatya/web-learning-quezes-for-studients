import { RotatingLines } from 'react-loader-spinner'

const LoadingPage = () => {
    return (
        <div className='loader'>
            <RotatingLines
                strokeColor="#DC1DF1"
                strokeWidth="4"
                animationDuration="0.75"
                width="30"
                visible={true}
            />
            <h1>LOADING</h1>
        </div>
    )
}

export default LoadingPage
