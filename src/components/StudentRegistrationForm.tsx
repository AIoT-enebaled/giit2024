import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { sendRegistrationEmail } from '../utils/emailService';

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
    setError(null);

    try {
      const registrationResult = await sendRegistrationEmail({
        to_email: formData.email || "geniusinstitute2024@gmail.com",
        to_name: formData.fullName,
        course_title: courseTitle ?? 'Unknown Course',
        class_type: formData.classType,
        class_mode: formData.classMode,
        student_name: formData.fullName,
        student_age: formData.age,
        contact: formData.phone || formData.email || "Not provided"
      });

      if (registrationResult) {
        setSuccess(true);
        setTimeout(() => {
          onClose?.();
        }, 3000);
      }
    } catch (err) {
      setError('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Student Registration Form</h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {success ? (
        <div className="text-center p-4">
          <div className="text-green-500 text-xl mb-2">
            Registration Successful!
          </div>
          <p className="text-gray-400">We'll contact you shortly with next steps.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="5"
              max="100"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Current Education Level</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Education Level</option>
              <option value="primary">Primary School</option>
              <option value="secondary">Secondary School</option>
              <option value="university">University</option>
              <option value="graduate">Graduate</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Class Type</label>
            <select
              name="classType"
              value={formData.classType}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            >
              <option value="private">Private (1-on-1)</option>
              <option value="group">Group Class</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Class Mode</label>
            <select
              name="classMode"
              value={formData.classMode}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            >
              <option value="remote">Remote (Online)</option>
              <option value="inPerson">In-Person</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Previous Coding Experience</label>
            <select
              name="previousCoding"
              value={formData.previousCoding}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            >
              <option value="no">No Experience</option>
              <option value="basic">Basic Understanding</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⌛</span>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentRegistrationForm;