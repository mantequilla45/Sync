
import { Header } from '@/components/_index';
import Image from 'next/image';

const BlankPage = () => {
    return (

      <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
        <Header /> 
        <div className="px-[90px] mb-2">
          <h1 className="text-sm text-white font-light">Home / Project About</h1>
        </div>
        <div className="flex-grow space-y-[50px] bg-white rounded-2xl shadow-lg mx-16 px-[250px] py-[100px] mb-16">
          <div className="flex flex-row gap-[100px]">
            <div className="w-[50%] my-10">
              <div className="relative inline-block">
                <h1 className="text-2xl text-[#2B2B2B] font-regular relative inline-block mb-5">
                  About
                  <span className="absolute left-0 bottom-0 w-full rounded-full h-[3px] bg-gradient-to-r from-[#0F94B9] via-[#4815FF] to-[#BF00B2]"></span>
                </h1>
                </div>
                  <div>
                    <div className="flex flex-row items-center gap-4">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2FSync%20Logo%2FSync%20Logo%20Purple%20Large.png?alt=media&token=dc1a14e5-6f1f-400e-ac86-2b82b624d079"
                        alt="Description of the image"
                        className="w-[70px] h-[70px] "
                      />
                    <h2
                      className="text-7xl my-5 text-[#5D1E8C] font-[700]"
                      style={{ textShadow: "3px 3px 2px rgba(0, 0, 0, 0.2)" }}
                    >
                      Sync
                    </h2>
                  </div>
                    <p className="text-lg my-5 text-[#2B2B2B] font-regular">Sync() is a cutting-edge Real-Time Collaboration Platform designed 
                        to enhance team collaboration and streamline workflows. Whether your team is working from the office or remotely across different time zones,  Sync() provides a seamless environment for collaboration, allowing users to edit documents, manage tasks, and communicate in real time. Built to support teams of any size, Sync() integrates advanced features that make collaboration efficient, intuitive, and secure, driving productivity and 
                        ensuring everyone stays on the same page.
                    </p>
                </div>
            </div>
            <div className="w-[50%] flex items-center">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2Fwebsite-pictures%2Fabout1.png?alt=media&token=3e3e48dc-bfff-4b1a-a5e2-6686e40cd530"
                alt="About"
                width={5000}
                height={3000}
                priority
              />
            </div>
          </div>
          <div className="flex flex-row gap-[100px]">
            <div className="w-[50%] flex items-center">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2Fwebsite-pictures%2Fkey-features.png?alt=media&token=bf20249d-f50c-43ab-b40f-74703830b95f"
                  alt="Key Features"
                  width={5000}
                  height={3000}
                  priority
                />
            </div>
            <div className="w-[50%] my-10">
              <div>
                <div className="flex flex-row items-center">
                  <h2
                    className="text-7xl my-5 text-[#5D1E8C] font-[700]"
                    style={{ textShadow: "3px 3px 2px rgba(0, 0, 0, 0.2)" }}
                  >
                    Key Features
                  </h2>
                </div>
                <div>
                  <ul className="list-disc text-lg my-5 text-[#2B2B2B] font-regular pl-5 space-y-5">
                    <li>Real-Time Editing: Multiple users can edit documents simultaneously, with instant updates visible to all.</li>

                    <li>Task Management: Organize, assign, and track tasks with prioritization, due dates, and real-time notifications.</li>

                    <li>User Roles & Permissions: Customize roles for admins, editors, and viewers to control access and improve workflow.</li>

                    <li>Version Control: Access and revert to previous document versions to track changes and collaborate confidently.</li>

                    <li>Real-Time Notifications: Get instant alerts for task updates, document edits, and comments to stay informed.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-[100px] items-center">
            <div className="w-[50%]">
              <div className="relative inline-block">
                
                </div>
                  <div>
                    <div className="flex flex-row items-center">
                    <h2
                      className="text-7xl text-[#5D1E8C] font-[700]"
                      style={{ textShadow: "3px 3px 2px rgba(0, 0, 0, 0.2)" }}
                    >
                      Why Sync()?
                    </h2>
                  </div>
                  <div>
                    <ul className="list-disc text-lg my-5 text-[#2B2B2B] font-regular pl-5 space-y-5">
                        <li>Performance: Sync() ensures fast load times and smooth performance, even during heavy collaboration.</li>
                        
                        <li>Scalability: Sync() scales effortlessly for growing teams and projects, from startups to large corporations.</li>
                        
                        <li>Security: Your data is protected with encryption and compliance with GDPR and CCPA for top-tier security.</li>
                        
                        <li>Cross-Device Compatibility: Access Sync() on any device—desktop, laptop, tablet, or smartphone—for uninterrupted collaboration.</li>
                    </ul>

                </div>
                </div>
            </div>
            <div className="w-[40%] flex items-center">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2Fwebsite-pictures%2Fwhy%20not.png?alt=media&token=9ab253b8-205e-4b40-a5a3-a6641ecf85ff"
                alt="About"
                width={5000}
                height={3000}
                priority
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="w-[100%] text-lg my-5 text-[#2B2B2B] font-regular text-center">
              Sync() transcends the boundaries of traditional collaboration tools—it&#39;s an all-encompassing solution built to revolutionize the way teams function, adapt, and excel in today&#39;s fast-paced environment. Featuring intuitive real-time editing capabilities, Sync() empowers team members to collaborate on documents and projects simultaneously, ensuring every update is reflected instantly across all devices. 

              With its comprehensive task management system, teams can seamlessly delegate responsibilities, monitor progress, and set priorities, making it easy to stay on top of deadlines. The platform also prioritizes security, offering robust user role management to control access levels and safeguard sensitive information, giving organizations peace of mind.

              Sync() further stands out with its cross-device compatibility, ensuring that your work isn&#39;t restricted to a single platform. Whether you&#39;re on a desktop, tablet, or mobile device, Sync() delivers a consistent, responsive experience. This flexibility allows team members to remain productive regardless of their location or the device they are using, ensuring that work continues uninterrupted.

              From fostering greater team engagement to maximizing output through streamlined workflows, Sync() ensures your projects move forward efficiently. By keeping everyone connected, aligned, and on the same page, Sync() transforms collaboration into an effortless, integrated experience, driving your team towards success.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default BlankPage;