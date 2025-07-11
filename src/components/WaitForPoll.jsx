import React from "react";
import PropTypes from "prop-types";

const WaitForPoll = () => (
  <div className="flex flex-col items-center justify-center min-h-[300px]">
    <div className="mb-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
    </div>
    <div className="text-2xl font-semibold text-center">
      Wait for the teacher to ask questions..
    </div>
  </div>
);

export default WaitForPoll;