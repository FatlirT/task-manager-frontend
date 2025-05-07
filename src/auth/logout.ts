import { env } from "../env";

export const logout = async () => {
    try {
        await fetch(`${env.apiUrl}/logout`, {
            method: "POST",
            credentials: "include",
        });
    } catch (error) {
        console.error("Logout error:", error);
    }
};
