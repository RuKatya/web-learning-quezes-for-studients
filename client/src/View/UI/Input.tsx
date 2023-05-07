import { FC, useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppSelector } from "../../app/hooks";
import { selectTheme } from "../../features/dark-light-theme/theme";
import { validateForm } from "../../hooks/formValidation";

export interface InputsProps {
    type: string;
    name: string;
    placeholder: string;
    defaultValue?: string,
    inputInfo: string
}

const Input: FC<InputsProps> = ({ type, name, placeholder, inputInfo }) => {
    const [isValid, setIsValid] = useState<boolean>(false)
    const [showPass, setShowPass] = useState<Boolean>(false)
    const theme = useAppSelector(selectTheme)

    const checkValid = (ev: React.SyntheticEvent) => {
        ev.preventDefault()

        const target = ev.target as typeof ev.target & {
            name: string,
            value: string
        }

        const valid = validateForm(target.name, target.value)

        setIsValid(valid)
    }

    return (
        <>
            {name === "password" || name === "confirmPassword" ?
                <div className="inputsForm inputsForm__passElement">
                    <input
                        type={showPass ? 'text' : 'password'}
                        name={name}
                        className={`
                        inputsForm__formInputs 
                        ${isValid ?
                                `inputsForm__formInputs__valid-input`
                                :
                                `inputsForm__formInputs__notValid-${theme}-theme`}

                        `}
                        placeholder={placeholder}
                        min={6}
                        required
                    />
                    <p className="inputsForm__formInputs--info-block" dangerouslySetInnerHTML={{ __html: inputInfo }}></p>
                    <button
                        type="button"
                        className="inputsForm__passElement--show-btn"
                        onClick={() => setShowPass(!showPass)}>{showPass ?
                            <VisibilityIcon fontSize="small" sx={{ color: "grey" }} />
                            :
                            <VisibilityOffIcon fontSize="small" sx={{ color: "grey" }} />
                        }</button>
                </div>

                :
                <div className="inputsForm">
                    <input
                        type={type}
                        name={name}
                        required
                        placeholder={placeholder}
                        className={
                            `inputsForm__formInputs 
                            ${isValid ?
                                `inputsForm__formInputs__valid-input`
                                :
                                `inputsForm__formInputs__notValid-${theme}-theme`}
                        `}
                        onChange={checkValid}
                    />
                    <p className="inputsForm__formInputs--info-block" dangerouslySetInnerHTML={{ __html: inputInfo }}></p>
                </div >}
        </>
    )
}

export default Input
