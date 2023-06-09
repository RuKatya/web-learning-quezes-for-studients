export const validateForm = (fieldName: string, value: string) => {
    switch (fieldName) {
        case 'userName':
            const nameValid = value.length > 2
            return nameValid
        case 'email':
            const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            const isValidEmail = emailRegex.test(value);
            return isValidEmail
        case 'password':
            const passRegex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/);
            const passValid = passRegex.test(value)
            return passValid
        case 'confirmPassword':
            const passRegex1 = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/);
            const passValid1 = passRegex1.test(value)
            return passValid1
        default:
            return false
    }
}

export const validBeforeSend = (user: any) => {
    // console.log(user)

    const { userName, email, password, confirmPassword } = user

    // console.log(email)
    if (userName < 2) {
        return { continueNext: false, messageFromClient: "User Name less than 2 symbols" }
    }

    const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if (!emailRegex.test(email)) {
        return { continueNext: false, messageFromClient: "Email are not valid" }
    }

    const passRegex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/);

    if (!passRegex.test(password)) {
        return { continueNext: false, messageFromClient: "Password is not correct" }
    }

    if (!passRegex.test(confirmPassword)) {
        return { continueNext: false, messageFromClient: "Confirm Password is not correct" }
    }

    if (password !== confirmPassword) {
        return { continueNext: false, messageFromClient: "The Password and the Confirm Password are not the same" }
    }

    return { continueNext: true }
}