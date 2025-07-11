import React from "react";
import PropTypes from "prop-types";

const PastPollResults = ({ options }) => {
  
  const totalVotes = options.reduce((sum, r) => sum + (r.count || 0), 0);
  const displayOptions = options;

  return (
    <div className="space-y-4">
      {displayOptions.map((opt, idx) => {
        const count = options?.[idx]?.count || 0;
        const percentage = options?.[idx]?.percentage || 0;
        const name = options?.[idx]?.name || opt.name;
        
        return (
          <div key={opt.optionLabel || opt.name} className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">
              {idx + 1}
            </div>
            <div className="flex-1 font-medium">{name}</div>
            <div className="flex-1">
              <div 
                className="bg-purple-400 h-4 rounded transition-all duration-500" 
                style={{ width: `${percentage}%` }} 
              />
            </div>
            <span className="ml-2 font-semibold text-purple-700">
              {count} ({percentage}%)
            </span>
          </div>
        );
      })}
      <div className="text-sm text-gray-500 mt-4">
        Total votes: {totalVotes}
      </div>
    </div>
  );
};

PastPollResults.propTypes = {
  options: PropTypes.array.isRequired
};

export default PastPollResults;