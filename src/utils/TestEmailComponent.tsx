import React, { useEffect, useState } from 'react';
import { sendRegistrationEmail } from './emailService';

export const TestEmailComponent: React.FC = () => {
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const runTest = async () => {
      setStatus('Processing registration...');
      
      try {
        const testData = {
          to_name: 'Test User',
          to_email: 'geniusinstitute2024@gmail.com',
          course_title: 'Test Course',
          class_type: 'Test Class Type',
          class_mode: 'Online',
          student_name: 'Test Student',
          student_age: '20',
          parent_name: 'Test Parent',
          contact: '1234567890',
          education: 'High School',
          previous_coding: 'None'
        };

        setStatus('Sending registration confirmation...');
        const emailResult = await sendRegistrationEmail(testData);
        
        if (emailResult) {
          setStatus('✅ Registration complete! Email sent successfully');
          console.log('Success details:', emailResult);
        } else {
          setStatus('❌ Registration failed. Please try again.');
          console.error('Email sending failed');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setStatus(`❌ Registration failed: ${errorMessage}`);
        console.error('Registration error:', error);
      }
    };

    runTest();
  }, []);

  return (
    <div className="text-center p-4">
      <h2 className="text-xl font-bold mb-4">Registration Status</h2>
      <p className="text-lg">{status}</p>
    </div>
  );
};

export default TestEmailComponent;
