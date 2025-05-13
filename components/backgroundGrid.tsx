'use client';

import React from 'react';

const BackgroundGrid = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none hidden dark:block"
    >
      {/* Optional mask image for radial fade */}
      <div className="absolute inset-0 bg-transparent [mask-image:radial-gradient(ellipse_120%_120%_at_50%_30%,white,transparent)]">
        <div
          className="w-full h-full bg-[radial-gradient(transparent,transparent,rgba(0,0,0,0.9))],
          bg-[linear-gradient(transparent_19px,rgba(255,255,255,0.05)_1px),linear-gradient(to_right,transparent_19px,rgba(255,255,255,0.05)_1px)]
          bg-[size:20px_20px]"
        />
      </div>
    </div>
  );
};

export default BackgroundGrid;
