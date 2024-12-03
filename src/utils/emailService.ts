import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_PUBLIC_KEY = "j5lr-u1sKIncQiSNQ_xXzYw";
const EMAILJS_SERVICE_ID = "service_u40qh8e";
const EMAILJS_STUDENT_TEMPLATE_ID = "template_fis3lfw";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_8jt9xba";
const ADMIN_EMAIL = "geniusinstitute2024@gmail.com";

// Initialize EmailJS with debug mode
emailjs.init(EMAILJS_PUBLIC_KEY);

// Verify EmailJS configuration
const verifyEmailJSConfig = async () => {
  try {
    console.log('Verifying EmailJS configuration...');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Student Template ID:', EMAILJS_STUDENT_TEMPLATE_ID);
    console.log('Admin Template ID:', EMAILJS_ADMIN_TEMPLATE_ID);
    
    // Test if EmailJS is properly initialized
    if (!(emailjs as any).isInitialized()) {
      throw new Error('EmailJS is not properly initialized');
    }
    
    return true;
  } catch (error) {
    console.error('EmailJS configuration verification failed:', error);
    throw error;
  }
};

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
    // Verify EmailJS configuration before sending
    await verifyEmailJSConfig();

    // Log the start of email sending process
    console.log('Starting email sending process...');
    
    // Validate required data
    if (!data.to_email || !data.to_name || !data.course_title) {
      throw new Error('Missing required email data fields');
    }

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

    // Send email to student/parent with timeout
    const studentEmailPromise = Promise.race([
      emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_STUDENT_TEMPLATE_ID,
        studentTemplateParams
      ),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Student email sending timeout')), 30000)
      )
    ]);

    const studentResponse = await studentEmailPromise;
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

    // Send notification to admin with timeout
    const adminEmailPromise = Promise.race([
      emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        adminTemplateParams
      ),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Admin email sending timeout')), 30000)
      )
    ]);

    const adminResponse = await adminEmailPromise;
    console.log('Admin email sent successfully:', adminResponse);

    return {
      success: true,
      studentResponse,
      adminResponse
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    
    // Enhanced error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    }

    // Throw a more descriptive error
    throw new Error(
      error instanceof Error
        ? `Failed to send registration emails: ${error.message}`
        : 'Failed to send registration emails. Please try again or contact support.'
    );
  }
};

// Export the verification function for testing
export const testEmailConfiguration = async () => {
  try {
    await verifyEmailJSConfig();
    console.log('EmailJS configuration is valid');
    return true;
  } catch (error) {
    console.error('EmailJS configuration test failed:', error);
    return false;
  }
};