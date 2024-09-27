// sandbox for SSR of fetching UserDocs

import { headers } from 'next/headers';
import { getUserDocuments } from '@/services/_index';

export default async function Page() {
  // Get incoming headers from the request
  const incomingHeaders = headers();

  // Convert headers to an object that fetch can use
  const headersObject: Record<string, string> = {};
  incomingHeaders.forEach((value, key) => {
    headersObject[key] = value;
  });

  // Fetch the user documents by passing the headersObject
  const documents = await getUserDocuments(headersObject);

  return (
    <ul>
      <p>Data from API: {JSON.stringify(documents)}</p>
    </ul>
  );
}
