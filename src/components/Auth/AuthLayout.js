import React from 'react';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-blue-500 text-white p-8">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-lg">{subtitle}</p>
          <img src="publ\images\bg_login.jpeg" alt="Decoration" className="mt-4 w-full h-56 object-cover lg:hidden" />
        </div>
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
