import React, { useState, useEffect } from 'react';

const Background: React.FC<{ defaultOpacity?: number; className?: string }> = ({ defaultOpacity = 0.1, className = '', ...props }) => {
  const [opacity, setOpacity] = useState<number>(defaultOpacity);

  useEffect(() => {
    const savedOpacity = localStorage.getItem('opacity');
    if (savedOpacity) {
      setOpacity(parseFloat(savedOpacity));
    }
  }, []);

  return (
    <div
      className={`fixed inset-0 z-0 bg-[linear-gradient(to_top_right,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] overflow-hidden ${className}`}
      {...props}
    >
      {/* Ring 1 */}
      <div
        style={{
          position: 'absolute',
          top: '-25vh',
          left: '-2vw',
          width: '50vw',
          height: '50vw',
          background: 'transparent',
          borderRadius: '50%',
          border: `6vw solid ${'#D964AA' + Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
          zIndex: 1,
        }}
      />

      {/* Ring 2 */}
      <div
        style={{
          position: 'absolute',
          bottom: '0vh',
          left: '0vw',
          width: '25vw',
          height: '25vw',
          background: 'transparent',
          borderRadius: '50%',
          border: `3vw solid ${'#E552BC' + Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
          zIndex: 1,
        }}
      />

      {/* Ring 3 */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15vh',
          right: '-3vw',
          width: '45vw',
          height: '45vw',
          background: 'transparent',
          borderRadius: '50%',
          border: `6vw solid ${'#9952E1' + Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
          zIndex: 1,
        }}
      />

      {/* Ring 4 */}
      <div
        style={{
          position: 'absolute',
          top: '-10vh',
          right: '0vw',
          width: '30vw',
          height: '30vw',
          background: 'transparent',
          borderRadius: '50%',
          border: `3vw solid ${'#B06CF3' + Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
          zIndex: 1,
        }}
      />

      {/* Ring 5 */}
      <div
        style={{
          position: 'absolute',
          top: '5vh',
          left: '45vw',
          width: '20vw',
          height: '20vw',
          background: 'transparent',
          borderRadius: '50%',
          border: `2.5vw solid ${'#A150F2' + Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
          zIndex: 1,
        }}
      />

      {/* Ring 6 */}
      <div
        style={{
          position: 'absolute',
          bottom: '-30vh',
          left: '30vw',
          width: '25vw',
          height: '25vw',
          background: 'transparent',
          borderRadius: '50%',
          border: `3vw solid ${'#CC7FC9' + Math.floor(opacity * 255).toString(16).padStart(2, '0')}`,
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Background;
