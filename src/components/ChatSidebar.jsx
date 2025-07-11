import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs } from "flowbite-react";
import Participants from "./Participants";
import MessageBox from "./MessageBox";

function ChatSidebar({
  show,
  onClose,
  participants,
  isTeacher,
  userId,
}) {
  const [activeTab, setActiveTab] = useState("chat");

  if (!show) return null;

  return (
    <div className="fixed bottom-8 right-8 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
      {/* Tabs */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b">
        <div className="flex gap-4">
          <button
            className={`font-semibold text-sm pb-2 border-b-2 transition-all ${
              activeTab === "chat"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
          <button
            className={`font-semibold text-sm pb-2 border-b-2 transition-all ${
              activeTab === "participants"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("participants")}
          >
            Participants
          </button>
        </div>
        <button
          className="text-gray-400 hover:text-gray-700 text-xl font-bold px-2 rounded"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "chat" ? (
          <div className="h-full flex flex-col">
            <MessageBox sidebarMode />
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <Participants
              participants={participants}
              isTeacher={isTeacher}
              userId={userId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

ChatSidebar.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  participants: PropTypes.array.isRequired,
  isTeacher: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired
};

export default ChatSidebar;
