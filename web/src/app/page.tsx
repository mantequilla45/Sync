import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Background from '../components/landing/background';
import LoginForm from '@/components/landing/LoginForm';
import Image from "next/image";

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <title>{"Sync"}</title>
      <Background />
      <div className="relative z-10 min-h-screen flex flex-col">
        <a className="flex items-center justify-center w-full h-[65px]" href="/">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2FSync%20Logo%2FSync%20Logo%20White%20Large.png?alt=media&token=7551d58d-337b-4106-b5da-9b23260c1d99"
            alt="Landing Logo"
            width = {30}
            height = {30}
          />
          <h1 className="text-3xl font-semibold ml-[7px]">Sync</h1>
        </a>
        <div className="flex-grow flex items-center justify-center w-full px-4">
          <div className="flex flex-col lg:flex-row-reverse gap-10 w-full lg:w-[70%]">
            <LoginForm />
            <div className="w-full lg:w-[80%] pt-5 flex flex-col text-center lg:text-left">
              <div className="flex flex-col lg:flex-row items-center mb-6 gap-4">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2FSync%20Logo%2FSync%20Logo%20White%20Large.png?alt=media&token=7551d58d-337b-4106-b5da-9b23260c1d99"
                  alt="Sync Logo"
                  width = {30}
                  height = {30}
                />
                <h1 className="text-4xl md:text-6xl font-semibold text-white font-poppins">Sync</h1>
              </div>
              
              <p className="text-base md:text-lg w-full text-gray-300">
                Seamlessly collaborate in real-time with Sync. Experience a streamlined workflow with advanced features tailored for teams and projects of all sizes.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mb-[20px] w-full h-auto items-center gap-5 justify-between px-8 lg:px-[300px]">
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6">
            <a href='/about' className="text-sm">About</a>
            <a href='/contact-us' className="text-sm">Contact us</a>
            <a href='/about-us' className="text-sm">Our Team</a>
          </div>
          <div className="flex flex-row gap-6 mt-4 lg:mt-0">
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
