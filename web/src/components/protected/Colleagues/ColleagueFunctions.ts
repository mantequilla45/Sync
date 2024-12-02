export const getColleagues = async (headersObject : Record<string, string>)  : Promise<any> => {
    try {
        const response = await fetch('http://localhost:3000/api/Colleagues/GetColleagues', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...headersObject,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch documents: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user documents:', error);
        return null;
    }
}

export const addColleagues = async (colleagueUID: string): Promise<any> => {
    try {
        const response = await fetch('http://localhost:3000/api/Colleagues/AddColleagues', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(colleagueUID), // Add body with JSON data
        });

        if (!response.ok) {
            throw new Error('Failed to add colleagues');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding colleagues:', error);
        throw error;
    }
};

