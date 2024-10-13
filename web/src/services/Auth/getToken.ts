let isTokenFetching = false;
let cachedToken:any = null;

export const getToken = async () => {

    if (cachedToken) {
        return cachedToken;
    }

    if (isTokenFetching) {
        return null;
    }

    isTokenFetching = true;

    try {
        const response = await fetch("/api/Auth/getToken", {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error('Failed to fetch token');
        }

        const tokenData = await response.json();
        cachedToken = tokenData; 
        return tokenData;
    } catch (error) {
        console.error("Error:", error);
        return null; 
    } finally {
        isTokenFetching = false; 
    }
};
