import React, { useState } from "react";

interface FontSizeChangerProps {
  applyFormat: (format: string, value: any) => void;
}

const FontSizeChanger: React.FC<FontSizeChangerProps> = ({ applyFormat }) => {
  const [fontSize, setFontSize] = useState<string>("16px");

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = e.target.value;
    setFontSize(selectedSize);
    applyFormat("size", selectedSize);
  };

  return (
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
  );
};

export default FontSizeChanger;
