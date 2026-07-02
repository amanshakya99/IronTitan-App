import { apiRequest } from "./apiClient";

export async function getUserStats(userId) {
    return apiRequest (`/users/${userId}/stats`)
}