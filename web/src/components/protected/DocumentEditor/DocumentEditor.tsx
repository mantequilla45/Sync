"use client";

import React, { useState, useEffect, useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { getToken } from '@/services/Auth/getToken';
import { useDocumentSocketStore } from '@/stores/DocumentSocketStore';
import { Delta, Sources } from 'quill'
import { UnprivilegedEditor, Range } from 'react-quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const DocumentEditor = ({ documentID }: { projectID: string, documentID: string }) => {
  const [content, setContent] = useState<any>(null);
  const [status, setStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [editor, setEditor] = useState<UnprivilegedEditor | null>(null);
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


  const handleContentChange = (newContent: string, delta: Delta, source: string, quillEditor: UnprivilegedEditor) => {
    if (!editor) {
      setEditor(quillEditor)
    }
    useDocumentSocketStore.getState().documentSocket?.emit('updateContent', documentID, newContent);
    setContent(newContent);
  };

  const handleContentUpdated = (newContent: string) => {
    console.log("New Content", newContent);
    setContent(newContent);
  };

  const handleChangePos = (selection: Range, source: Sources, editor: UnprivilegedEditor) => {
    //console.log(selection?.index, selection?.length)
    //Groundwork for indicator??????
  }

  useLayoutEffect(() => {
    const initializeSocket = async () => {
      const token = await getToken();
      connectDocument(token.token);
    };

    initializeSocket();

    return () => {
      disconnectDocument();
    };
  }, [connectDocument, disconnectDocument]);

  useEffect(() => {
      useDocumentSocketStore.getState().documentSocket?.on('contentUpdated', handleContentUpdated);
  
      // Emit the event to join the room
      useDocumentSocketStore.getState().documentSocket?.emit('joinRoom', documentID);
  
      // Add a small delay to allow the server to process the room joining before requesting content
      const contentLoadDelay = setTimeout(() => {
        useDocumentSocketStore.getState().documentSocket?.emit('loadContent', documentID);
        setStatus('connected');
      }, 10000); // 500ms delay
  
      // Cleanup on unmount
      return () => {
        clearTimeout(contentLoadDelay); // Clear the timeout on cleanup
        useDocumentSocketStore.getState().documentSocket?.off('contentUpdated', handleContentUpdated);
      };
  }, [useDocumentSocketStore.getState().documentSocket]);
  

  useEffect(() => {
    useDocumentSocketStore.getState().documentSocket?.on('contentUpdated', handleContentUpdated);
    return () => {
      useDocumentSocketStore.getState().documentSocket?.off('contentUpdated', handleContentUpdated);
    };
  });

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow">
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing here..."
        theme="snow"
        className="mb-4 w-full"
        modules={modules}
        onChangeSelection={handleChangePos}
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
