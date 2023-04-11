import { FC, useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppSelector } from "../../app/hooks";
import { selectTheme } from "../../features/dark-light-theme/theme";

export interface InputsProps {
    type: string;
    name: string;
    placeholder: string;
    defaultValue?: string
}

const Input: FC<InputsProps> = ({ type, name, placeholder }) => {
    const [showPass, setShowPass] = useState<Boolean>(false)
    const theme = useAppSelector(selectTheme)

    return (
        name === "password" || name === "confirmPassword" ?

            <div className="inputsForm__passElement">
                <input type={showPass ? 'text' : 'password'} name={name} placeholder={placeholder} required className={`inputsForm inputsForm__${theme}-theme`} />
                <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}>{showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}</button>
            </div>

            :
            <input type={type} name={name} placeholder={placeholder} required className={`inputsForm inputsForm__${theme}-theme`} />)
}

export default Input
