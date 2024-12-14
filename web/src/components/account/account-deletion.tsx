import React, { useState } from 'react';

const AccountDeletion = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleDeleteClick = () => {
    if (isConfirmed) {
      // Add logic to trigger account deletion here
      alert('Account will be deleted.');
    } else {
      alert('Please confirm deletion before proceeding.');
    }
  };

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-10">
        <h2 className="text-2xl text-[#69369B] font-semibold mb-4">Delete Account</h2>
        <div className="flex flex-col px-5 my-5">
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete your account? This action is permanent and cannot be undone. 
          All your data will be lost. Please be sure before proceeding.
        </p>

        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-800">Important Notes:</h3>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            <li>Your account data will be permanently deleted.</li>
            <li>This action cannot be reversed.</li>
            <li>Consider downloading your data before deleting your account.</li>
          </ul>
        </div>

        <div className="flex items-center mb-4 ">
          <input
            type="checkbox"
            id="confirmDelete"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
            className="mr-2"
          />
          <label htmlFor="confirmDelete" className="text-sm text-gray-600">
            I understand the consequences and want to delete my account.
          </label>
        </div>

        <button
          onClick={handleDeleteClick}
          disabled={!isConfirmed}
          className={`w-full py-2 mt-4 rounded-full ${isConfirmed ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          {isConfirmed ? 'Delete Account' : 'Delete Account'}
        </button>
      </div>
      
    </div>
  );
};

export default AccountDeletion;
