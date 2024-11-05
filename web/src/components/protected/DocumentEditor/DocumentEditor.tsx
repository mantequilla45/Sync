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

  // TO BE ISOLATED
  const [image, setImage] = useState<HTMLElement>();
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  //
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
    setTimeout(() => setIsQuillReady(true), 100)
  }, [])

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

  //On Press Image Handler
  useEffect(() => {
    const handleImageClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'IMG') {
        console.log(target);
        setImage(target);
      }
    };

    editorRef.current?.getEditor().root.addEventListener('click', handleImageClick);

    return () => {
      editorRef.current?.getEditor().root.removeEventListener('click', handleImageClick);
    };
  }, [indexPos]);

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow">
      {isQuillReady && <CustomToolbar quill={editorRef.current?.getEditor() as Quill} documentID={documentID} />}
      <div className='flex'>
        <WrappedQuill
          forwardedRef={editorRef}
          value={content}
          onChange={(content: string, delta: Delta, source: string, editor: UnprivilegedEditor) => {
            handleContentChange(content, delta, source, editor, setContent, documentID);
          }}
          placeholder="Start writing here..."
          preserveWhitespace
          theme="snow"
          className="mb-4 w-[210mm] h-[297mm] text-[#1E1E1E]"
          modules={DocumentModules}
          onChangeSelection={(selection: Range, source: Sources, editor: UnprivilegedEditor) => {
            handleChangePos(selection, source, editor, documentID, setIndexPos);
          }}
        />
        <div className="w-1/4 p-4 bg-gray-100 rounded-lg">
          {image ? (
            <div>
              <h3>Image Details</h3>
              <img src={(image as HTMLImageElement).src} alt="Clicked" style={{ maxWidth: '100px' }} />
              <p className='text-[#1E1E1E]'>Source: {(image as HTMLImageElement).src}</p>
              <p className='text-[#1E1E1E]'>Width: {(image as HTMLImageElement).width}px</p>
              <p className='text-[#1E1E1E]'>Height: {(image as HTMLImageElement).height}px</p>
            </div>
          ) : (
            <p >Click on an image in the editor to see details.</p>
          )}
        </div>
      </div>
      <button
        className="bg-[#69369B] text-white rounded-full px-8 py-2 mt-10"
        onClick={() => handleSave(documentID, projectID)}>
        Save Document
      </button>
    </div>
  );
};

export default DocumentEditor;
