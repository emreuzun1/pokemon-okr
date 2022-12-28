import React from "react";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 2000);

  return (
    <div className="w-full mx-auto mt-4 text-3xl font-bold text-center">
      Page Not Found! You are leading to Home Page!!
    </div>
  );
};
