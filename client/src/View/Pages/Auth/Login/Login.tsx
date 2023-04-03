import { FC, useEffect, useState } from 'react'
import { useActionData } from 'react-router-dom';
import AuthForm from '../../../UI/AuthForm'
import Input from '../../../UI/Input'

const loginInputs = [
    { type: "email", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" }
]

interface LoginProps {
    setUser: Function
}

const Login: FC<LoginProps> = ({ setUser }) => {
    const data: any = useActionData();
    const [errorFromServer, setErrorFromServer] = useState()

    useEffect(() => {
        if (data) {
            const { continueWork, message, isLogin, userName, userRole } = data

            if (!continueWork) {
                return setErrorFromServer(message)
            }

            return setUser({ isLogin, userName, userRole })
        }
    }, [data, setUser])

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