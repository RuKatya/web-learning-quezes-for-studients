import AuthForm from '../../../UI/AuthForm'
import Input from '../../../UI/Input'

const regInputs = [
    { type: "text", name: "userName", placeholder: "User Name" },
    { type: "email", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" },
    { type: "password", name: "confirmPassword", placeholder: "Confirm Password" }
]

const Registration = () => {
    return (
        <div>
            <AuthForm title={"Registration"} buttonText={"Registration"} action="/auth/registretion">
                {regInputs.map((input, index) => (
                    <Input key={index} {...input} />
                ))}
            </AuthForm>
        </div>
    )
}

export default Registration