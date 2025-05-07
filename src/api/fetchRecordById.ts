import { env } from "../env";
export async function fetchRecordById(dataType: string, id: string) {
    const response = await fetch(`${env.apiUrl}/${dataType}/${id}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch record by ID");
    }

    const body = await response.json();

    return body;
}
