const validateRegister = (name: string, email: string, password: string, confirmPassword: string) => {
    if (!name || !email || !password)
        return 'Please add all required fields.'

    if (!validateEmail(email))
        return 'Invalid email.'

    if (password.length < 6)
        return 'Password must be at least 6 characters.'

    if (password !== confirmPassword)
        return 'Passwords did not match.'
}

const validateUpdatePassword = (password: string, confirmPassword: string) => {
    if (password.length < 6)
        return 'Password must be at least 6 characters.'

    if (password !== confirmPassword)
        return 'Passwords did not match.'
}

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export { validateRegister, validateUpdatePassword }