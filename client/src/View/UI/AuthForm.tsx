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
        <div className='authPage'>
            <Form action={action} method='post' className='authForm'>
                <h2>{title}</h2>
                {children}
                <button type="submit">{buttonText}</button>
                {title === "Login" ?
                    <div>Do not have an account? <Link to="/auth/registretion">Sign up</Link></div>
                    :
                    <div>Have an account? <Link to="/auth">Login now </Link></div>
                }
            </Form>
        </div>
    )
}

export default AuthForm


