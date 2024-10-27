// my-next-app/src/app/page.tsx
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Background from '../components/landing/background';
import LoginForm from '@/components/landing/LoginForm';

//Please use React useState and inputs in components, not in pages. Thank you. 

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <title>{"Sync"}</title>
      <Background />
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="flex flex-row gap-10 w-[70%]">
            <div className="w-[80%] pt-5 flex flex-col">
              <div className="flex flex-row items-center mb-6 gap-4">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2FSync%20Logo%2FSync%20Logo%20White%20Large.png?alt=media&token=7551d58d-337b-4106-b5da-9b23260c1d99"
                  alt="Description of the image"
                  className="w-[50px] h-[50px] "
                />
                <h1 className="text-5xl md:text-6xl font-bold text-white font-poppins">Sync</h1>
              </div>
              
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