import { useAuth } from './AuthContext';

export async function authFetch(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = options.headers || {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    options.headers = headers;

    const response = await fetch(url, options);

    if (response.status === 401) {
        // token invalid or expired
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/'; // redirect to login page
    }

    return response;
}
