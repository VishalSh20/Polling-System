import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const PollResults = ({ options }) => {
  const { pollResults, preservedPollResults } = useSelector(state => state.poll);

  const activeResults = pollResults || preservedPollResults;
  
  console.log("pollResults are: ", activeResults);
  
  const totalVotes = activeResults?.options
    ? activeResults.options.reduce((sum, r) => sum + (r.count || 0), 0)
    : 0;
  const displayOptions = activeResults?.options || options;

  return (
    <div className="space-y-4">
      {displayOptions.map((opt, idx) => {
        const count = activeResults?.options?.[idx]?.count || 0;
        const percentage = activeResults?.options?.[idx]?.percentage || 0;
        const name = activeResults?.options?.[idx]?.name || opt.name;
        
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
      {activeResults?.status === 'CLOSED' && (
        <div className="text-sm text-red-600 font-medium mt-2">
          Poll Status: {activeResults.status}
        </div>
      )}
    </div>
  );
};

PollResults.propTypes = {
  options: PropTypes.array.isRequired
};

export default PollResults;