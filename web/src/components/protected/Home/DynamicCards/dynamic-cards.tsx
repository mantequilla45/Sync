// Remove the "use client" directive
import React from 'react'; 
import { getUserDocuments } from '@/services/_index';
import { headers } from 'next/headers'; // This will only work in Server Component
import { DynamicCards } from './dynamic-card';
import { DocumentData } from 'firebase-admin/firestore';

const DynamicCardsLayout = async () => {
  const incomingHeaders = headers();

  const headersObject: Record<string, string> = {};
  incomingHeaders.forEach((value, key) => {
    headersObject[key] = value;
  });

  const documents: DocumentData[] = await getUserDocuments(headersObject);

  if (!documents || documents.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No projects for now.</p>
      </div>
    );
  } 
  const rows = Math.ceil(documents.length / 4);
  return (
    <div>
      <div className="grid gap-7" style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-4 gap-6">
            {documents.slice(rowIndex * 4, rowIndex * 4 + 4).map((doc: DocumentData) => (
              <DynamicCards key={doc.UID} doc={doc} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicCardsLayout;
