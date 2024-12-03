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

    // Basic validation
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address');
      setIsSubmitting(false);
      return;
    }

    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Starting registration process...');
      const registrationResult = await sendRegistrationEmail({
        to_email: formData.email,
        to_name: formData.fullName,
        course_title: courseTitle ?? 'Unknown Course',
        class_type: formData.classType,
        class_mode: formData.classMode,
        student_name: formData.fullName,
        student_age: formData.age,
        contact: formData.phone
      });

      console.log('Registration result:', registrationResult);

      if (registrationResult.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose?.();
        }, 3000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to submit registration. Please try again or contact support.');
      }
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
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900/50 p-6 rounded-lg">
          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="5"
              max="100"
              className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Current Education Level</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="" className="bg-gray-800">Select Education Level</option>
              <option value="primary" className="bg-gray-800">Primary School</option>
              <option value="secondary" className="bg-gray-800">Secondary School</option>
              <option value="university" className="bg-gray-800">University</option>
              <option value="graduate" className="bg-gray-800">Graduate</option>
              <option value="other" className="bg-gray-800">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Class Type</label>
            <select
              name="classType"
              value={formData.classType}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="private" className="bg-gray-800">Private (1-on-1)</option>
              <option value="group" className="bg-gray-800">Group Class</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Class Mode</label>
            <select
              name="classMode"
              value={formData.classMode}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="remote" className="bg-gray-800">Remote (Online)</option>
              <option value="inPerson" className="bg-gray-800">In-Person</option>
              <option value="hybrid" className="bg-gray-800">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Previous Coding Experience</label>
            <select
              name="previousCoding"
              value={formData.previousCoding}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="no" className="bg-gray-800">No Experience</option>
              <option value="basic" className="bg-gray-800">Basic Understanding</option>
              <option value="intermediate" className="bg-gray-800">Intermediate</option>
              <option value="advanced" className="bg-gray-800">Advanced</option>
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