import { EmailJSResponseStatus } from '@emailjs/browser';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = "j5lr-u1sKIncQiSNQ";
const EMAILJS_SERVICE_ID = "service_u40qh8e";
const EMAILJS_STUDENT_TEMPLATE_ID = "template_fis3lfw";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_8jt9xba";
const ADMIN_EMAIL = "geniusinstitute2024@gmail.com";

// Initialize EmailJS
let isInitialized = false;
try {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
    limitRate: {
      interval: 1000, // 1 second
      limit: 80
    } as any
  });
  isInitialized = true;
  console.log('EmailJS initialized successfully');
} catch (error) {
  console.error('Failed to initialize EmailJS:', error);
}

export interface EmailData {
  to_name: string;
  to_email: string;
  course_title: string;
  class_type: string;
  class_mode: string;
  student_name?: string;
  student_age?: string;
  parent_name?: string;
  contact?: string;
  education?: string;
  previous_coding?: string;
}

export async function sendRegistrationEmail(data: EmailData): Promise<{ success: boolean; studentResponse?: EmailJSResponseStatus; adminResponse?: EmailJSResponseStatus; error?: string }> {
  try {
    if (!isInitialized) {
      throw new Error('EmailJS is not properly initialized');
    }

    console.log('Starting email sending process with data:', JSON.stringify(data, null, 2));
    
    // Validate input data
    if (!data.to_email || !data.to_name || !data.course_title) {
      throw new Error('Missing required fields: to_email, to_name, or course_title');
    }

    // Verify EmailJS configuration
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_STUDENT_TEMPLATE_ID || !EMAILJS_ADMIN_TEMPLATE_ID) {
      throw new Error('EmailJS configuration is incomplete');
    }

    // Prepare student/parent email template parameters
    const studentTemplateParams = {
      to_name: data.to_name,
      to_email: data.to_email,
      course_title: data.course_title,
      class_type: data.class_type || 'Not specified',
      class_mode: data.class_mode || 'Not specified',
      student_name: data.student_name || data.to_name,
      student_age: data.student_age || 'Not specified',
      parent_name: data.parent_name || 'Not specified',
      contact: data.contact || data.to_email,
      education: data.education || 'Not specified',
      previous_coding: data.previous_coding || 'Not specified',
      from_name: 'GIIT - Genius Institute of Information Technology',
      reply_to: ADMIN_EMAIL,
      subject: `Course Registration Confirmation - ${data.course_title}`
    };

    console.log('Sending student/parent email with parameters:', studentTemplateParams);

    // Send email to student/parent
    const studentResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_STUDENT_TEMPLATE_ID,
      studentTemplateParams,
      EMAILJS_PUBLIC_KEY // Add public key here
    ).catch(error => {
      console.error('Failed to send student email:', error);
      throw new Error(`Failed to send confirmation email: ${error.message}`);
    });

    console.log('Student/parent email sent successfully:', studentResponse);

    // Prepare admin notification template parameters
    const adminTemplateParams = {
      to_name: 'GIIT Admin',
      to_email: ADMIN_EMAIL,
      course_title: data.course_title,
      class_type: data.class_type || 'Not specified',
      class_mode: data.class_mode || 'Not specified',
      student_name: data.student_name || data.to_name,
      student_age: data.student_age || 'Not specified',
      parent_name: data.parent_name || 'Not specified',
      contact: data.contact || data.to_email,
      student_email: data.to_email,
      education: data.education || 'Not specified',
      previous_coding: data.previous_coding || 'Not specified',
      subject: `New Course Registration - ${data.course_title}`,
      reply_to: data.to_email,
      from_name: 'GIIT Registration System'
    };

    console.log('Sending admin notification with parameters:', adminTemplateParams);

    // Send notification to admin
    const adminResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_ADMIN_TEMPLATE_ID,
      adminTemplateParams,
      EMAILJS_PUBLIC_KEY // Add public key here
    ).catch(error => {
      console.error('Failed to send admin notification:', error);
      // Don't throw here, as we already sent the student email
      return null;
    });

    if (adminResponse) {
      console.log('Admin email sent successfully:', adminResponse);
    }

    return {
      success: true,
      studentResponse,
      adminResponse: adminResponse || undefined
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    let errorMessage = 'Unknown error occurred';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        emailjsConfig: {
          serviceId: EMAILJS_SERVICE_ID,
          studentTemplateId: EMAILJS_STUDENT_TEMPLATE_ID,
          adminTemplateId: EMAILJS_ADMIN_TEMPLATE_ID,
          hasPublicKey: !!EMAILJS_PUBLIC_KEY,
          isInitialized
        }
      });
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function testEmailConfiguration(): Promise<boolean> {
  try {
    // Check if EmailJS is initialized
    if (!isInitialized) {
      console.error('EmailJS is not initialized');
      return false;
    }

    // Attempt a test email send to verify configuration
    const testData: EmailData = {
      to_name: 'Test User',
      to_email: ADMIN_EMAIL,
      course_title: 'Configuration Test',
      class_type: 'Test',
      class_mode: 'Online'
    };

    const result = await sendRegistrationEmail(testData);
    return result.success;
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return false;
  }
}