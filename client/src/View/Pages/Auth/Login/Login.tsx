import { FC, useEffect } from 'react'
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

//func(parameter)
const Login: FC<LoginProps> = ({ setUser }) => {
    const data: any = useActionData();

    useEffect(() => {
        (() => {
            if (data) {
                if (data.continueWork) {
                    setUser({ isLogin: data.userLogin, userName: data.userName, userRole: data.userRole })
                }
            }
        })()
    }, [data])

    return (
        <div>
            <AuthForm title={"Login"} buttonText={"Login"} action="/auth">
                {loginInputs.map((input, index) => (
                    <Input key={index} {...input} />
                ))}
            </AuthForm>
        </div>
    )
}

export default Login