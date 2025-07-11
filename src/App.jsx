import React, { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {persistor} from "./lib/store"
import { useSelector, useDispatch } from "react-redux";
import RoleSelection from "./components/RoleSelection";
import StudentNameEntry from "./components/StudentNameEntry";
import TeacherPage from "./components/TeacherPage";
import StudentPage from "./components/StudentPage"; 
import { setRole, setName, setParticipants } from "./lib/slices/userSlice";
import socket from "./socket";
import { setCurrentPoll, setPollResults, clearCurrentPoll, setPastPolls, setConnectedStudents, setLoading, clearPreservedPoll } from "./lib/slices/pollSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { addMessage } from "./lib/slices/messageSlice";
import MessageBox from "./components/MessageBox"; 
import ChatSidebar from "./components/ChatSidebar";
import { MessageCircle } from "lucide-react";
import StudentJoinedToast from "./components/StudentJoinedToast";
import KickedToast from "./components/KickedToast";


function App() {
  const [showKickedToast, setShowKickedToast] = React.useState(false);
  const kickedToastTimeout = React.useRef(null);
  const [showStudentJoinedToast, setShowStudentJoinedToast] = React.useState(false);
  const [joinedStudentName, setJoinedStudentName] = React.useState("");
  const studentJoinedToastTimeout = React.useRef(null);
  const { role, name, participants } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const currentPoll = useSelector(state => state.poll.currentPoll);

  useEffect(() => {
    if (currentPoll === null) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/current-poll`)
        .then(res => {
          if (res.data && res.data.id) {
            const poll = res.data;
            const pollCreated = new Date(poll.createdAt).getTime();
            const pollTimeLimit = poll.timeLimit ? Number(poll.timeLimit) : 60;
            const pollExpires = pollCreated + pollTimeLimit * 1000;
            const now = Date.now();
            if (now > pollExpires) {
              socket.emit("close_poll", poll.id);
              return;
            }
            const remaining = Math.floor((pollExpires - now) / 1000);
            dispatch(setCurrentPoll({ ...poll, timeLimit: remaining }));
          }
        })
        .catch(err => {
          console.error("Failed to fetch current poll", err);
        });
    }
  }, [currentPoll, dispatch]);

  useEffect(() => {
    const savedName = sessionStorage.getItem("studentName");  
    if (savedName && !role) {
      dispatch(setRole("STUDENT"));
      dispatch(setName(savedName));
    }
  }, [role, dispatch]);

  useEffect(() => {

    socket.on("student_joined", (data) => {
      console.log("Student joined!");
      console.log(data);
      if (data.name) {
        setJoinedStudentName(data.name);
        setShowStudentJoinedToast(true);
        if (studentJoinedToastTimeout.current) clearTimeout(studentJoinedToastTimeout.current);
        studentJoinedToastTimeout.current = setTimeout(() => {
          setShowStudentJoinedToast(false);
        }, 3000);
      }
    })

    socket.on("poll_created",(poll)=>{
      console.log("Received a new poll!",poll);
      dispatch(clearPreservedPoll());
      dispatch(setCurrentPoll(poll));
      dispatch(setLoading(false));
    })

    socket.on("new_poll", (poll) => {
      console.log("Received a new poll!",poll);
      dispatch(clearPreservedPoll());
      dispatch(setCurrentPoll(poll));
      dispatch(setLoading(false));
    });

    socket.on("poll_results", ({ _, results }) => {
      console.log("Received poll results",results);
      dispatch(setPollResults(results));
    });

    socket.on("poll_closed", ({ pollId }) => {
      console.log("Received poll closed",pollId);
    if(pollId === currentPoll.id){
      dispatch(clearCurrentPoll());
    }
    });

    socket.on("past_polls", (polls) => {
      console.log("Received past polls",polls);
      dispatch(setPastPolls(polls));
    });

    socket.on("participants", (participants) => {
      console.log("Received participants",participants);
      dispatch(setParticipants(participants));
    });

    socket.on("student_joined", ({ name, totalStudents }) => {
      console.log("Received student joined", totalStudents);
      dispatch(setConnectedStudents(totalStudents));
      if (name) {
        setJoinedStudentName(name);
        setShowStudentJoinedToast(true);
        if (studentJoinedToastTimeout.current) clearTimeout(studentJoinedToastTimeout.current);
        studentJoinedToastTimeout.current = setTimeout(() => {
          setShowStudentJoinedToast(false);
        }, 3000);
      }
    });

    socket.on("kicked", () => {
      console.log("Received kicked");
      setShowKickedToast(true);
      if (kickedToastTimeout.current) clearTimeout(kickedToastTimeout.current);
      kickedToastTimeout.current = setTimeout(() => setShowKickedToast(false), 4000);
      persistor.purge().then(()=>{
        dispatch(setRole(null));
        dispatch(setName(null));
        dispatch(setParticipants([]));
        dispatch(setConnectedStudents(0));
        sessionStorage.clear();
      });
    });

    socket.on("new_message", (message) => {
      console.log("New Message Received: ",message);
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("new_poll");
      socket.off("poll_results");
      socket.off("poll_closed");
      socket.off("past_polls");
      socket.off("student_joined");
      socket.off("new_message");
    };
  }, [dispatch, currentPoll]);


  const [showMessages, setShowMessages] = React.useState(false);
  
  return (
    <>
      {showStudentJoinedToast && (
        <StudentJoinedToast name={joinedStudentName} onClose={() => setShowStudentJoinedToast(false)} />
      )}
      {showKickedToast && (
        <KickedToast onClose={() => setShowKickedToast(false)} />
      )}
      <Header/>
      {
        !role ? <RoleSelection /> : role === "STUDENT" && !name ? <StudentNameEntry /> : role === "TEACHER" ? <TeacherPage /> : <StudentPage /> 
      }
      
      {/* MessageBox - positioned independently */}
      <ChatSidebar
        show={showMessages}
        onClose={() => setShowMessages(false)}
        participants={participants}
        isTeacher={role === "TEACHER"}
        userId={name}
      />
      <button
        className={`fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 z-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300`}
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
        onClick={() => setShowMessages(v => !v)}
        aria-label="Toggle Messages"
      >
        <MessageCircle size={28} />
      </button>
      <Footer/>
    </>
  )
}
export default App;