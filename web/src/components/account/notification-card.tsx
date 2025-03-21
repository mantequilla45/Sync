import React, { useState } from 'react';

const NotificationCard = () => {
  const [news, setNews] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [colleagueRequest, setColleagueRequest] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [projectUpdates, setProjectUpdates] = useState(false);

  const toggleNews = () => setNews(!news);
  const toggleUpdates = () => setUpdates(!updates);
  const toggleColleagueRequest = () => setColleagueRequest(!colleagueRequest);
  const toggleReminders = () => setReminders(!reminders);
  const toggleProjectUpdates = () => setProjectUpdates(!projectUpdates);

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-10 text-[#1E1E1E]">
      <h2 className="text-2xl text-[#69369B] font-semibold mb-4">Notification</h2>
      <div className="flex flex-row px-5 mb-10">
        <div className="flex flex-col w-1/2">
          <h1 className="font-semibold text-xl">Email Notification</h1>
          <p className="text-lg font-light">Get emails to find out what&apos;s going when you&apos;re not online. You can turn this off.</p>
          
          <div className="mt-4 mx-4 space-y-5">
            <div className="flex flex-row gap-5">
              <div className=""> 
                  <button
                      onClick={toggleNews}
                      className={`text-sm px-3 py-1 w-[50px] rounded-lg  ${news ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    >
                      {news ? 'On' : 'Off'}
                  </button>
              </div>
              
                
              <div className="flex flex-col"> 
                <span className="text-xl font-semibold">News</span>
                <p className="font-light"> News about products and feature updates. </p>
              </div>
                
            </div>
            <div className="flex flex-row gap-5">
              
            <div className=""> 
              <button
                  onClick={toggleUpdates}
                  className={`text-sm px-3 py-1 w-[50px] rounded-lg ${updates ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                  {updates ? 'On' : 'Off'}
                </button>
                </div>
                
              <div className="flex flex-col"> 
                <span className="text-xl font-semibold">Updates</span>
                <p className="font-light"> Feature updates. </p>
              </div>
                
            </div>
            <div className="flex flex-row gap-5">
            <div className=""> 
              <button
                  onClick={toggleReminders}
                  className={`text-sm px-3 py-1 w-[50px] rounded-lg ${reminders ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                  {reminders ? 'On' : 'Off'}
                </button>
                </div>
                
              <div className="flex flex-col"> 
                <span className="text-xl font-semibold">Reminders</span>
                <p className="font-light"> These are notification to remind you of
                updates you might have missed. </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/2">
          <h1 className="font-semibold text-xl">Push Notification</h1>
          <p className="text-lg font-light">Get push notification in-app to find out what&apos;s going on when you&apos;re online</p>
          <div className="mt-4 mx-4 space-y-5">
            <div className="flex flex-row gap-5">
              <div className=""> 
                  <button
                      onClick={toggleColleagueRequest}
                      className={`text-sm px-3 py-1 w-[50px] rounded-lg  ${colleagueRequest ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    >
                      {colleagueRequest ? 'On' : 'Off'}
                  </button>
              </div>
              
                
              <div className="flex flex-col"> 
                <span className="text-xl font-semibold">Colleague Request</span>
                <p className="font-light"> Seeking collaboration on projects. </p>
              </div>
                
            </div>
            <div className="flex flex-row gap-5">
              
            <div className=""> 
              <button
                  onClick={toggleProjectUpdates}
                  className={`text-sm px-3 py-1 w-[50px] rounded-lg ${projectUpdates ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                  {projectUpdates ? 'On' : 'Off'}
                </button>
                </div>
                
              <div className="flex flex-col"> 
                <span className="text-xl font-semibold">Project Updates</span>
                <p className="font-light"> Recent changes in projects. </p>
              </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
