import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import socket from "../socket";
import { Send } from "lucide-react";

const MessageBox = ({ sidebarMode }) => {
  const messages = useSelector(state => state.chat.messages);
  const { name, role } = useSelector(state => state.user);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit("send_message", {
        text: input,
        sender: name || "Anonymous",
        role,
        timestamp: new Date().toISOString()
      });
      setInput("");
    }
  };

  return (
    <div className={`${sidebarMode ? 'flex flex-col h-full bg-white rounded-none shadow-none border-none' : 'fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col z-50'}`}>
      <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-xl font-bold">
        Chat
      </div>
      <div className={`flex-1 overflow-y-auto px-4 py-2 space-y-2 ${sidebarMode ? 'max-h-full' : 'max-h-60'}` }>
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-xs text-gray-400">{msg.sender} ({msg.role})</span>
            <span className="bg-gray-100 rounded px-2 py-1 text-sm">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex border-t border-gray-200">
        <input
          className="flex-1 px-3 py-2 text-sm rounded-bl-xl outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-br-xl transition"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

MessageBox.propTypes = {
  sidebarMode: PropTypes.bool,
  messages: PropTypes.array,
  onSend: PropTypes.func
};

export default MessageBox;