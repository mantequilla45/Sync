// my-next-app/src/app/page.tsx

import Header from '../../../components/protected/header';
import DynamicCards from '../../../components/protected/dynamic-cards';
import { cookies } from 'next/headers'; // This helps you access cookies in Next.js 14
import { redirect } from 'next/navigation';
import verifySession from '@/app/lib/middleware/verifySession';


export default async function Home() {

  const cookieStore = cookies();
  const authToken = cookieStore.get('authToken')?.value;

  // Verify session using your middleware
  const sessionResult = await verifySession(authToken);

  // If the session is invalid, redirect to the login page
  if (!sessionResult.success) {
    redirect('/'); // Or any other route
  }

  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">

        <Header /> 
      <div className="px-[90px] mb-2">
        <h1 className="text-sm text-white font-light">Home</h1>
      </div>
      <div className="flex-grow bg-white rounded-2xl shadow-lg mx-16 px-14 py-10 mb-16">
        <div>
          <h1 className="text-2xl text-[#2B2B2B] font-semibold">Welcome to Sync</h1>
        </div>
        <div>
          <h2 className="text-xl text-[#2B2B2B] font-regular my-10 mx-6">Your Projects</h2>
        </div>
        
        {/* Number of projects */}
        <DynamicCards cardCount={10} />
      </div>
    </div>
  );
}
