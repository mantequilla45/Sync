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
  }, []);

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

  // Image Paste Event
  useEffect(() => {
    const handlePasteWithArgs = (event: ClipboardEvent) => {
      handleImagePaste(event, editorRef.current?.getEditor() as Quill, indexPos as Range, documentID);
    };
    editorRef.current?.getEditor().root.addEventListener('paste', handlePasteWithArgs);

    return () => {
      editorRef.current?.getEditor().root.removeEventListener('paste', handlePasteWithArgs);
    };
  }, [editorRef, indexPos]);

  // Handle Image Click for Resizing
  useEffect(() => {
    const handleImageClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const imgElement = target as HTMLImageElement;
        setImage(imgElement);
        setWidth(imgElement.width);
        setHeight(imgElement.height);
      }
    };

    editorRef.current?.getEditor().root.addEventListener('click', handleImageClick);

    return () => {
      editorRef.current?.getEditor().root.removeEventListener('click', handleImageClick);
    };
  }, [indexPos]);

  // Handle Image Size Change
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || 0;
    setWidth(newWidth);
    if (image) {
      image.width = newWidth;
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || 0;
    setHeight(newHeight);
    if (image) {
      image.height = newHeight;
    }
  };

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
