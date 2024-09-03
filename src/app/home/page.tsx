import Link from 'next/link';
import Header from '../header/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(to_top_right,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
      <Header />
      <div className="flex-grow bg-white rounded-t-2xl shadow-lg mx-16 p-8">
      </div>
    </div>
  );
}
