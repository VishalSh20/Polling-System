import React, { useEffect, useState } from "react";
import axios from "axios";
import PastPollResults from "./PastPollResults";
import { Spinner, Alert } from "flowbite-react";

const PastPolls = () => {
  const [pastPolls, setPastPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/poll-results`)
      .then(res => {
        console.log(res.data);
        setPastPolls(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || "Failed to fetch past polls");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner size="xl" color="purple" aria-label="Loading past polls" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8">
        <Alert color="failure">
          <span className="font-medium">Error:</span> {error}
        </Alert>
      </div>
    );
  }

  if (!Array.isArray(pastPolls) || !pastPolls.length) {
    return <div className="text-center text-gray-500">No past polls yet.</div>;
  }

  return (
    <div className="space-y-8">
      {pastPolls.map((poll) => (
        <div key={poll.id} className="bg-white rounded-xl p-6 shadow">
          <div className="font-bold text-lg mb-2">{poll.question}</div>
          <PastPollResults options={poll.options} />
        </div>
      ))}
    </div>
  );
};

export default PastPolls;