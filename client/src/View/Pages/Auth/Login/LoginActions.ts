import axios from "axios";
import { LoginUser } from "./LoginInterface";

const login = async ({ email, password }: LoginUser) => {
    const { data } = await axios.post('/users/login-user', { email, password })
    return data
}

export const loginAction = async ({ request }: any) => {
    const formData = await request.formData();

    const registUser = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    if (
        !formData.get("email") ||
        !formData.get("password")
    ) { return "All field are required"; }

    const data = await login(registUser);

    const { error, message } = data;

    if (data) return data

    if (error) return message;
}