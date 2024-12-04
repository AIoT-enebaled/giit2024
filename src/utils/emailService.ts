import { EmailJSResponseStatus } from '@emailjs/browser';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = "j5lr-u1sKIncQiSNQ_xXzYw";
const EMAILJS_SERVICE_ID = "service_u40qh8e";
const EMAILJS_STUDENT_TEMPLATE_ID = "template_fis3lfw";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_8jt9xba";
const ADMIN_EMAIL = "geniusinstitute2024@gmail.com";

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

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

export async function sendRegistrationEmail(data: EmailData): Promise<{ success: boolean; studentResponse?: EmailJSResponseStatus; adminResponse?: EmailJSResponseStatus }> {
  try {
    // Prepare student/parent email template parameters
    const studentTemplateParams = {
      to_name: data.to_name,
      to_email: data.to_email,
      course_title: data.course_title,
      class_type: data.class_type,
      class_mode: data.class_mode,
      student_name: data.student_name || data.to_name,
      student_age: data.student_age || 'Not specified',
      parent_name: data.parent_name || 'Not specified',
      contact: data.contact || data.to_email,
      education: data.education || 'Not specified',
      previous_coding: data.previous_coding || 'Not specified'
    };

    console.log('Sending student/parent confirmation email with params:', studentTemplateParams);

    // Send email to student/parent
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
      class_type: data.class_type,
      class_mode: data.class_mode,
      student_name: data.student_name || data.to_name,
      student_age: data.student_age || 'Not specified',
      parent_name: data.parent_name || 'Not specified',
      contact: data.contact || data.to_email,
      student_email: data.to_email,
      education: data.education || 'Not specified',
      previous_coding: data.previous_coding || 'Not specified',
      subject: `New Course Registration - ${data.course_title}`,
      reply_to: data.to_email
    };

    console.log('Sending admin notification email with params:', adminTemplateParams);

    // Send notification to admin
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
    throw error;
  }
}