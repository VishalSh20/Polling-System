import React from "react";
import PropTypes from "prop-types";
import socket from "../socket";

function Participants({ participants = [], isTeacher }) {
  const handleKick = (participant) => {
    if (participant.role === "STUDENT" && participant.socketId) {
      socket.emit("kick_student", participant.socketId);
    }
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="font-semibold text-lg mb-3">Participants ({participants.length})</div>
      <ul className="space-y-2">
        {participants.map((p, idx) => (
          <li key={p.socketId || p.name + idx} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
            <div className="flex items-center gap-2">
              <span className={`font-medium ${p.role === "TEACHER" ? "text-blue-700" : "text-gray-700"}`}>{p.name}</span>
              <span className={`text-xs rounded px-2 py-0.5 ml-2 ${p.role === "TEACHER" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{p.role}</span>
            </div>
            {isTeacher && p.role === "STUDENT" && (
              <button
                className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 rounded border border-red-200 bg-red-50 transition"
                onClick={() => handleKick(p)}
              >
                Kick
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

Participants.propTypes = {
  participants: PropTypes.array,
  isTeacher: PropTypes.bool
};

export default Participants;