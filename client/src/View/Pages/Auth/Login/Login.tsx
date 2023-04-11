import { FC, useEffect, useState } from 'react'
import AuthForm from '../../../UI/AuthForm'
import Input from '../../../UI/Input'
import { useActionData, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/hooks'
import { userLogin } from '../../../../features/auth/authSlice'

const loginInputs = [
    { type: "email", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" }
]

const Login: FC = () => {
    const [errorFromServer, setErrorFromServer] = useState<string>()
    const navigate = useNavigate()
    const data: any = useActionData()
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            if (data) {
                const { isLogin, userName, userRole, message, continueWork } = data
                if (continueWork) {
                    dispatch(userLogin({ isLogin, userName, userRole }))
                    await navigate('/', { replace: true })
                } else {
                    setErrorFromServer(message)
                }
            }
        })()
    })

    return (
        <div>
            {errorFromServer}
            <AuthForm title={"Login"} buttonText={"Login"} action="/auth">
                {loginInputs.map((input, index) => (
                    <Input key={index} {...input} />
                ))}
            </AuthForm>
        </div>
    )
}

export default Login

/*
interface LoginProps {
    setUser: Function
}
    // <LoginProps>
        // const data: any = useActionData();
        // const [errorFromServer, setErrorFromServer] = useState()

        // useEffect(() => {
        //     if (data) {
        //         const { continueWork, message, isLogin, userName, userRole } = data

        //         if (!continueWork) {
        //             return setErrorFromServer(message)
        //         }

        //         return setUser({ isLogin, userName, userRole })
        //     }
        // }, [data, setUser])
*/