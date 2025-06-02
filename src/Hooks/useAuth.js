import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserInfo(decoded);
                setIsAuthenticated(true);
            } catch  {
                console.log("توكن غير صالح");
                setIsAuthenticated(false);
                localStorage.removeItem("token");
            }
        }
    }, []);

    return { isAuthenticated, userInfo };
};

export default useAuth;