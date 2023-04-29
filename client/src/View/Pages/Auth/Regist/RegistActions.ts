import axios from "axios";
import { RegUser } from "./RegistInterface";
import { redirect } from "react-router-dom";
import { validBeforeSend } from "../../../../hooks/formValidation";

const registration = async ({ userName, email, password, confirmPassword }: RegUser) => {
    const { data } = await axios.post('/users/save-new-user', { userName, email, password, confirmPassword })
    return data
}

export const registAction = async ({ request }: any) => {
    const formData = await request.formData();

    const registUser = {
        userName: formData.get("userName"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };

    if (
        !formData.get("userName") ||
        !formData.get("email") ||
        !formData.get("password") ||
        !formData.get("confirmPassword")
    ) { return "All field are required"; }

    const validData = validBeforeSend(registUser)
    const { continueNext, messageFromClient } = validData

    if (!continueNext) return messageFromClient

    const data = await registration(registUser);

    const { continueWork, error, message } = data;

    if (continueWork) return redirect("/auth")

    if (error || !continueWork) return message;
}