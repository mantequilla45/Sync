

import React from 'react';
import { Header } from '@/components/_index';
import 'react-quill/dist/quill.snow.css'; // Import styles for Quill
import DocumentEditor from '@/components/protected/DocumentEditor/DocumentEditor';

const DocumentPage = () => {


  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
      <Header />
      <div className="px-[90px] mb-2">
        <h1 className="text-sm text-white font-light">Home / Project</h1>
      </div>
      <div className="flex flex-col items-center mx-16 mb-16">
        <DocumentEditor></DocumentEditor>
      </div>
      
    </div>
  );
};

export default DocumentPage;

