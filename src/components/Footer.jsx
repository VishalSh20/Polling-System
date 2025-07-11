import React from "react";
import PropTypes from "prop-types";
import { Mail, Github } from "lucide-react";

const Footer = () => {
    return (
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left side - Credits */}
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                Submitted by{' '}
                <span className="font-semibold text-white">Vishal Sharma</span>
              </p>
            </div>
  
            {/* Right side - Contact Info */}
            <div className="flex items-center space-x-6">
              {/* Email */}
              <a
                href="mailto:vishal1405sharma@gmail.com"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <Mail className="w-4 h-4 group-hover:text-blue-400" />
                <span className="text-sm">vishal1405sharma@gmail.com</span>
              </a>
  
              {/* GitHub */}
              <a
                href="https://github.com/VishalSh20"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <Github className="w-4 h-4 group-hover:text-blue-400" />
                <span className="text-sm">VishalSh20</span>
              </a>
            </div>
          </div>
  
          {/* Bottom border line */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <p className="text-gray-500 text-xs">
                © 2025 intervue.io. Built with React & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;