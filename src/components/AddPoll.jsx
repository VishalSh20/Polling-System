import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch} from "react-redux";
import socket from "../socket";
import { setLoading } from "../lib/slices/pollSlice";

const AddPoll = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [timeLimit, setTimeLimit] = useState(60);
  const { loading } = useSelector(state => state.poll);

  const handleOptionChange = (idx, value) => {
    setOptions(options.map((opt, i) => (i === idx ? value : opt)));
  };

  const handleAddOption = () => {
    if (options.length < 4) setOptions([...options, ""]);
  };

  const handleRemoveOption = idx => {
    if (options.length > 2) setOptions(options.filter((_, i) => i !== idx));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(question, options, timeLimit);
    if (!question.trim() || options.some(opt => !opt.trim())) return;
    console.log("Creating poll...");
    dispatch(setLoading(true));
    console.log(socket);
    socket.emit("create_poll", {
      question,
      options: options.map((opt, i) => ({ optionLabel: `${i + 1}`, name: opt })),
      timeLimit,
    });
  };

  return (
    <form
      className="bg-white rounded-xl p-8 shadow-md space-y-8"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-2">Enter your question</h2>
      <textarea
        className="w-full border rounded-lg p-3 text-lg mb-4"
        maxLength={100}
        rows={2}
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Type your question..."
        required
      />
      <div className="flex items-center mb-4 gap-4">
        <label className="font-medium">Time Limit:</label>
        <select
          className="border rounded px-3 py-2"
          value={timeLimit}
          onChange={e => setTimeLimit(Number(e.target.value))}
        >
          {[30, 45, 60, 90, 120].map(sec => (
            <option key={sec} value={sec}>{sec} seconds</option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Edit Options</h3>
        <div className="space-y-3">
          {options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-bold">{idx + 1}</div>
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2"
                value={opt}
                onChange={e => handleOptionChange(idx, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                required
                maxLength={40}
              />
              {options.length > 2 && (
                <button
                  type="button"
                  className="text-red-500 px-2"
                  onClick={() => handleRemoveOption(idx)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        {options.length < 4 && (
          <button
            type="button"
            className="mt-4 text-purple-600 font-medium"
            onClick={handleAddOption}
          >
            + Add More option
          </button>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium mt-4"
        disabled={!question.trim() || options.some(opt => !opt.trim())}
      >
        {
          loading ? (
            <span className="animate-spin mr-2 h-5 w-5 border-b-2 border-white rounded-full"></span>
          ) : (
            "Ask Question"
          )
        }
      </button>
    </form>
  );
};

export default AddPoll;