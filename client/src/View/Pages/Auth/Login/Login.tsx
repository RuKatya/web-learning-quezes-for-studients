import { FC, useEffect, useState } from 'react'
import AuthForm from '../../../UI/AuthForm'
import Input from '../../../UI/Input'
import { useActionData, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/hooks'
import { userLogin } from '../../../../features/auth/authSlice'

const loginInputs = [
    { type: "email", name: "email", placeholder: "Email", inputInfo: "Please enter a valid email address. <b>examle@email.com</b>" },
    {
        type: "password", name: "password", placeholder: "Password", inputInfo:
            `Password must: 
                <ul>
                    <li>Include letters and numbers.</li>  
                    <li>At least one special character <b>!@#$%^&*</b></li>  
                    <li>Without spaces.</li>  
                    <li>At least 6 sybmols.</li>  
                </ul>`
    }
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
        <AuthForm title={"Login"} buttonText={"SIGN IN"} action="/auth">
            <p>{errorFromServer}</p>
            {loginInputs.map((input, index) => (
                <Input key={index} {...input} />
            ))}
        </AuthForm>
    )
}

export default Login