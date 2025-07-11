import React from "react";
import PropTypes from "prop-types";
import { Toast, ToastToggle } from "flowbite-react";
import { Ban } from "lucide-react";

function KickedToast({ onClose }) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Toast className="bg-red-50 border border-red-300 text-red-900 shadow-lg">
        <div className="inline-flex items-center justify-center w-8 h-8 text-red-500 bg-red-100 rounded-lg">
          <Ban className="w-5 h-5" />
        </div>
        <div className="ml-3 text-sm font-medium">
          You have been <span className="font-semibold">kicked</span> from the session.
        </div>
        <ToastToggle onDismiss={onClose} />
      </Toast>
    </div>
  );
}

KickedToast.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default KickedToast;
