import React from 'react';

const Error = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <h1 className="font-bold text-white text-2xl mt-2">{title || 'Loading'}</h1>
  </div>
);

export default Error;
