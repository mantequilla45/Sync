"use client";

import React, { useState, useEffect, useLayoutEffect, useRef, LegacyRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { getToken } from '@/services/Auth/getToken';
import { useDocumentSocketStore } from '@/stores/DocumentSocketStore';
import { Delta, Sources } from 'quill'
import ReactQuill, { UnprivilegedEditor, Range, ReactQuillProps } from 'react-quill';

interface IWrappedComponent extends ReactQuillProps {
  forwardedRef: LegacyRef<ReactQuill>;
}

const WrappedQuill = dynamic(
  async () => {
    const { default: ReactQuillEditor } = await import("react-quill");

    const QuillJS = ({ forwardedRef, ...props }: IWrappedComponent) => (
      <ReactQuillEditor ref={forwardedRef} {...props} />
    );
    return QuillJS;
  },
  { ssr: false }
);

const DocumentEditor = ({ documentID, projectID }: { projectID: string, documentID: string }) => {
  const [content, setContent] = useState<any>(null);
  const [status, setStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [editor, setEditor] = useState<UnprivilegedEditor | null>(null);
  const { connectDocument, disconnectDocument } = useDocumentSocketStore();
  const editorRef = useRef<ReactQuill | null>(null);

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
    setContent(newContent);
  };

  const handleChangePos = (selection: Range, source: Sources, editor: UnprivilegedEditor) => {
    //console.log(selection?.index, selection?.length)
    //Groundwork for indicator??????
  }

  const handleSave = () => {
    useDocumentSocketStore.getState().documentSocket?.emit('saveDocument', documentID, projectID);
  }

  useLayoutEffect(() => {
    const initializeSocket = async () => {
      const token = await getToken();
      connectDocument(token.token, documentID, handleContentUpdated);
    };

    initializeSocket();

    return () => {
      disconnectDocument();
    };
  }, []);

  useEffect(() => {
    useDocumentSocketStore.getState().documentSocket?.on('contentUpdated', (newContent)=>{
      console.log("This should recieve the message", newContent);
      setContent(newContent);
    });
    return () => {
      useDocumentSocketStore.getState().documentSocket?.off('contentUpdated');
    };
  });

  /*useEffect(() => {
    if (editorRef.current) {
      console.log("Editor instance is set:", useDocumentSocketStore.getState().documentSocket);
      useDocumentSocketStore.getState().documentSocket?.emit('loadDocument', documentID);
    }
  }, [editorRef.current, useDocumentSocketStore]);*/

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow">
      <WrappedQuill
        forwardedRef={editorRef}
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing here..."
        theme="snow"
        className="mb-4 w-full"
        modules={modules}
        onChangeSelection={handleChangePos}
        style={{ height: '500px', color: '#1E1E1E' }}
      />
      <button 
        className="bg-[#69369B] text-white rounded-full px-8 py-2 mt-10"
        onClick={handleSave}>
        Save Document
      </button>
      <div className={`mt-4 text-2xl font-semibold ${status === 'connected' ? 'text-blue-500' : 'text-red-500'}`}>
        {status === 'connected' ? 'Connected to Document Socket' : 'Disconnected from Document Socket'}
      </div>
    </div>
  );
};

export default DocumentEditor;
