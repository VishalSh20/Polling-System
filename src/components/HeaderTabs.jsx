import React from "react";
import PropTypes from "prop-types";

const HeaderTabs = ({ tabs, selected, onSelect }) => (
  <div className="flex gap-4 border-b mb-8">
    {tabs.map(tab => (
      <button
        key={tab}
        className={`py-2 px-6 font-semibold border-b-2 transition-all ${
          selected === tab
            ? "border-purple-600 text-purple-600"
            : "border-transparent text-gray-500 hover:text-purple-600"
        }`}
        onClick={() => onSelect(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

HeaderTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default HeaderTabs;