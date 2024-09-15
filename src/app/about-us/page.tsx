
import Header from '../../components/protected/header';
import Image from 'next/image';

const BlankPage = () => {
    return (

      <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
        <Header /> 
        <div className="px-[90px] mb-2">
          <h1 className="text-sm text-white font-light">Home / About Us</h1>
        </div>
        <div className="flex-grow bg-white rounded-2xl shadow-lg mx-16 px-[150px] py-[100px] mb-16">
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
        </div>
      </div>
    );
  };
  
  export default BlankPage;