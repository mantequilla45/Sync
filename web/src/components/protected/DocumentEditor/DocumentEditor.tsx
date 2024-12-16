"use client";

import React, { useState, useEffect, useLayoutEffect, useRef, LegacyRef } from 'react';
import { handleChangePos, handleContentChange, handleContentUpdated, handleSave, handleImagePaste } from './DocumentEditorFunctions/DocumentEditorBasicSocketIO';
import dynamic from 'next/dynamic';
import './quill.css';
import { getToken } from '@/services/Auth/getToken';
import { useDocumentSocketStore } from '@/stores/DocumentSocketStore';
import Quill, { Delta, Sources } from 'quill';
import ReactQuill, { UnprivilegedEditor, Range, ReactQuillProps } from 'react-quill';
import { DocumentModules } from './DocumentModules';

// Interface for Wrapped Component
interface IWrappedComponent extends ReactQuillProps {
  forwardedRef: LegacyRef<ReactQuill>;
}

// Wrapped Quill Component (dynamic import)
const WrappedQuill = dynamic(
  async () => {
    const { default: ReactQuillEditor } = await import('react-quill');
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
  const [image, setImage] = useState<HTMLImageElement>();
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const { connectDocument, disconnectDocument } = useDocumentSocketStore();
  const editorRef = useRef<ReactQuill | null>(null);

  // Initialize Socket Connection
  useLayoutEffect(() => {
    const initializeSocket = async () => {
      const token = await getToken();
      connectDocument(token.token, documentID, (content) => handleContentUpdated(content, setContent));
    };
    initializeSocket();
    return () => {
      disconnectDocument();
    };
  }, [connectDocument, disconnectDocument, documentID]);

  // Toolbar Go-signal
  useEffect(() => {
    setTimeout(() => setIsQuillReady(true), 100);
  }, []);

  // Socket Listener for content updates
  useEffect(() => {
    useDocumentSocketStore.getState().documentSocket?.on('contentUpdated', (newContent) => {
      editorRef?.current?.getEditor().updateContents(newContent);
    });
    return () => {
      useDocumentSocketStore.getState().documentSocket?.off('contentUpdated');
    };
  });

  useEffect(() => {
    const editor = editorRef.current?.getEditor();
  
    const handlePasteWithArgs = (event: ClipboardEvent) => {
      handleImagePaste(event, editor as Quill, indexPos as Range, documentID);
    };
  
    editor?.root.addEventListener('paste', handlePasteWithArgs);
  
    return () => {
      editor?.root.removeEventListener('paste', handlePasteWithArgs);
    };
  }, [indexPos, documentID]);
  

  return (
    <div className="flex justify-center items-center bg-gray-100 flex-col">
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          width: '1080px',
          height: '1600px',
          transformOrigin: 'top center',
        }}
      >
        <WrappedQuill
          forwardedRef={editorRef}
          value={content}
          onChange={(content: string, delta: Delta, source: string, editor: UnprivilegedEditor) => {
            handleContentChange(content, delta, source, editor, setContent, documentID);
          }}
          preserveWhitespace
          theme="snow"
          className="text-[#1E1E1E] w-full h-full"
          modules={DocumentModules}
          onChangeSelection={(selection: Range, source: Sources, editor: UnprivilegedEditor) => {
            handleChangePos(selection, source, editor, documentID, setIndexPos);
          }}
        />
      </div>

      {/* Save Button */}
      <div className="mt-6 text-center">
        <button
          className="bg-[#69369B] text-white rounded-full px-8 py-2"
          onClick={() => handleSave(documentID, projectID)}
        >
          Save Document
        </button>
      </div>
    </div>
  );
};

export default DocumentEditor;
