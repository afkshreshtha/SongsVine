import React from 'react'

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''
      } hidden sm:block h-16 w-16 mr-4`}
    >
      <img
        src={activeSong?.image[2]?.link}
        alt="cover art"
        className="rounded-full"
      />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title || activeSong?.name
          ? activeSong?.title || activeSong?.name
          : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.subtitle || activeSong?.year
          ? activeSong?.subtitle || activeSong?.year
          : 'No active Song'}
      </p>
    </div>
  </div>
)

export default Track
