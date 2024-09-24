// pages/create-project.tsx
"use client"

import { useState } from 'react';
import { createProject, getUserDocuments} from '@/services/_index';
import CreateDocumentForm from './ProjectDocSandbox/CreateDoc';

function CreateProjectPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null); // Reset error
    try {
      await createProject(formData, setError);
      alert('Project created successfully!');
    } catch (error) {
      console.error('Project creation failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Create a New Project</h1>
        <ProjectForm onSubmit={handleSubmit} setError={setError} />
        <CreateDocumentForm></CreateDocumentForm>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow" onClick={getUserDocuments}>Get Docs</button>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

interface ProjectFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  setError: (error: string) => void;
}

export function ProjectForm({ onSubmit, setError }: ProjectFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name || !description) {
      setErrorMessage('Please provide both project name and description.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);

    try {
      await onSubmit(formData);
    } catch (err) {
      setErrorMessage('Failed to create project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-lg rounded-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium text-gray-700">Project Name</label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md shadow">
          Create Project
        </button>
      </div>
    </form>
  );
}

export default CreateProjectPage