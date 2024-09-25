export const createProject = async (formData: FormData, setError: (error: string) => void): Promise<void> => {
    try {
      console.log("here")
      console.log(formData)
      const response = await fetch('/api/Project/createProject', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create project');
      }
  
      await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error creating project:', error);
          setError(error.message);
        } else {
          console.error('Unexpected error:', error);
          setError('An unexpected error occurred');
        }
  }
  
}