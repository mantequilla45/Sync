import React from 'react';
import { FaProjectDiagram } from "react-icons/fa";
import { getUserDocuments } from '@/services/_index';
import { headers } from 'next/headers';


const DynamicCards: React.FC = async () => {

  // Fetch the headers from the incoming request
  const incomingHeaders = headers();

  // Convert headers to an object that fetch can use
  const headersObject: Record<string, string> = {};
  incomingHeaders.forEach((value, key) => {
    headersObject[key] = value;
  });

  // Fetch the user documents by passing the headersObject
  const documents = await getUserDocuments(headersObject);

  // If there are no documents or documents?.length is 0, display a message
  if (documents?.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No projects for now.</p>
      </div>
    );
  }

  // Calculate the number of rows needed based on documents?.length or documents length
  const rows = Math.ceil(documents?.length / 4); // Adjust based on 4 columns per row
  const cards = documents.slice(0, documents?.length); // Adjust number of cards based on documents?.length

  return (
    <div className="grid gap-7" style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-6">
          {cards.slice(rowIndex * 4, rowIndex * 4 + 4).map((doc:any, index:any) => (
            <div key={index} className="flex flex-col items-center">
              {/* Card */}
              <div
                className="bg-gray-200 rounded-xl border border-gray-300 relative"
                style={{ width: '90%', paddingBottom: '67.5%' }} // Reduced by 10%
              >
                <div className="absolute inset-0 flex items-center justify-center text-black">
                  {doc.title || `Project ${index + 1}`}
                </div>
              </div>

              {/* Icon and Project Title below the card */}
              <div className="mt-4 px-4 w-full flex items-center justify-start">
                <FaProjectDiagram className="text-gray-500 text-xl" />
                <p className="text-black pl-2">
                  {doc.title || `Project ${index + 1}`} {/* Using the document title */}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DynamicCards;
