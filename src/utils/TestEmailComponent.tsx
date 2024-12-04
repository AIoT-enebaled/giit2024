import React, { useEffect, useState } from 'react';
import { sendRegistrationEmail } from './emailService';

export const TestEmailComponent: React.FC = () => {
  const [status, setStatus] = useState<string>('Initializing...');

  useEffect(() => {
    const runTest = async () => {
      setStatus('Testing EmailJS Configuration...');
      
      try {
        const testData = {
          to_name: 'Test User',
          to_email: 'geniusinstitute2024@gmail.com', // Using admin email for testing
          course_title: 'Test Course',
          class_type: 'Test Class Type',
          class_mode: 'Online',
          student_name: 'Test Student',
          student_age: '20',
          parent_name: 'Test Parent',
          contact: '1234567890',
        };

        setStatus('Attempting to send test email...');
        const result = await sendRegistrationEmail(testData);
        
        if (result.success) {
          setStatus('✅ Test email sent successfully');
          console.log('Success details:', result);
        } else {
          setStatus(`❌ Failed to send test email: ${result.error}`);
          console.error('Error details:', result);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setStatus(`❌ Test failed with error: ${errorMessage}`);
        console.error('Test error:', error);
      }
    };

    runTest();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">EmailJS Test</h2>
      <p className="mb-2">Status: {status}</p>
      <p className="text-sm text-gray-600">Check the browser console for detailed results...</p>
    </div>
  );
};

export default TestEmailComponent;
