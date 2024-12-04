import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("oeEXDVnhS6KGxOa_e");

export interface EmailTemplateParams {
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
  [key: string]: string | undefined;  // Index signature to make it compatible with Record<string, unknown>
}

export const sendRegistrationEmail = async (templateParams: EmailTemplateParams): Promise<EmailJSResponseStatus | null> => {
  try {
    const result = await emailjs.send(
      'service_5yvw3kl',  // Your EmailJS service ID
      'template_9qfpbxm', // Your EmailJS template ID
      templateParams,
      'oeEXDVnhS6KGxOa_e' // Your EmailJS public key
    );
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    return null;
  }
};
