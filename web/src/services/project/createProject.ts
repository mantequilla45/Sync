export const createProject = async (formData: FormData, setError: (error: string) => void): Promise<void> => {
    try {
      const response = await fetch('/api/Project/createProject', { // Ensure this is the correct endpoint
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create project');
      }
  
      await response.json(); // Process the successful response as needed
    } catch (error: unknown) {
        // Type assertion to ensure `error` is of type `Error`
        if (error instanceof Error) {
          console.error('Error creating project:', error);
          setError(error.message); // Set the error message
        } else {
          console.error('Unexpected error:', error);
          setError('An unexpected error occurred'); // Fallback for unknown error types
        }
  }
  
}