import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import HeaderTabs from "./HeaderTabs";
import AddPoll from "./AddPoll";
import CurrentPoll from "./CurrentPoll";
import PastPolls from "./PastPolls";

const TeacherPage = () => {
  const currentPoll = useSelector(state => state.poll.currentPoll);
  const [tab, setTab] = useState(currentPoll ? "Current Poll" : "Add Poll");

  // Switch to current poll tab if a poll is added
  React.useEffect(() => {
    if (currentPoll) setTab("Current Poll");
  }, [currentPoll]);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <HeaderTabs
        tabs={[
          currentPoll ? "Current Poll" : "Add Poll",
          "Past Polls"
        ]}
        selected={tab}
        onSelect={setTab}
      />
      {tab === "Add Poll" && <AddPoll />}
      {tab === "Current Poll" && <CurrentPoll isTeacher setTab={setTab}/>}
      {tab === "Past Polls" && <PastPolls />}
    </div>
  );
};

export default TeacherPage;