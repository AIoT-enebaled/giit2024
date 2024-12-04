import { courseCatalogs } from '../data/courseDetails';

// Generate QA pairs from course data
export const trainingData = [
  // General questions
  {
    question: "What is GiiT?",
    answer: "GiiT is an educational platform that offers various programming and technology courses for different age groups."
  },
  {
    question: "What courses do you offer?",
    answer: "We offer several courses including: " + courseCatalogs.map(course => course.title).join(", ")
  },
  
  // Generate QA pairs for each course
  ...courseCatalogs.flatMap(course => [
    {
      question: `What is the ${course.title} course about?`,
      answer: course.description
    },
    {
      question: `How much does ${course.title} cost?`,
      answer: `The ${course.title} course costs ${course.price.ugx} UGX (${course.price.usd} USD)`
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
    }
  ])
];
