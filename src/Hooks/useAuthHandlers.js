import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { containsHTML, isValidEmail, isValidName, isValidPassword } from "../componenets/Auth/Chickinput";





const useAuthHandlers = (baseUrl, onSuccess) => {
    const [userEmail, setUserEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const resetForm = () => {
        setLoginEmail("");
        setLoginPassword("");
        setUserEmail("");
        setPassword("");
        setName("");
        setLoginError("");
        setShowPasswordForm(false);
    };

    const handleGoogleSuccess = (credentialResponse) => {
        if (!credentialResponse || !credentialResponse.credential) {
            console.error("استجابة Google غير صالحة:", credentialResponse);
            return;
        }
        const decoded = jwtDecode(credentialResponse.credential);
        setUserEmail(decoded.email);
        setName(decoded.name);
        setShowPasswordForm(true);
    };

    const registerUser = async ({ email, password, name }) => {



        if (containsHTML(userEmail) || containsHTML(name) || containsHTML(password)) {
            setLoginError("لا يسمح بإدخال وسوم HTML.");
            return;
        }

        if (!isValidEmail(userEmail)) {
            setLoginError("صيغة البريد الإلكتروني غير صحيحة.");
            return;
        }

        if (!isValidName(name)) {
            setLoginError("الاسم يجب أن يحتوي على حروف فقط.");
            return;
        }

        if (!isValidPassword(password)) {
            setLoginError("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل وتحتوي على حرف ورقم.");
            return;
        }


        try {
            const response = await fetch(`${baseUrl}user/api/register/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, password: password, name: name })
            });
            console.log(response);
            const data = await response.json();
            if (response.ok) {
                setUserEmail("");
                setName("");
                setPassword("");
                setShowPasswordForm(false);
                localStorage.setItem("token", data.token);
                setShowSuccess(true);
                setLoginError("");

                onSuccess && onSuccess();
            } else {
                setShowPasswordForm(false);
                setUserEmail("");
                setPassword("");
                setLoginError(data.error || "Registration failed");
                console.error("Registration error:", data);
            }
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const loginUser = async () => {

        if (!loginEmail || !loginPassword) {
            setLoginError("يرجى تعبئة جميع الحقول.");
            return;
        }

        if (containsHTML(loginEmail) || containsHTML(loginPassword)) {
            setLoginError("لا يسمح بإدخال وسوم HTML.");
            return;
        }

        if (!isValidEmail(loginEmail)) {
            setLoginError("صيغة البريد الإلكتروني غير صحيحة.");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/user/api/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.access);
                setLoginError("");
                setLoginEmail("");
                setLoginPassword("");

                onSuccess && onSuccess();
            } else {
                setLoginError(data.error || "Invalid email or password.");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };


    return {
        userEmail,
        setUserEmail,
        name,
        setName,
        password,
        setPassword,
        showPasswordForm,
        setShowPasswordForm,
        handleGoogleSuccess,
        registerUser,
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        loginError,
        setLoginError,
        loginUser,
        showSuccess,
        setShowSuccess,
        resetForm
    };
};

export default useAuthHandlers;
