import React from 'react';
import Header from '@/components/protected/_Layout/header';
import 'react-quill/dist/quill.snow.css';
import DocumentEditor from '@/components/protected/DocumentEditor/DocumentEditor';

const DocumentPage = ({ params }: { params: { projectID: string, documentID: string } }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
      <Header />
      <div className="px-[90px] mb-2">
        <h1 className="text-sm text-white font-light">Home / {params.projectID} / {params.documentID}</h1>
      </div>
      <div className="flex justify-center bg-gray-100 px-[300px] py-[30px]">
        <DocumentEditor projectID={params.projectID} documentID={params.documentID} />
      </div>
    </div>
  );
};

export default DocumentPage;
