import { Header } from '@/components/_index';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
      <Header />
      <div className="px-[90px] mb-2">
        <h1 className="text-sm text-white font-light">404 Not Found</h1>
      </div>
      <div className="flex-grow flex space-y-[100px] bg-white rounded-2xl shadow-lg mx-16 mb-16 items-center justify-center flex-col">
        <h1 className="text-6xl font-extrabold text-gray-800 dark:text-gray-200">404</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Sorry, the page you’re looking for doesn’t exist.
        </p>

        {/* Image from public/svgs/NotFound.svg */}
        <img
          src="/svgs/NotFound.svg"
          alt="404 Not Found"
          className="w-48 h-48 mt-8"
        />

        <a
          href="/"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
