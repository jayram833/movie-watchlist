// context/AuthContext.jsx
import { createContext, useContext } from "react";
import { useProvideAuth } from "../hooks/useAuth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
