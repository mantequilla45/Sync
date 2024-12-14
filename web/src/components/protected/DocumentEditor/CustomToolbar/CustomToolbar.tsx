import React, { useState } from "react";
import Quill from "quill";
import { handleImageUpload } from "../DocumentEditorFunctions/DocumentEditorBasicSocketIO";
import { Range } from "react-quill";

interface CustomToolbarProps {
  quill: Quill | null;
  documentID: string;
}

export const CustomToolbar: React.FC<CustomToolbarProps> = ({ quill, documentID }) => {
    const [fontSize, setFontSize] = useState<string>("16px");

    const toggleFormat = (format: string, value: any = true) => {
      if (quill) {
        const isActive = quill.getFormat()[format];
        quill.format(format, isActive ? false : value, "user");
      }
    };
  
    const applyFormat = (format: string, value: any) => {
      if (quill) {
        // Apply the font size format to the selected text
        quill.format(format, value, "user");
      }
    };

  const isFormatActive = (format: string, value: any = true): string => {
    if (quill) {
      return quill.getFormat()[format] === value
        ? "bg-gray-700 text-white"
        : "bg-black text-white hover:bg-gray-800";
    }
    return "bg-black text-white hover:bg-gray-800";
  };

  const onImageUploadClick = async () => {
    if (quill) {
      const indexPos = quill.getSelection();
      handleImageUpload(quill, indexPos as Range, documentID);
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    setFontSize(size);
    if (quill) {
      applyFormat("size", size);  // Apply font size to the editor
    }
  };

  return (
    <div className="toolbar flex flex-wrap space-x-2 p-2 bg-gray-100 border-b border-gray-300">
      <select
        onChange={(e) => applyFormat("header", e.target.value || false)}
        className="px-2 py-1 rounded bg-black text-white hover:bg-gray-800"
      >
        <option value="">Normal</option>
        <option value="1">Header 1</option>
        <option value="2">Header 2</option>
      </select>

      <button
        onClick={() => toggleFormat("bold")}
        className={`px-4 py-2 rounded transition ${isFormatActive("bold")}`}
      >
        Bold
      </button>
      <button
        onClick={() => toggleFormat("italic")}
        className={`px-4 py-2 rounded transition ${isFormatActive("italic")}`}
      >
        Italic
      </button>
      <button
        onClick={() => toggleFormat("underline")}
        className={`px-4 py-2 rounded transition ${isFormatActive("underline")}`}
      >
        Underline
      </button>

      <select
        onChange={(e) => applyFormat("color", e.target.value)}
        className="px-2 py-1 rounded bg-black text-white hover:bg-gray-800"
      >
        <option value="">Text Color</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>

      <select
        onChange={(e) => applyFormat("background", e.target.value)}
        className="px-2 py-1 rounded bg-black text-white hover:bg-gray-800"
      >
        <option value="">Background Color</option>
        <option value="yellow">Yellow</option>
        <option value="lightgreen">Light Green</option>
        <option value="lightblue">Light Blue</option>
      </select>

      <button
        onClick={() => toggleFormat("link", prompt("Enter link URL") ?? false)}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Link
      </button>
      <button
        onClick={onImageUploadClick}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Image
      </button>

      <button
        onClick={() => toggleFormat("list", "ordered")}
        className={`px-4 py-2 rounded transition ${isFormatActive("list", "ordered")}`}
      >
        Ordered List
      </button>
      <button
        onClick={() => toggleFormat("list", "bullet")}
        className={`px-4 py-2 rounded transition ${isFormatActive("list", "bullet")}`}
      >
        Bullet List
      </button>

      <button
        onClick={() => quill?.formatText(0, quill.getLength(), "clean", true)}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition"
      >
        Clear Formatting
      </button>

      {/* Font Size Dropdown */}
      <div className="flex items-center space-x-2">
        <label className="text-sm text-[#1E1E1E]">Font Size:</label>
            <select
            value={fontSize}
            onChange={handleFontSizeChange}
            className="px-2 py-1 rounded bg-black text-white hover:bg-gray-800"
        >
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="30px">30px</option>
            <option value="36px">36px</option>
            <option value="48px">48px</option>
        </select>
      </div>
    </div>
  );
};
