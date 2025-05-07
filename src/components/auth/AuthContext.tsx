import { createContext, useContext, useEffect, useState } from "react";
import { verifyCredentials } from "../../auth/verifyCredentials";
import { logout } from "../../auth/logout";
import refreshToken from "../../auth/refreshToken";

interface User {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loginUser: (user: User) => void;
    logoutUser: () => void;
    refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode; }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const user = await verifyCredentials();
                setUser(user);
            } catch {
                setUser(null);
            }
        })();
    }, []);

    const loginUser = (user: User) => {
        setUser(user);
    };

    const logoutUser = async () => {
        await logout();
        setUser(null);
    };

    const refreshAuth = async () => {
        try {
            await refreshToken();
            const freshUser = await verifyCredentials();
            setUser(freshUser);
        } catch {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
