import { env } from "../env";
export async function fetchPaginatedRecords(
    dataType: string,
    page: number = 1,
    pageSize: number = 10
) {
    const response = await fetch(`${env.apiUrl}/${dataType}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch records");
    }
    const body = await response.json();

    return body;
}
