import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { submitRegistration } from '../utils/firebaseService';

interface StudentRegistrationFormProps {
  courseTitle: string;
  price: {
    ugx: number;
    usd: number;
  };
  courses: string[];
  onClose: () => void;
}

const StudentRegistrationForm: React.FC<StudentRegistrationFormProps> = ({ courseTitle, price, courses, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    classType: 'private',
    classMode: 'remote',
    education: '',
    previousCoding: 'no'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      console.log('Submitting student registration:', formData.fullName);
      
      const result = await submitRegistration({
        to_name: formData.fullName,
        to_email: formData.email,
        course_title: courseTitle || 'Not specified',
        class_type: formData.classType || 'Regular',
        class_mode: formData.classMode || 'Online',
        student_name: formData.fullName,
        student_age: formData.age,
        contact: formData.phone || formData.email,
        education: formData.education || 'Not specified',
        previous_coding: formData.previousCoding || 'None'
      });

      if (result.success) {
        setSuccess(true);
        if (onClose) {
          setTimeout(onClose, 3000);
        }
      } else {
        setError(result.error || 'Failed to submit registration');
        console.error('Registration error:', result.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setError(errorMessage);
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-300">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          required
          value={formData.age}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="classType" className="block text-sm font-medium text-gray-300">
          Class Type
        </label>
        <select
          id="classType"
          name="classType"
          required
          value={formData.classType}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        >
          <option value="private">Private</option>
          <option value="group">Group</option>
        </select>
      </div>

      <div>
        <label htmlFor="classMode" className="block text-sm font-medium text-gray-300">
          Class Mode
        </label>
        <select
          id="classMode"
          name="classMode"
          required
          value={formData.classMode}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        >
          <option value="remote">Remote</option>
          <option value="physical">Physical</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div>
        <label htmlFor="education" className="block text-sm font-medium text-gray-300">
          Current Education Level
        </label>
        <input
          type="text"
          id="education"
          name="education"
          required
          value={formData.education}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="previousCoding" className="block text-sm font-medium text-gray-300">
          Previous Coding Experience
        </label>
        <select
          id="previousCoding"
          name="previousCoding"
          required
          value={formData.previousCoding}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-500 text-sm mt-2">
          Registration successful! Confirmation email has been sent.
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⌛</span>
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Registration
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default StudentRegistrationForm;