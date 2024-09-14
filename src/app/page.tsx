// my-next-app/src/app/page.tsx
import Header from '../components/protected/header';
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Background from '../components/protected/background';
import LoginForm from '@/components/landing/LoginForm';

//Please use React useState and inputs in components, not in pages. Thank you. 

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <title>{"Sync"}</title>
      <Background />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="flex flex-row gap-10 w-[70%]">
            <div className="w-[80%] pt-5 flex flex-col">
              <h1 className="text-5xl md:text-6xl font-bold text-white font-poppins mb-6">Sync</h1>
              <p className="text-lg w-full text-gray-300 text-left">
                Seamlessly collaborate in real-time with Sync. Experience a streamlined workflow with advanced features tailored for teams and projects of all sizes.
              </p>
            </div>
            <LoginForm/>
            </div>
          </div>
          <div className="flex mb-[20px] flex-row w-full h-[100px] items-center gap-5 justify-between px-[300px]">
            <div className="flex space-x-6">
              <a href='/about' className="text-sm">About</a>
              <a href='/contact-us' className="text-sm">Contact us</a>
              <a href='/about-us' className="text-sm">Our Team</a>
            </div>
            <div className="flex flex-row gap-6">
              <FaXTwitter className="w-[30px] h-[30px]" />
              <FaInstagram className="w-[30px] h-[30px]" />
              <FaFacebook className="w-[30px] h-[30px]" />
              <FaGithub className="w-[30px] h-[30px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
