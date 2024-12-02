'use client'

import { useState } from 'react';

interface AddColleagueFormProps {
  projectUID: string;
}

const AddColleagueForm: React.FC<AddColleagueFormProps> = ({ projectUID }) => {
  const [formData, setFormData] = useState({
    colleagueUID: '',
    projectUID,
    editPerm: false,
    createPerm: false,
    assignPerm: false,
    manageUsersPerm: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = new FormData();
    body.append('colleagueUID', formData.colleagueUID);
    body.append('projectUID', formData.projectUID); // Already set
    body.append('editPerm', formData.editPerm.toString());
    body.append('createPerm', formData.createPerm.toString());
    body.append('assignPerm', formData.assignPerm.toString());
    body.append('manageUsersPerm', formData.manageUsersPerm.toString());

    try {
      const response = await fetch('/api/Project/inviteUserProject', {
        method: 'POST',
        body,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Colleague added successfully!');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Failed to add colleague:', error);
      alert('Failed to add colleague.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded-md">
    <div>
      <label htmlFor="colleagueUID" className="block font-medium text-black">
        Colleague UID
      </label>
      <input
        type="text"
        id="colleagueUID"
        name="colleagueUID"
        value={formData.colleagueUID}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md text-black" // Add text-black here for input
        required
      />
    </div>
    <div>
      <label className="block font-medium text-black">Permissions</label>
      <div className="flex items-center space-x-4">
        <label className="text-black">
          <input
            type="checkbox"
            name="editPerm"
            checked={formData.editPerm}
            onChange={handleInputChange}
          />
          Edit Permission
        </label>
        <label className="text-black">
          <input
            type="checkbox"
            name="createPerm"
            checked={formData.createPerm}
            onChange={handleInputChange}
          />
          Create Permission
        </label>
        <label className="text-black">
          <input
            type="checkbox"
            name="assignPerm"
            checked={formData.assignPerm}
            onChange={handleInputChange}
          />
          Assign Permission
        </label>
        <label className="text-black">
          <input
            type="checkbox"
            name="manageUsersPerm"
            checked={formData.manageUsersPerm}
            onChange={handleInputChange}
          />
          Manage Users Permission
        </label>
      </div>
    </div>
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Submit
    </button>
  </form>
  );
};

export default AddColleagueForm;
