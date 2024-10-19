"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { getToken } from '@/services/Auth/getToken';
import { useDocumentSocketStore } from '@/stores/DocumentSocketStore';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const DocumentEditor = ({ projectID, documentID }: { projectID: string, documentID: string }) => {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'connected' | 'disconnected'>('disconnected');
  
  const { connectDocument, disconnectDocument } = useDocumentSocketStore();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  const handleContentChange = (newContent: string) => {
    
    useDocumentSocketStore.getState().documentSocket?.emit('updateContent', documentID, newContent );
    setContent(newContent)
  };

  useEffect(() => {
    const initializeSocket = async () => {
      const token = await getToken();
      if (token) {
        connectDocument(token.token);
      }
    };

    initializeSocket();

    return () => {
      disconnectDocument();
    };
  }, [connectDocument, disconnectDocument]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (useDocumentSocketStore.getState().documentSocket) {
        useDocumentSocketStore.getState().documentSocket?.emit('joinRoom', (`${documentID}`));
        setStatus('connected');
        clearInterval(interval);
      } else {
        setStatus('disconnected');
      }
    }, 500);
  
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleContentUpdated = (newContent: string) => {
      console.log("Pinged");
      setContent(newContent);
    };

    useDocumentSocketStore.getState().documentSocket?.on('contentUpdated', handleContentUpdated);
  }, []);
  

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow">
      {/* Document editor */}
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing here..."
        theme="snow"
        className="mb-4 w-full"
        modules={modules}
        style={{ height: '500px', color: '#1E1E1E' }}
      />
      
      <button className="bg-[#69369B] text-white rounded-full px-8 py-2 mt-10">
        Save Document
      </button>

      <div className={`mt-4 text-2xl font-semibold ${status === 'connected' ? 'text-blue-500' : 'text-red-500'}`}>
        {status === 'connected' ? 'Connected to Document Socket' : 'Disconnected from Document Socket'}
      </div>
    </div>
  );
};

export default DocumentEditor;
