import { apiRequest } from './apiClient';


export async function getCurrentUser() {
    return apiRequest('/users/me')
}