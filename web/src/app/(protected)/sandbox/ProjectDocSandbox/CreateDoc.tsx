"use client"
import { createDocument } from '@/services/_index';
// pages/create-document.tsx
import { useState } from 'react';

export default function CreateDocumentForm() {

  const [documentTitle, setDocumentTitle] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setResponseMessage('');

    // Create FormData object to submit to API
    const formData = new FormData();
    formData.append('projectId', "NV0H0yAfsdkeuiokabNM");
    formData.append('title', documentTitle);

    createDocument(formData, setError);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Document</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Document Title
          </label>
          <input
            type="text"
            id="title"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Document
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}
      {responseMessage && <p className="mt-4 text-green-500">{responseMessage}</p>}
    </div>
  );
}
