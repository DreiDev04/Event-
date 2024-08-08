import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <div className="loader">
        <div className="loader-square bg-foreground"></div>
        <div className="loader-square bg-foreground"></div>
        <div className="loader-square bg-foreground"></div>
        <div className="loader-square bg-foreground"></div>
        <div className="loader-square bg-foreground"></div>
        <div className="loader-square bg-foreground"></div>
        <div className="loader-square bg-foreground"></div>
      </div>
        <p className="p-4">Loading...</p>
    </div>
  );
};

export default Loader;
