import React from "react";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      {/* 
        The <Outlet /> is a placeholder that renders child routes defined 
        in the React Router configuration. 
      */}
      <Outlet />  
    </div>
  );
};

export default HomePage;
