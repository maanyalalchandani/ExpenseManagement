import React from 'react';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-blue-500 text-white">
          <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: `url('/images/bg_login.jpeg')` }}></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-lg">{subtitle}</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
