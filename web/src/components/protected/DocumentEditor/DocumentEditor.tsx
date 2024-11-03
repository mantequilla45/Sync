"use client";

import React, { useState, useEffect, useLayoutEffect, useRef, LegacyRef } from 'react';
import { handleChangePos, handleContentChange, handleContentUpdated, handleSave, handleImagePaste } from './DocumentEditorFunctions/DocumentEditorBasicSocketIO';
import { CustomToolbar } from './CustomToolbar/CustomToolbar';
import dynamic from 'next/dynamic';
import './quill.css';
import { getToken } from '@/services/Auth/getToken';
import { useDocumentSocketStore } from '@/stores/DocumentSocketStore';
import Quill, { Delta, Sources } from 'quill'
import ReactQuill, { UnprivilegedEditor, Range, ReactQuillProps } from 'react-quill';
import { DocumentModules } from './DocumentModules';

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
  const [indexPos, setIndexPos] = useState<Range>();
  const [isQuillReady, setIsQuillReady] = useState(false);
  const { connectDocument, disconnectDocument } = useDocumentSocketStore();
 
  const editorRef = useRef<ReactQuill | null>(null);

  //Socket Connection
  useLayoutEffect(() => {
    const initializeSocket = async () => {
      const token = await getToken();
      connectDocument(token.token, documentID, (content) => handleContentUpdated(content, setContent));
    };
    initializeSocket();
    return () => {
      disconnectDocument();
    };
  }, []);

  //Toolbar Go-signal
  useEffect(() => {
    if (editorRef.current) {
        setIsQuillReady(true)
    }
  }, [editorRef.current, indexPos])

  //Socket Listener
  useEffect(() => {
    useDocumentSocketStore.getState().documentSocket?.on('contentUpdated', (newContent) => {
      editorRef?.current?.getEditor().updateContents(newContent);
    });
    return () => {
      useDocumentSocketStore.getState().documentSocket?.off('contentUpdated');
    };
  });

  //Image Paste Event
  useEffect(() => {
    const handlePasteWithArgs = (event: ClipboardEvent) => {
      handleImagePaste(event, editorRef.current?.getEditor() as Quill, indexPos as Range, documentID);
    };  
    editorRef.current?.getEditor().root.addEventListener("paste", handlePasteWithArgs);
  
    return () => {
      editorRef.current?.getEditor().root.removeEventListener("paste", handlePasteWithArgs);
    };
  }, [editorRef, indexPos]);

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow">
      {isQuillReady && <CustomToolbar quill={editorRef.current?.getEditor() as Quill} documentID={documentID} />}
      <WrappedQuill
        forwardedRef={editorRef}
        value={content}
        onChange={(content: string, delta: Delta, source: string, editor: UnprivilegedEditor) => {
          handleContentChange(content, delta, source, editor, setContent, documentID);
        }}
        placeholder="Start writing here..."
        preserveWhitespace
        theme="snow"
        className="mb-4 w-full h-[500px] text-[#1E1E1E]"
        modules={DocumentModules}
        onChangeSelection={(selection: Range, source: Sources, editor: UnprivilegedEditor) => {
          handleChangePos(selection, source, editor, documentID, setIndexPos);
        }}
      />
      <button
        className="bg-[#69369B] text-white rounded-full px-8 py-2 mt-10"
        onClick={() => handleSave(documentID, projectID)}>
        Save Document
      </button>
    </div>
  );
};

export default DocumentEditor;
