export async function getUserDocuments() {
    try {
      // Make a GET request to the API with the user ID as a custom header
      const response = await fetch('/api/Document/GetUserDocument', {
        method: 'GET',
      });
  
      // Check if the response is OK (status 200)
      if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.statusText}`);
      }
  
      // Parse and return the response JSON
      const documents = await response.json();
      return documents;
    } catch (error) {
      console.error('Error fetching user documents:', error);
      return null;
    }
  }
  