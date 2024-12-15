"use client";
import React, { useState, useEffect } from "react";

interface DocumentModalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface Project {
  projectId: string;
  projectName: string;
}

const DocumentModal: React.FC<DocumentModalProps> = ({ isVisible, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameField, setNameField] = useState('');
  const [projects, setProjects] = useState<Project[]>([]); // List of projects
  const [selectedProject, setSelectedProject] = useState<string>(''); // Currently selected project
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // For handling errors

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setIsModalOpen(true), 10); // Delay for transition effect
    } else {
      setIsModalOpen(false);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(onClose, 300);
  };

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/Project/getProjects'); // Replace with your endpoint
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProjects(data.projects.map((p: any) => ({
          projectId: p.projectId,
          projectName: p.title, // Adjusted to fetch `title` from project data
        })));
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Function to handle form submission
  const handleCreateDocument = async () => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('projectId', selectedProject);
      formData.append('title', nameField);

      const response = await fetch('/api/Document/CreateDocument', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Document created successfully:', result);
        handleClose();
      } else {
        setError(result.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Failed to create document:', err);
      setError('Failed to create document');
    } finally {
      setLoading(false);
    }
  };

  return isVisible ? (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50
        transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white rounded-3xl p-10 w-1/3 transition-transform duration-300
          ${isModalOpen ? "translate-y-0" : "-translate-y-10"}`}
      >
        <h2 className="text-2xl text-[#652D90] font-semibold mb-4">Create New Document</h2>

        {/* Document Title */}
        <div className="mb-4 space-y-2">
          <div className="flex flex-row">
            <label className="block text-gray-700">Document Title</label>
            <label className="block text-[#F55F5F] ml-1">*</label>
          </div>
          <input
            type="text"
            className={`w-full bg-[#EDEDED] rounded-full p-2 pl-5 
            border border-[#DCD6D6] focus:border-gray-300 focus:outline-none focus:ring-0`}
            placeholder="Enter document title"
            style={{ color: "#242424" }}
            value={nameField}
            onChange={(e) => setNameField(e.target.value)}
          />
        </div>

        {/* Project Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Project</label>
          <select
            className={`w-full bg-[#EDEDED] text-black rounded-full p-2 pl-5 
  border border-[#DCD6D6] focus:border-gray-300 focus:outline-none focus:ring-0`}
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="" disabled>Select a project</option>
            {projects.map((project) => (
              <option key={project.projectId} value={project.projectId}>
                {project.projectName}
              </option>
            ))}
          </select>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit/Cancel Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="bg-[#7E7E7E] text-white rounded-full px-8 py-2"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#69369B] rounded-full px-8 py-2"
            onClick={handleCreateDocument}
            disabled={loading || !nameField || !selectedProject}
          >
            {loading ? 'Creating...' : 'Create Document'}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DocumentModal;
