import { ReactNode, FC } from 'react'
import { Link, Form } from "react-router-dom";

interface FormProps {
    children?: ReactNode,
    title: string,
    buttonText: string,
    action: string
}

const AuthForm: FC<FormProps> = ({ children, title, buttonText, action }) => {
    return (
        <Form action={action} method='post'>
            <h2>{title}</h2>
            <div>
                {children}
            </div>
            <button type="submit">{buttonText}</button>
            {title === "Login" ?
                <>Do not have account? <Link to="/auth/registretion">Registration</Link></>
                :
                <>Alredy exist? <Link to="/auth">Login</Link></>
            }
        </Form>
    )
}

export default AuthForm


