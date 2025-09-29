import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

function parseJwt(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
    } catch {
        return null;
    }
}

export function useAuth() {
    const [token, setToken] = useLocalStorage("authToken", null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            setUser(parseJwt(token));
        } else {
            setUser(null);
        }
    }, [token]);

    const login = useCallback(async (email, password) => {
        try {
            const res = await fetch("/api/v1/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Login Failed!")
            }
            const data = await res.json();
            setToken(data.token);
            return data;
        } catch (err) {
            console.error(err.message);
            return { error: err.message }
        }
    }, [setToken]);

    const signup = useCallback(async (formData) => {
        const res = await fetch("/api/v1/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error("Signup failed");
        const data = await res.json();
        setToken(data.token);
        return data;
    }, [setToken]);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
    }, [setToken]);

    return {
        token,
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!token,
    };
}
