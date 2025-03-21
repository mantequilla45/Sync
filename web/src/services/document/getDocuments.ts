export async function getUserDocuments(headersObject: Record<string, string>) {
  try {
    const response = await fetch('http://localhost:3000/api/Document/GetUserDocument', {
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
