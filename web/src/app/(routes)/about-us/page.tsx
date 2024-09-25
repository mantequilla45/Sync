
import { Header } from '@/components/_index';
import Image from 'next/image';

const BlankPage = () => {
    return (

      <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
        <Header /> 
        <div className="px-[90px] mb-2">
          <h1 className="text-sm text-white font-light">Home / About Us</h1>
        </div>
        <div className="flex-grow space-y-[100px] bg-white rounded-2xl shadow-lg mx-16 px-[200px] py-[100px] mb-16">
          <div className="flex flex-row space-x-2">
            <div className="flex-1 mt-10">
              <div className="relative inline-block">
                <h1 className="text-2xl text-[#2B2B2B] font-regular relative inline-block">
                  About Us
                  <span className="absolute left-0 bottom-0 w-full rounded-full h-[3px] bg-gradient-to-r from-[#0F94B9] via-[#4815FF] to-[#BF00B2]"></span>
                </h1>
                </div>
                  <div>
                    <div className="flex flex-row items-center">
                    <h2
                      className="text-7xl my-5 text-[#69369B] font-[700]"
                      style={{ textShadow: "3px 3px 2px rgba(0, 0, 0, 0.2)" }}
                    >
                      Syncing
                    </h2>
                    <p className="text-4xl text-[#2B2B2B] mt-[25px] ml-3 font-regular">minds, building ideas</p>
                  </div>
                    <p className="text-lg my-5 text-[#2B2B2B] font-regular">At Sync(), we are passionate about creating innovative solutions that bridge the gap between teams, 
                      enabling seamless collaboration from anywhere in the world.  Our real-time collaboration platform is designed with flexibility and efficiency in mind,  
                      allowing users to edit documents, manage tasks, and communicate effortlessly. Whether you&rsquo;re working remotely or in a dynamic office setting, Sync() empowers teams
                      to stay connected, productive, and focused on what matters most—turning ideas into action.
                    </p>
                </div>
            </div>
            <div className="flex-1">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2Fwebsite-pictures%2Fabout-us1.jpg?alt=media&token=772ff21e-e505-4ea1-9223-02a1357f2abe"
                alt="About Us"
                width={5000}
                height={3000}
                priority
              />
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="flex-1">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2Fwebsite-pictures%2Fabout-us2.jpg?alt=media&token=f3674b11-4e1b-4438-9d8b-831b2fba5738"
                  alt="About Us"
                  width={5000}
                  height={3000}
                  priority
                />
            </div>
            <div className="flex-1 mt-10">
              <div>
                <div className="flex flex-row items-center">
                  <h2
                    className="text-7xl my-5 text-[#69369B] font-[700]"
                    style={{ textShadow: "3px 3px 2px rgba(0, 0, 0, 0.2)" }}
                  >
                    What We Do
                  </h2>
                </div>
                <div>
                  <ul className="list-disc text-lg my-5 text-[#2B2B2B] font-regular pl-5">
                    <li>Enable real-time document editing for multiple users simultaneously.</li>
                    <li>Provide task management tools for creating, assigning, and tracking tasks.</li>
                    <li>Ensure secure user authentication with role management (viewer, editor, admin).</li>
                    <li>Send real-time notifications for key actions and updates.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-col">
            <h2
              className="flex justify-center text-7xl my-5 text-[#69369B] font-[700]"
              style={{ textShadow: "3px 3px 2px rgba(0, 0, 0, 0.2)" }}
            >
              Acknowledgments
            </h2>
            <div className="justify-center flex-col">
              <p className="text-lg my-5 text-[#2B2B2B] font-regular text-justify">
                  We would like to extend our heartfelt thanks to the talented team behind Sync() for their unwavering dedication and hard work. 
                  Our developers, designers, and engineers have worked tirelessly to create a platform that seamlessly integrates real-time collaboration tools. 
                  Their vision, creativity, and technical expertise were essential in turning the concept of Sync() into a reality. 
                  Without their commitment to innovation, this project would not have been possible.
              </p>
              <p className="text-lg my-5 text-[#2B2B2B] font-regular text-justify">
                  A special thank you goes out to our early adopters and beta testers, who provided us with invaluable feedback throughout the development process. 
                  Your insights, suggestions, and honest critiques helped shape Sync() into the platform it is today. 
                  We deeply appreciate the time and effort you invested in testing, and your input has been critical in refining the user experience, 
                  ensuring that Sync() meets the real-world needs of teams everywhere.
              </p>
              <p className="text-lg my-5 text-[#2B2B2B] font-regular text-justify">
                  Finally, we would like to acknowledge our partners, investors, and the wider collaboration community for their support and encouragement. 
                  Your belief in our mission and continued trust has been a driving force behind our progress. We are excited to continue improving Sync() 
                  and exploring new ways to help teams around the world connect, collaborate, and achieve their goals together. Thank you for being part of this journey with us.
              </p>
            </div>
          
            <div className="my-10">
              <h2 className="text-2xl font-semibold text-[#69369B] mb-4">Contact Us</h2>
              <p className="text-lg text-[#2B2B2B]">
                  We&rsquo;re here to help! Whether you have questions, feedback, or need assistance, feel free to contact us. Our team is always ready to support you.
              </p>
              <a href="/contact-us">
                  <button className="mt-6 px-6 py-3 bg-[#69369B] text-white text-lg font-semibold rounded hover:bg-[#572A81] transition duration-300">
                      Get in Touch
                  </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BlankPage;