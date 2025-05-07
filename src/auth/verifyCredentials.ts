import { env } from "../env";
import refreshToken from "./refreshToken";

export async function verifyCredentials() {
    try {
        const res = await fetch(`${env.apiUrl}/verify-credentials`, {
            credentials: "include",
        });

        if (res.status === 401) {
            // try refresh
            const refreshSuccess = await refreshToken();
            if (!refreshSuccess) return null;

            // after refreshing, try verifyCredentials again
            const retryRes = await fetch(`${env.apiUrl}/verify-credentials`, {
                credentials: "include",
            });

            if (!retryRes.ok) return null;

            return retryRes.json();
        }

        if (!res.ok) {
            throw new Error("Auth check failed");
        }

        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}
