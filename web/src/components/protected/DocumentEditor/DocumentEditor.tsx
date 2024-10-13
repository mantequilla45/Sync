"use client";

import React, { useState, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import io from 'socket.io-client';
import 'react-quill/dist/quill.snow.css';
import { getToken } from '@/services/Auth/getToken';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const DocumentEditor = ({ projectID, documentID }: { projectID: string, documentID: string }) => {
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState<any>(null);

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
    setContent(newContent);
    if (socket) {
      socket.emit('updateContent', { roomId: `${projectID}-${documentID}`, newContent });
    }
  };

  useLayoutEffect(() => {
    const setupSocket = async () => {
      const token = await getToken()
      const newSocket = io('http://localhost:4000', {
        auth: { token },
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
        newSocket.emit('joinRoom', `${projectID}-${documentID}`);
        newSocket.emit('loadDocument', { roomId: `${projectID}-${documentID}` });
      });

      newSocket.on('loadDocument', (initialContent: string) => {
        setContent(initialContent);
      });

      newSocket.on('updateContent', (newContent: string) => {
        if (newContent !== content) {
          setContent(newContent);
        }
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect(); // Cleanup socket on unmount
      };
    };

    setupSocket();
  }, [projectID, documentID]);

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow">
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing here..."
        theme="snow"
        className="mb-4 w-full"
        modules={modules} // Pass the custom modules
        style={{ height: '500px', color: '#1E1E1E' }} // Set height and default text color
      />
      <button
        className="bg-[#69369B] text-white rounded-full px-8 py-2 mt-10"
      >
        Save Document
      </button>
    </div>
  );
};

export default DocumentEditor;
