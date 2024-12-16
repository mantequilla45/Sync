import React, { useState } from 'react';

const PasswordSecurity = () => {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  const toggleTwoFactor = () => {
    setIsTwoFactorEnabled(!isTwoFactorEnabled);
  };

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-10">
      <h2 className="text-2xl text-[#69369B] font-semibold">Password and Security</h2>
      <div className="flex flex-col px-5 py-5 gap-4">
        <p className="text-gray-700 mb-4">
          Keep your account secure by regularly updating your password and enabling extra layers of protection.
        </p>
        <div className="">
          <h3 className="font-semibold text-lg text-gray-800">Change Password</h3>
          <p className="text-sm text-gray-600">Ensure your password is strong and unique. Use a mix of characters, numbers, and symbols.</p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Change Password
          </button>
        </div>
        <div className="">
          <h3 className="font-semibold text-lg text-gray-800">Two-Factor Authentication (2FA)</h3>
          <p className="text-sm text-gray-600">Add an extra layer of security by enabling 2FA. You&apos;ll need both your password and a secondary verification code to access your account.</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg">Enable 2FA</span>
            <button
              onClick={toggleTwoFactor}
              className={`text-sm px-3 py-1 rounded-full ${isTwoFactorEnabled ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {isTwoFactorEnabled ? 'Enabled' : 'Enable'}
            </button>
          </div>
        </div>
        <div className="">
          <h3 className="font-semibold text-lg text-gray-800">Security Tips</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            <li>Use a unique password for each account.</li>
            <li>Don&apos;t share your password with anyone.</li>
            <li>Enable multi-factor authentication wherever possible.</li>
            <li>Be cautious of phishing attempts and suspicious links.</li>
          </ul>
        </div>
      </div>
      

     

      

      
    </div>
  );
};

export default PasswordSecurity;
