import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import socket from "../socket";
import { setAnswered, setPollResults, setTimeRemaining, clearCurrentPoll, clearPreservedPoll } from "../lib/slices/pollSlice";
import PollResults from "./PollResults";

const CurrentPoll = ({ isTeacher, setTab }) => {
  const dispatch = useDispatch();
  const { currentPoll, preservedPoll, isAnswered, timeRemaining } = useSelector(state => state.poll);
  const [selected, setSelected] = useState(null);
  const [pollState, setPollState] = useState('ACTIVE'); // ACTIVE, ENDED, WAITING

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!currentPoll || currentPoll.status !== 'ACTIVE') {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        // Use a callback to get the current value from Redux state
        dispatch((dispatch, getState) => {
          const currentTime = getState().poll.timeRemaining;
          
          if (currentTime <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setPollState('ENDED');
            if (isTeacher) socket.emit("close_poll", activePoll.id);
            dispatch(setTimeRemaining(0));
            return;
          }
          
          dispatch(setTimeRemaining(currentTime - 1));
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [currentPoll, dispatch, isTeacher]);

  useEffect(() => {
    if (currentPoll) {
      setSelected(null);
      dispatch(setAnswered(false));
      setPollState('ACTIVE');
    }
  }, [currentPoll?.id, dispatch]);

  useEffect(() => {
    const handlePollResults = (data) => {
      if (data.pollId === currentPoll?.id) {
        dispatch(setPollResults(data.results));
      }
    };

    const handlePollClosed = (data) => {
      if (data.pollId === currentPoll?.id) {
        setPollState('ENDED');
        dispatch(setAnswered(true));
        dispatch(setTimeRemaining(0));
      }
    };

    socket.on("poll_results", handlePollResults);
    socket.on("poll_closed", handlePollClosed);
    
    return () => {
      socket.off("poll_results", handlePollResults);
      socket.off("poll_closed", handlePollClosed);
    };
  }, [currentPoll?.id, dispatch]);

  const handleSubmit = () => {
    if (selected !== null && !isTeacher) {
      socket.emit("submit_answer", {
        pollId: currentPoll.id,
        answer: currentPoll.options[selected].optionLabel,
      });
      dispatch(setAnswered(true));
    }
  };

  const handleClosePoll = () => {
    if (isTeacher && activePoll) {
      socket.emit("close_poll", activePoll.id);
    }
  };

  const handleAddNewQuestion = () => {
    dispatch(clearPreservedPoll()); // Clear preserved poll when adding new question
    dispatch(clearCurrentPoll());
    setTab("Add Poll");
  };

  // Use preserved poll if current poll is cleared but we still have preserved data
  const activePoll = currentPoll || preservedPoll;

  if (!activePoll) return null;

  const isPollActive = currentPoll && currentPoll.status === 'ACTIVE' && pollState === 'ACTIVE';
  const showResults = isTeacher || isAnswered || pollState === 'ENDED';

  return (
    <div className="bg-white rounded-xl p-8 shadow-md space-y-8">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">Question</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">⏱️</span>
            <span className={timeRemaining <= 10 ? "text-red-600 font-bold" : "text-purple-600"}>
              {String(timeRemaining).padStart(2, "0")}s
            </span>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isPollActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isPollActive ? 'Active' : 'Closed'}
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-gray-700 to-gray-500 text-white rounded-t-lg px-6 py-4 font-semibold text-lg">
        {activePoll.question}
      </div>
      
      {
        isTeacher || isAnswered || pollState === 'ENDED'
         ?
        <PollResults 
          pollId={activePoll.id} 
          options={activePoll.options} 
          isLive={true} 
        />
        :
        <div className="p-6 bg-white border border-purple-200 rounded-b-lg space-y-4">
          {activePoll.options.map((opt, idx) => (
            <div
              key={opt.optionLabel}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                selected === idx && !showResults ? "bg-purple-100 border-2 border-purple-400" : "bg-gray-100"
              } ${!showResults && !isTeacher && isPollActive ? "hover:bg-purple-50" : ""}`}
              onClick={() => !showResults && !isTeacher && isPollActive && setSelected(idx)}
              style={{ cursor: showResults || isTeacher || !isPollActive ? "default" : "pointer" }}
            >
              <div className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold">
                {idx + 1}
              </div>
              <div className="flex-1 font-medium">{opt.name}</div>
            </div>
          ))}
        </div>
      }
      
      {/* Student: Not submitted yet */}
      {/* Student: Submit button */}
      {!isTeacher && !isAnswered && isPollActive && (
        <button
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          disabled={selected === null}
          onClick={handleSubmit}
        >
          Submit Answer
        </button>
      )}

      {/* Teacher: Close poll button when active */}
      {isTeacher && isPollActive && (
        <button
          className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-all duration-200"
          onClick={handleClosePoll}
        >
          Close Poll
        </button>
      )}

      {/* Teacher: Add new question button when poll ended */}
      {isTeacher && pollState === 'ENDED' && (
        <button
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
          onClick={handleAddNewQuestion}
        >
          Add New Question
        </button>
      )}
    </div>
  );
};

CurrentPoll.propTypes = {
  isTeacher: PropTypes.bool,
  setTab: PropTypes.func
};

export default CurrentPoll;