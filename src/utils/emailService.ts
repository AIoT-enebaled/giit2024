import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = "j5lr-u1sKIncQiSNQ";
const EMAILJS_SERVICE_ID = "service_u40qh8e";
const EMAILJS_STUDENT_TEMPLATE_ID = "template_fis3lfw";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_8jt9xba";
const ADMIN_EMAIL = "geniusinstitute2024@gmail.com";

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

interface EmailData {
  to_email: string;
  to_name: string;
  course_title: string;
  class_type: string;
  class_mode: string;
  student_name?: string;
  student_age?: string;
  parent_name?: string;
  contact?: string;
}

export const sendRegistrationEmail = async (data: EmailData) => {
  try {
    // Prepare student email template parameters
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
      subject: `Course Registration Confirmation - ${data.course_title}`,
      reply_to: data.to_email
    };

    console.log('Sending student confirmation email with params:', studentTemplateParams);

    // Send email to student/parent
    const studentResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_STUDENT_TEMPLATE_ID,
      studentTemplateParams
    );

    console.log('Student email sent successfully:', studentResponse);

    // Prepare admin email template parameters
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

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    throw new Error('Failed to send registration emails. Please try again or contact support.');
  }
};