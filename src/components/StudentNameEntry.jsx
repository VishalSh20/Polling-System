import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setName } from "../lib/slices/userSlice";
import socket from "../socket";

const StudentNameEntry = () => {
  const [name, setLocalName] = useState("");
  const dispatch = useDispatch();

  const handleContinue = () => {
    if (name.trim()) {
      sessionStorage.setItem("studentName", name);
      dispatch(setName(name));
      socket.emit("join_as_student", { name });
    }
  };

  return (
    <div className="h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Header with logo/brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="text-lg">✨</span>
            Intervue Poll
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Let's Get Started
          </h1>
          
          <p className="text-gray-600 leading-relaxed">
            If you're a student, you'll be able to{" "}
            <span className="font-semibold text-gray-900">submit your answers</span>, participate in live
            polls, and see how your responses compare with your classmates
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
              Enter your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setLocalName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
              placeholder="Rahul Bajaj"
            />
          </div>
          
          <button
            onClick={handleContinue}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentNameEntry;