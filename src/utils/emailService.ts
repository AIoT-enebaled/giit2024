import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = "j5lr-u1sKIncQiSNQ";
const EMAILJS_SERVICE_ID = "service_u40qh8e";
const EMAILJS_STUDENT_TEMPLATE_ID = "template_fis3lfw";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_8jt9xba";
const ADMIN_EMAIL = "geniusinstitute2024@gmail.com";

let isInitialized = false;

try {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  isInitialized = true;
} catch (error) {
  console.error('Failed to initialize EmailJS:', error);
}

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
  if (!isInitialized) {
    console.error('EmailJS not initialized');
    throw new Error('Email service is not initialized. Please try again later.');
  }

  try {
    console.log('Attempting to send student confirmation email...', {
      service: EMAILJS_SERVICE_ID,
      template: EMAILJS_STUDENT_TEMPLATE_ID,
      data: { ...data, to_email: data.to_email }
    });

    // Send email to student/parent
    const studentResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_STUDENT_TEMPLATE_ID,
      {
        ...data,
        subject: `Course Registration Confirmation - ${data.course_title}`,
      }
    );

    console.log('Student email response:', studentResponse);

    if (studentResponse.status !== 200) {
      console.error('Student email failed with status:', studentResponse.status);
      throw new Error('Failed to send confirmation email to student/parent');
    }

    console.log('Attempting to send admin notification email...');

    // Send notification to GIIT
    const adminResponse = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_ADMIN_TEMPLATE_ID,
      {
        ...data,
        to_email: ADMIN_EMAIL,
        to_name: "GIIT Admin",
        subject: `New Course Registration - ${data.course_title}`,
      }
    );

    console.log('Admin email response:', adminResponse);

    if (adminResponse.status !== 200) {
      console.error('Admin email failed with status:', adminResponse.status);
      throw new Error('Failed to send notification email to admin');
    }

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      if (error.message.includes('rate limit')) {
        throw new Error('Too many registration attempts. Please try again in a few minutes.');
      } else if (error.message.includes('network')) {
        throw new Error('Network error. Please check your internet connection and try again.');
      } else if (error.message.includes('template')) {
        throw new Error('Email template configuration error. Please contact support.');
      }
    }
    throw new Error('Registration failed. Please try again or contact support if the issue persists.');
  }
};