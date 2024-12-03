import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EmailTemplates = () => {
  const [activeTemplate, setActiveTemplate] = useState<'student' | 'admin'>('student');

  return (
    <div className="min-h-screen bg-[#020817] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 gradient-text">
          Email Templates Preview
        </h1>

        {/* Template Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTemplate('student')}
            className={`px-6 py-2 rounded-lg transition-all ${
              activeTemplate === 'student'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            Student Template
          </button>
          <button
            onClick={() => setActiveTemplate('admin')}
            className={`px-6 py-2 rounded-lg transition-all ${
              activeTemplate === 'admin'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            Admin Template
          </button>
        </div>

        {/* Template Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          {activeTemplate === 'student' ? (
            <iframe
              src={`${import.meta.env.BASE_URL}templates/studentRegistrationEmail.html`}
              className="w-full h-[600px] border-0"
              title="Student Registration Email Template"
            />
          ) : (
            <iframe
              src={`${import.meta.env.BASE_URL}templates/adminNotificationEmail.html`}
              className="w-full h-[600px] border-0"
              title="Admin Notification Email Template"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EmailTemplates;
