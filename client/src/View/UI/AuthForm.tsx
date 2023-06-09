import { ReactNode, FC } from 'react'
import { Link, Form } from "react-router-dom";
import { selectTheme } from '../../features/dark-light-theme/theme';
import { useAppSelector } from '../../app/hooks';
import { useResponsivity } from '../../hooks/useWidth';

interface FormProps {
    children?: ReactNode,
    title: string,
    buttonText: string,
    action: string
}

const AuthForm: FC<FormProps> = ({ children, title, buttonText, action }) => {
    const theme = useAppSelector(selectTheme)
    const isMobile = useResponsivity()

    return (
        <div className={`authForm-box authForm-box__${theme}-theme`}>
            <Form action={action} method='post' className={`authForm authForm__${theme}-theme`}>
                <h2>{title}</h2>
                {children}
                <button
                    type="submit"
                    className='authForm__submitBtn'
                    disabled={false}
                >{buttonText}</button>
                {title === "Login" ?
                    <div
                        className={`authForm__create-login-info authForm__create-login-info__${theme}-theme`}>
                        Do not have an account?
                        <Link
                            to="/auth/registretion"
                            className={`authForm__create-login-info__link authForm__create-login-info__link__${theme}-theme`}
                        >Sign up</Link>
                    </div>
                    :
                    <div
                        className={`authForm__create-login-info authForm__create-login-info__${theme}-theme`}>
                        Have an account?
                        {isMobile && <br />}
                        <Link
                            to="/auth"
                            className={`authForm__create-login-info__link authForm__create-login-info__link__${theme}-theme`}
                        >Login now </Link>
                    </div>
                }
            </Form >
        </div >
    )
}

export default AuthForm


