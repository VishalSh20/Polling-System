import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import HeaderTabs from "./HeaderTabs";
import CurrentPoll from "./CurrentPoll";
import PastPolls from "./PastPolls";
import WaitForPoll from "./WaitForPoll";

const StudentPage = () => {
  const currentPoll = useSelector(state => state.poll.currentPoll);
  const preservedPoll = useSelector(state => state.poll.preservedPoll);
  const [tab, setTab] = useState("Current Poll");

  return (
    <div className="max-w-3xl mx-auto py-8">
      <HeaderTabs
        tabs={["Current Poll", "Past Polls"]}
        selected={tab}
        onSelect={setTab}
      />
      {tab === "Current Poll" && (currentPoll ? <CurrentPoll /> : 
      preservedPoll ? 
      <>
      <WaitForPoll />
      <CurrentPoll />
      </> : <WaitForPoll />)}
      {tab === "Past Polls" && <PastPolls />}
    </div>
  );
};

export default StudentPage;