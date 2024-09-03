import React from 'react';
import { FaProjectDiagram } from "react-icons/fa";


interface DynamicCardsProps {
  cardCount: number;
}

const DynamicCards: React.FC<DynamicCardsProps> = ({ cardCount }) => {
  // Check if there are no cards
  if (cardCount === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No projects for now.</p>
      </div>
    );
  }

  const rows = Math.ceil(cardCount / 4); // Determine the number of rows needed
  const cards = Array.from({ length: cardCount }, (_, i) => i + 1); // Generate card numbers

  return (
    <div className={`grid grid-rows-${rows} gap-10`}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-10">
          {cards.slice(rowIndex * 4, rowIndex * 4 + 4).map((card) => (
            <div key={card} className="flex flex-col items-center">
              {/* Card */}
              <div
                className="bg-gray-200 rounded-xl border border-gray-300 relative"
                style={{ width: '100%', paddingBottom: '75%' }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-black">
                  {card}
                </div>
              </div>
              
              {/* Icon and Project Title below the card */}
              <div className="mt-4 px-4 w-full flex items-center text-center">
                {/* Replace with your icon */}
                <FaProjectDiagram className="text-gray-500 text-xl" />


                <p className="text-black pl-2">Project {card}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DynamicCards;
