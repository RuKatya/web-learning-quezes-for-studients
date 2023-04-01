import AuthForm from '../../../UI/AuthForm'
import Input from '../../../UI/Input'

const loginInputs = [
    { type: "email", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" }
]

const Login = () => {
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