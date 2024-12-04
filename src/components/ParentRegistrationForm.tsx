import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { submitRegistration } from '../utils/firebaseService';

interface ParentRegistrationFormProps {
  courseTitle?: string;
  price?: {
    ugx: number;
    usd: number;
  };
  onClose?: () => void;
  courses?: string[];
}

interface ParentData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  preferredContact: string;
  classType: string;
  classMode: string;
  age: string;
  education: string;
  previousCoding: string;
}

const ParentRegistrationForm: React.FC<ParentRegistrationFormProps> = ({ courseTitle, price, onClose, courses }) => {
  const [children, setChildren] = useState([{
    fullName: '',
    age: '',
    education: '',
    previousCoding: 'no'
  }]);
  const [parentData, setParentData] = useState<ParentData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    preferredContact: 'email',
    classType: 'private',
    classMode: 'remote',
    age: '',
    education: '',
    previousCoding: 'no'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParentData(prev => ({ ...prev, [name]: value }));
  };

  const handleChildChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setChildren(prev => {
      const newChildren = [...prev];
      newChildren[index] = { ...newChildren[index], [name]: value };
      return newChildren;
    });
  };

  const addChild = () => {
    setChildren(prev => [...prev, { fullName: '', age: '', education: '', previousCoding: 'no' }]);
  };

  const removeChild = (index: number) => {
    setChildren(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('Submitting registration for child:', parentData.fullName);
      
      const result = await submitRegistration({
        to_name: parentData.fullName,
        to_email: parentData.email,
        course_title: courseTitle || '',
        class_type: parentData.classType,
        class_mode: parentData.classMode,
        student_name: parentData.fullName,
        student_age: parentData.age,
        parent_name: parentData.fullName,
        contact: parentData.phone,
        education: parentData.education,
        previous_coding: parentData.previousCoding
      });

      if (result.success) {
        setSuccess(true);
        setParentData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          preferredContact: 'email',
          classType: 'private',
          classMode: 'remote',
          age: '',
          education: '',
          previousCoding: 'no'
        });
        setChildren([]);
        if (onClose) onClose();
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
    <div className="w-full">
      {courseTitle && <h2 className="text-2xl font-bold text-white mb-4">{courseTitle}</h2>}
      {price && (
        <div className="course-price mb-4">
          <p className="text-gray-300">Price: {price.ugx} UGX / {price.usd} USD</p>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
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
        <form onSubmit={handleSubmit} className="space-y-6 bg-dark-light p-6 rounded-lg">
          {/* Parent Information Section */}
          <div className="bg-dark p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Parent Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={parentData.fullName}
                  onChange={handleParentChange}
                  required
                  className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter parent's full name"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={parentData.email}
                  onChange={handleParentChange}
                  required
                  className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter parent's email"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={parentData.phone}
                  onChange={handleParentChange}
                  required
                  className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter parent's phone number"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Preferred Contact Method</label>
                <select
                  name="preferredContact"
                  value={parentData.preferredContact}
                  onChange={handleParentChange}
                  required
                  className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="email" className="bg-gray-900">Email</option>
                  <option value="phone" className="bg-gray-900">Phone</option>
                  <option value="whatsapp" className="bg-gray-900">WhatsApp</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={parentData.address}
                  onChange={handleParentChange}
                  required
                  className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your address"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Class Type</label>
                <select
                  name="classType"
                  value={parentData.classType}
                  onChange={handleParentChange}
                  required
                  className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="private" className="bg-gray-900">Private (1-on-1)</option>
                  <option value="group" className="bg-gray-900">Group Class</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Class Mode</label>
                <select
                  name="classMode"
                  value={parentData.classMode}
                  onChange={handleParentChange}
                  required
                  className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="remote" className="bg-gray-900">Remote (Online)</option>
                  <option value="physical" className="bg-gray-900">Physical (In-Person)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Children Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-200">Children Information</h3>
              <button
                type="button"
                onClick={addChild}
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
              >
                Add Child
              </button>
            </div>

            {children.map((child, index) => (
              <div key={index} className="bg-dark p-6 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-200">Child {index + 1}</h4>
                  {children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChild(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={child.fullName}
                      onChange={(e) => handleChildChange(index, e)}
                      required
                      className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter child's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={child.age}
                      onChange={(e) => handleChildChange(index, e)}
                      required
                      min="5"
                      max="100"
                      className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter child's age"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1">Education Level</label>
                    <select
                      name="education"
                      value={child.education}
                      onChange={(e) => handleChildChange(index, e)}
                      required
                      className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="" className="bg-gray-900">Select Education Level</option>
                      <option value="primary" className="bg-gray-900">Primary School</option>
                      <option value="secondary" className="bg-gray-900">Secondary School</option>
                      <option value="other" className="bg-gray-900">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1">Previous Coding Experience</label>
                    <select
                      name="previousCoding"
                      value={child.previousCoding}
                      onChange={(e) => handleChildChange(index, e)}
                      required
                      className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="no" className="bg-gray-900">No Experience</option>
                      <option value="basic" className="bg-gray-900">Basic Understanding</option>
                      <option value="intermediate" className="bg-gray-900">Intermediate</option>
                      <option value="advanced" className="bg-gray-900">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
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

export default ParentRegistrationForm;