"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '../../../components/protected/header'
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
    <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
      <Header />
      <div className="px-[90px] mb-2">
        <h1 className="text-sm text-white font-light">Home / Project</h1>
      </div>
      <div className="flex flex-col items-center mx-16 mb-16">
      <div className="w-full bg-white p-5 rounded-2xl shadow">
  <ReactQuill
    value={content}
    onChange={setContent}
    placeholder="Start writing here..."
    theme="snow"
    className="mb-4 w-full"
    modules={modules} // Pass the custom modules
    style={{ height: '500px', color: '#1E1E1E' }} // Set height and default text color
  />
  <button
    className="bg-[#69369B] text-white rounded-full px-8 py-2 mt-10"
    onClick={handleSave}
  >
    Save Document
  </button>
</div>

      </div>
      
    </div>
  );
};

export default DocumentEditor;
