import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("j5lr-u1sKIncQiSNQ");

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
    // Send email to student/parent
    const studentResponse = await emailjs.send(
      "service_u40qh8e",
      "template_nqmcfnf",
      {
        ...data,
        subject: `Course Registration Confirmation - ${data.course_title}`,
      }
    );

    if (studentResponse.status !== 200) {
      throw new Error('Failed to send confirmation email to student/parent');
    }

    // Send notification to GIIT
    const adminResponse = await emailjs.send(
      "service_u40qh8e",
      "template_8jt9xba",
      {
        ...data,
        to_email: "geniusinstitute2024@gmail.com",
        to_name: "GIIT Admin",
        subject: `New Course Registration - ${data.course_title}`,
      }
    );

    if (adminResponse.status !== 200) {
      throw new Error('Failed to send notification email to admin');
    }

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Registration email failed to send. Please try again.');
  }
};