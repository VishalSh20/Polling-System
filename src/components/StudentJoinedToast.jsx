import React from "react";
import PropTypes from "prop-types";
import { Toast,ToastToggle } from "flowbite-react";
import { UserPlus2 } from "lucide-react";

function StudentJoinedToast({ name, onClose }) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Toast className="bg-green-50 border border-green-300 text-green-900 shadow-lg">
        <div className="inline-flex items-center justify-center w-8 h-8 text-green-500 bg-green-100 rounded-lg">
          <UserPlus2 className="w-5 h-5" />
        </div>
        <div className="ml-3 text-sm font-medium">
          <span className="font-semibold">{name}</span> has joined the session!
        </div>
        <ToastToggle onDismiss={onClose} />
      </Toast>
    </div>
  );
}

StudentJoinedToast.propTypes = {
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default StudentJoinedToast;
