"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import styles for Quill

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const DocumentEditor = () => {
  const [content, setContent] = useState(''); // State to store editor content

  // Toolbar options
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }], // Font color and background color
      ['link', 'image'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean'], // Remove formatting button
      
    ],
  };

  // Function to handle saving the document
  const handleSave = () => {
    console.log('Document Saved:', content);
    // You can implement saving logic here (e.g., API calls to save the document)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Document Editor</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow">
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Start writing here..."
          theme="snow"
          className="mb-4"
          modules={modules} // Pass the custom modules
          style={{ color: '#1E1E1E' }} // Set default text color
        />
        <button
          className="bg-[#69369B] text-white rounded-full px-8 py-2 mt-4"
          onClick={handleSave}
        >
          Save Document
        </button>
      </div>
    </div>
  );
};

export default DocumentEditor;
