import { courseCatalogs } from '../data/courseDetails';

// Generate QA pairs from course data
export const trainingData = [
  // General questions
  {
    question: "What is GiiT?",
    answer: "GiiT (Genius Institute of Information Technology) is an educational platform that offers various programming and technology courses for different age groups. We focus on providing high-quality tech education to help students develop valuable skills for the future."
  },
  {
    question: "What courses do you offer?",
    answer: "We offer several courses including: " + courseCatalogs.map(course => course.title).join(", ")
  },
  {
    question: "How can I register for a course?",
    answer: "You can register for a course by clicking the 'Register' button on any course page. Fill out the registration form with your details, and our team will contact you to complete the enrollment process."
  },
  {
    question: "What are your contact details?",
    answer: "You can reach us through our contact form on the website, or email us directly. Our team will respond to your inquiry as soon as possible."
  },
  
  // Generate QA pairs for each course
  ...courseCatalogs.flatMap(course => [
    {
      question: `What is the ${course.title} course about?`,
      answer: course.description
    },
    {
      question: `Tell me about ${course.title}`,
      answer: `${course.title} is a ${course.duration} course designed for ${course.ageGroup}. ${course.description}`
    },
    {
      question: `How much does ${course.title} cost?`,
      answer: `The ${course.title} course costs ${course.price.ugx.toLocaleString()} UGX (${course.price.usd} USD)`
    },
    {
      question: `What are the prerequisites for ${course.title}?`,
      answer: `Prerequisites for ${course.title}: ${course.prerequisites.join(", ")}`
    },
    {
      question: `What will I learn in ${course.title}?`,
      answer: `In ${course.title}, you'll learn: ${course.curriculum.join(", ")}`
    },
    {
      question: `What are the class times for ${course.title}?`,
      answer: `Class periods for ${course.title}: ${course.classPeriods.join("; ")}`
    },
    {
      question: `How long is the ${course.title} course?`,
      answer: `The ${course.title} course duration is ${course.duration}`
    },
    {
      question: `What age group is ${course.title} for?`,
      answer: `${course.title} is designed for ${course.ageGroup}`
    },
    {
      question: `What are the objectives of ${course.title}?`,
      answer: `The main objectives of ${course.title} are: ${course.objectives.map(obj => obj.title + ' - ' + obj.description).join('; ')}`
    }
  ]),
  
  // Additional general questions
  {
    question: "Do you offer online classes?",
    answer: "Yes, we offer both online and in-person classes. The specific format depends on the course and your preferences. You can discuss your preferred mode of learning during registration."
  },
  {
    question: "What is your teaching methodology?",
    answer: "Our teaching methodology combines hands-on practice, interactive learning, and project-based assignments. We focus on practical skills while ensuring students understand the fundamental concepts."
  },
  {
    question: "Do you provide certificates?",
    answer: "Yes, students receive a certificate of completion after successfully finishing their course and demonstrating the required skills."
  }
];
