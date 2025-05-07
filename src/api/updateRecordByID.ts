import { env } from "../env";
export default async function patchTaskStatus(
    id: string,
    newStatus: string
): Promise<void> {
    const response = await fetch(`${env.apiUrl}/tasks/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
        throw new Error("Failed to update task status");
    }
}
