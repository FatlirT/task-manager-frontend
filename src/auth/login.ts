import { env } from "../env";

export async function login(email: string, password: string) {
    const res = await fetch(`${env.apiUrl}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    return res.json(); // user data
}
