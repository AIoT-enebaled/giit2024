import React, { useEffect } from 'react';
import { testEmailConfiguration, sendRegistrationEmail } from './emailService';

export const TestEmailComponent: React.FC = () => {
  useEffect(() => {
    const runTest = async () => {
      console.log('Testing EmailJS Configuration...');
      
      // Test basic configuration
      const configValid = await testEmailConfiguration();
      if (!configValid) {
        console.error('❌ EmailJS configuration test failed');
        return;
      }
      console.log('✅ EmailJS configuration is valid');

      // Test sending a test email
      try {
        const testData = {
          to_name: 'Test User',
          to_email: 'test@example.com',
          course_title: 'Test Course',
          class_type: 'Test Class Type',
          class_mode: 'Online',
          student_name: 'Test Student',
          student_age: '20',
          parent_name: 'Test Parent',
          contact: '1234567890',
        };

        console.log('Attempting to send test email...');
        const result = await sendRegistrationEmail(testData);
        console.log('✅ Test email sent successfully:', result);
      } catch (error) {
        console.error('❌ Failed to send test email:', error);
      }
    };

    runTest();
  }, []);

  return (
    <div>
      <h2>EmailJS Test</h2>
      <p>Check the console for test results...</p>
    </div>
  );
};

export default TestEmailComponent;
