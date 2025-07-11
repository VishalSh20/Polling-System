import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setRole, setName } from "../lib/slices/userSlice";
import socket from "../socket";

const RoleSelection = () => {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "TEACHER") {
      dispatch(setRole("TEACHER"));
      dispatch(setName("Teacher"));
      socket.emit("join_as_teacher");
    } else if (selectedRole === "STUDENT") {
      dispatch(setRole("STUDENT"));
    }
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        {/* Header with logo/brand */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="text-lg">✨</span>
            Intervue Poll
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to the <span className="text-purple-600">Live Polling System</span>
          </h1>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Please select the role that best describes you to begin using the live polling
            system
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
          {/* Student Card */}
          <div
            onClick={() => handleSelect("STUDENT")}
            className={`bg-white border-2 rounded-xl p-8 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] group ${
              selectedRole === "STUDENT" 
                ? "border-purple-500 ring-2 ring-purple-200" 
                : "border-gray-200 hover:border-purple-300"
            }`}
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                I'm a Student
              </h3>
              <p className="text-gray-600 leading-relaxed">
              Join a live poll session and answer questions in real-time.
               </p>
            </div>
          </div>

          {/* Teacher Card */}
          <div
            onClick={() => handleSelect("TEACHER")}
            className={`bg-white border-2 rounded-xl p-8 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] group ${
              selectedRole === "TEACHER" 
                ? "border-purple-500 ring-2 ring-purple-200" 
                : "border-gray-200 hover:border-purple-300"
            }`}
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                I'm a Teacher
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Create and manage live polls for your students.
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button 
            onClick={handleContinue}
            disabled={!selectedRole}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            Continue
          </button>
        </div>
        </div>


      </div>
   
  );
};

export default RoleSelection;