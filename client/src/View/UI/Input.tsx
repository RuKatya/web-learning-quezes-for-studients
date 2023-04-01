import { FC, useState } from "react";

export interface InputsProps {
    type: string;
    name: string;
    placeholder: string;
    defaultValue?: string
}

const Input: FC<InputsProps> = ({ type, name, placeholder }) => {
    const [showPass, setShowPass] = useState<Boolean>(false)

    return (
        name === "password" || name === "confirmPassword" ?
            <>
                <input type={showPass ? 'text' : 'password'} name={name} placeholder={placeholder} />
                <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}>Show pass</button>
            </>
            :
            <input type={type} name={name} placeholder={placeholder} />)
}

export default Input
