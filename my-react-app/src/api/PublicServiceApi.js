const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/api';

export async function fetchApprovedPublicServices(typeName = '') {
    let url = `${BASE_URL}/public-service/approved/filter`;
    if (typeName) {
        url += `?typeName=${encodeURIComponent(typeName)}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include', // important if using cookie auth
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch approved public services');
    }

    return await response.json();
}
