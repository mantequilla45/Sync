"use client"; // Ensure this is a client-side component

import React, { useState, useEffect } from 'react';
import { createProject } from '@/services/_index';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface Collaborator {
  uid: string;
  displayName: string;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Manages modal's transition state
  const [isFocused, setIsFocused] = useState(false); // Tracks focus state for inputs

  // Form states
  const [projectName, setProjectName] = useState(''); // Project name input
  const [projectDescription, setProjectDescription] = useState(''); // Project description input
  const [collaborator, setCollaborator] = useState(''); // Temporary collaborator input
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [possibleCollaborators, setPossibleCollaborators] = useState<Collaborator[]>([]); // Available collaborators
  const [privacySetting, setPrivacySetting] = useState<'private' | 'public'>('private'); // Privacy settings
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await fetch('/api/Colleagues/GetColleagues');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        setPossibleCollaborators(data.colleagues); // Assuming data.colleagues is an array of { uid, displayName }
      } catch (error) {
        console.error('Failed to fetch collaborators:', error);
      }
    };

    fetchCollaborators();
  }, []);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setIsModalOpen(true), 10);
    } else {
      setIsModalOpen(false);
    }
  }, [isVisible]);

  const handleAddCollaborator = () => {
    if (collaborator.trim() !== '' && !collaborators.includes(collaborator)) {
      setCollaborators([...collaborators, collaborator]);
      setCollaborator('');
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setProjectName('');
      setProjectDescription('');
      setCollaborator('');
      setCollaborators([]);
      setPrivacySetting('private');
      setError(null);
      onClose();
    }, 300);
  };


  return isVisible ? (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50
        transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`bg-white rounded-3xl p-10 w-1/3 transition-transform duration-300
          ${isModalOpen ? 'translate-y-0' : '-translate-y-10'}`}
      >
        <h2 className="text-2xl text-[#652D90] font-semibold mb-4">Create New Project</h2>

        {/* Project Name */}
        <div className="mb-4 space-y-2">
          <div className="flex flex-row">
            <label className="block text-gray-700">Project Name</label>
            <label className="block text-[#F55F5F] ml-1">*</label>
          </div>
          <input
            type="text"
            className={`w-full bg-[#EDEDED] rounded-full p-2 pl-5 
            border border-[#DCD6D6] focus:border-gray-300 focus:outline-none focus:ring-0`}
            placeholder="Enter project name"
            style={{ color: '#242424' }}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        {/* Project Description */}
        <div className="mb-4 space-y-2">
          <label className="block text-gray-700">Project Description</label>
          <textarea
            className={`w-full bg-[#EDEDED] text rounded-2xl p-4 pl-5 
            border border-[#DCD6D6] focus:border-gray-300 focus:outline-none focus:ring-0`}
            rows={4}
            placeholder="Enter project description"
            style={{ color: '#242424' }}
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Collaborators Section */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Collaborators</label>
          <select
            className={`w-full bg-[#EDEDED] text-black rounded-full p-2 pl-5 
            border border-[#DCD6D6] focus:border-gray-300 focus:outline-none focus:ring-0`}
            value={collaborator}
            onChange={(e) => setCollaborator(e.target.value)}
          >
            <option value="" disabled>
              Select a collaborator
            </option>
            {possibleCollaborators.map((col) => (
              <option key={col.uid} value={col.uid}>
                {col.displayName}
              </option>
            ))}
          </select>
          <button
            className="mt-4 bg-[#69369B] rounded-full text-white px-8 py-2"
            onClick={handleAddCollaborator}
            disabled={!collaborator}
          >
            Add Collaborator
          </button>
          <div className="mt-2">
            {collaborators.map((col, index) => (
              <p key={index} className="text-sm text-gray-600">{col}</p>
            ))}
          </div>
        </div>


        {/* Privacy Settings */}
        <div className="mb-4">
          <label className="block text-[#2B2B2B]">Privacy Settings</label>
          <div className="flex items-center space-x-4 mt-4">
            <label className="text-[#2B2B2B] flex items-center">
              <input
                type="radio"
                name="privacy"
                value="private"
                checked={privacySetting === 'private'}
                onChange={() => setPrivacySetting('private')}
                className="mr-2 h-5 w-5"
              />
              Private
            </label>
            <label className="text-[#2B2B2B] flex items-center">
              <input
                type="radio"
                name="privacy"
                value="public"
                checked={privacySetting === 'public'}
                onChange={() => setPrivacySetting('public')}
                className="mr-2 h-5 w-5"
              />
              Public
            </label>
          </div>
        </div>

        {/* Submit/Cancel Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="bg-[#69369B] rounded-full px-8 py-2"
            onClick={async () => {
              const formData = new FormData();
              formData.append('name', projectName);
              formData.append('description', projectDescription);
              formData.append('privacy', privacySetting);
              formData.append('collaborators', JSON.stringify(collaborators));

              try {
                await createProject(formData, setError);
                handleClose(); // Close the modal on success
              } catch (err) {
                console.error(err);
              }
            }}
            disabled={!projectName || !projectDescription} // Disable if required fields are empty
          >
            Create Project
          </button>

        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
