import { useActionData } from 'react-router-dom'
import AuthForm from '../../../UI/AuthForm'
import Input from '../../../UI/Input'

const regInputs = [
    { type: "text", name: "userName", placeholder: "User Name", inputInfo: "Please choose a username minimum 2 character." },
    { type: "email", name: "email", placeholder: "Email", inputInfo: "Please enter a valid email address. <b>examle@email.com</b>" },
    {
        type: "password", name: "password", placeholder: "Password", inputInfo: `Password must: 
    <ul>
        <li>Include letters and numbers.</li>  
        <li>At least one special character <b>!@#$%^&*</b></li>  
        <li>Without spaces.</li>  
        <li>At least 6 sybmols.</li>  
    </ul>`},
    { type: "password", name: "confirmPassword", placeholder: "Confirm Password", inputInfo: "Please Confirm Password" }
]

const Registration = () => {
    const data: any = useActionData()

    return (
        <AuthForm title={"Registration"} buttonText={"CREATE ACCOUNT"} action="/auth/registretion">
            <p>{data}</p>
            {regInputs.map((input, index) => (
                <Input key={index} {...input} />
            ))}
        </AuthForm>
    )
}

export default Registration