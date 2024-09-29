export async function getUserDocuments(headersObject: Record<string, string>) {
  try {
    const response = await fetch('http://localhost:3000/api/Document/GetUserDocument', {
      method: 'GET',
      credentials: 'include', // Include cookies if needed
      headers: {
        'Content-Type': 'application/json',
        ...headersObject, // Pass in the headers dynamically
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch documents: ${response.statusText}`);
    }

    const documents = await response.json();
    return documents;
  } catch (error) {
    console.error('Error fetching user documents:', error);
    return null;
  }
}
