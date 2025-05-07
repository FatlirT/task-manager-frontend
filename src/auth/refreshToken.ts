import { env } from "../env";
export default async function refreshToken() {
    try {
        const res = await fetch(`${env.apiUrl}/refresh-token`, {
            method: "POST",
            credentials: "include",
        });

        return res.ok;
    } catch (error) {
        console.error("Refresh token failed", error);
        return false;
    }
}
