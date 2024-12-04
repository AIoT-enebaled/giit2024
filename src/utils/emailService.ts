import { EmailJSResponseStatus } from '@emailjs/browser';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = "j5lr-u1sKIncQiSNQ_xXzYw";
const EMAILJS_SERVICE_ID = "service_u40qh8e";
const EMAILJS_STUDENT_TEMPLATE_ID = "template_fis3lfw";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_8jt9xba";
const ADMIN_EMAIL = "geniusinstitute2024@gmail.com";

// Initialize EmailJS with user ID
emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY,
  limitRate: { id: 'my_limit', emails: 100 } as any
});

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
    console.log('Starting email sending process...');
    
    // Validate input data
    if (!data.to_email || !data.to_name || !data.course_title) {
      throw new Error('Missing required fields: to_email, to_name, or course_title');
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
      reply_to: ADMIN_EMAIL
    };

    console.log('Student template parameters:', studentTemplateParams);

    // Send email to student/parent
    console.log('Sending student/parent email...');
    const studentResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_STUDENT_TEMPLATE_ID,
      studentTemplateParams
    );

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

    console.log('Admin template parameters:', adminTemplateParams);

    // Send notification to admin
    console.log('Sending admin notification...');
    const adminResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_ADMIN_TEMPLATE_ID,
      adminTemplateParams
    );

    console.log('Admin email sent successfully:', adminResponse);

    return {
      success: true,
      studentResponse,
      adminResponse
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    let errorMessage = 'Unknown error occurred';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      // Log specific error details for debugging
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    
    // Return detailed error information
    return {
      success: false,
      error: `Email sending failed: ${errorMessage}`
    };
  }
}