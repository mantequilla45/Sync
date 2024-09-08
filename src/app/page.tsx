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
            <div className="flex justify-center">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/07ab8ffda4b61de49e738a79ccf7f9f7375700cdf399b68f4285e6d9b306f50d?placeholderIfAbsent=true&apiKey=0cd5b3eb85e74a83a268d41d07a9c27f"
              className="w-[60%] "/>
            </div>
            
          </div>
          <div className="bg-[linear-gradient(to_top_right,_#9B2B77,_#CF4E7D,_#D78E61)] text-white shadow-lg rounded-2xl px-12 py-12 w-[35%] h-auto mx-auto flex flex-col items-center">
            <h2 className="text-2xl font-regular mb-6">Welcome back!</h2>
            <div className="space-y-4 w-full flex flex-col items-center">
              <LoginForm/>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mb-[20px] flex-row w-full h-[100px] items-center gap-5 justify-between px-[300px]">
          <div className="flex space-x-6">
            <a href='/about' className="text-sm">About</a>
            <a href='/contact-us' className="text-sm">Contact us</a>
            <a href='/our-team' className="text-sm">Our Team</a>
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
