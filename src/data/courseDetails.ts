interface CourseObjective {
  title: string;
  description: string;
}

interface CourseCatalog {
  id: string;
  title: string;
  description: string;
  price: {
    ugx: number;
    usd: number;
  };
  duration: string;
  ageGroup: string;
  image: string;
  objectives: CourseObjective[];
  prerequisites: string[];
  curriculum: string[];
  classPeriods: string[];
}

export const courseCatalogs: CourseCatalog[] = [
  {
    id: 'scratch-kids',
    title: 'Scratch for Kids',
    description: 'Introduction to programming concepts through fun and interactive projects.',
    price: { ugx: 420000, usd: 114 },
    duration: '2 months',
    ageGroup: 'Ages 6-9',
    image: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg',
    objectives: [
      { title: 'Basic Programming Concepts', description: 'Learn fundamental programming concepts through visual blocks' },
      { title: 'Creative Thinking', description: 'Develop problem-solving and creative thinking skills' },
      { title: 'Interactive Stories', description: 'Create interactive stories and simple animations' },
      { title: 'Game Development', description: 'Build simple games using Scratch' }
    ],
    prerequisites: ['Basic computer skills', 'Ability to read and follow instructions'],
    curriculum: [
      'Introduction to Scratch interface',
      'Working with sprites and backgrounds',
      'Basic motion and control blocks',
      'Creating animations',
      'Building interactive stories',
      'Simple game development',
      'Final project'
    ],
    classPeriods: [
      'Monday & Wednesday: 9:00 AM - 11:00 AM',
      'Tuesday & Thursday: 2:00 PM - 4:00 PM',
      'Saturday: 10:00 AM - 2:00 PM'
    ]
  },
  {
    id: 'web-design',
    title: 'Responsive Web Design',
    description: 'Learn to create modern, responsive websites using HTML, CSS, and JavaScript.',
    price: { ugx: 650000, usd: 175 },
    duration: '2 months',
    ageGroup: 'Ages 10+',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    objectives: [
      { title: 'HTML5 Fundamentals', description: 'Master modern HTML5 markup and semantic elements' },
      { title: 'CSS3 Styling', description: 'Learn advanced CSS3 styling and animations' },
      { title: 'Responsive Design', description: 'Create mobile-friendly responsive layouts' },
      { title: 'JavaScript Basics', description: 'Add interactivity with basic JavaScript' }
    ],
    prerequisites: ['Basic computer skills', 'Understanding of file management'],
    curriculum: [
      'HTML5 structure and elements',
      'CSS3 styling and layouts',
      'Flexbox and Grid systems',
      'Media queries and responsive design',
      'Basic JavaScript concepts',
      'Working with forms',
      'Final project: Personal portfolio'
    ],
    classPeriods: [
      'Monday & Wednesday: 2:00 PM - 4:00 PM',
      'Tuesday & Thursday: 9:00 AM - 11:00 AM',
      'Saturday: 2:00 PM - 6:00 PM'
    ]
  },
  {
    id: 'python-course',
    title: 'Python Full Course',
    description: 'Comprehensive Python programming from basics to advanced concepts.',
    price: { ugx: 3500000, usd: 948 },
    duration: '6 months',
    ageGroup: 'Ages 10+',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    objectives: [
      { title: 'Python Fundamentals', description: 'Master Python syntax and basic programming concepts' },
      { title: 'Data Structures', description: 'Work with lists, dictionaries, and complex data structures' },
      { title: 'Object-Oriented Programming', description: 'Learn OOP principles and implementation in Python' },
      { title: 'Web Development', description: 'Build web applications using Python frameworks' }
    ],
    prerequisites: ['Basic computer skills', 'Logical thinking ability'],
    curriculum: [
      'Python basics and syntax',
      'Control structures and functions',
      'Data structures and algorithms',
      'Object-oriented programming',
      'File handling and databases',
      'Web development with Flask',
      'Final project: Web application'
    ],
    classPeriods: [
      'Monday, Wednesday & Friday: 9:00 AM - 12:00 PM',
      'Tuesday & Thursday: 2:00 PM - 5:00 PM',
      'Saturday: 9:00 AM - 3:00 PM'
    ]
  },
  {
    id: 'javascript-course',
    title: 'JavaScript Full Course',
    description: 'Master JavaScript and modern web development frameworks.',
    price: { ugx: 3500000, usd: 948 },
    duration: '6 months',
    ageGroup: 'Ages 10+',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
    objectives: [
      { title: 'JavaScript Fundamentals', description: 'Master modern JavaScript syntax and concepts' },
      { title: 'DOM Manipulation', description: 'Learn to interact with web pages dynamically' },
      { title: 'Modern Frameworks', description: 'Work with React and other modern frameworks' },
      { title: 'Full Stack Development', description: 'Build complete web applications' }
    ],
    prerequisites: ['HTML & CSS knowledge', 'Basic programming concepts'],
    curriculum: [
      'JavaScript fundamentals',
      'DOM manipulation',
      'Asynchronous programming',
      'React fundamentals',
      'State management',
      'API integration',
      'Final project: Full-stack application'
    ],
    classPeriods: [
      'Monday, Wednesday & Friday: 2:00 PM - 5:00 PM',
      'Tuesday & Thursday: 9:00 AM - 12:00 PM',
      'Saturday: 2:00 PM - 8:00 PM'
    ]
  },
  {
    id: 'ai-course',
    title: 'AI & Machine Learning',
    description: 'Introduction to Artificial Intelligence and Machine Learning concepts.',
    price: { ugx: 1500000, usd: 406 },
    duration: '3 months',
    ageGroup: 'Ages 16+',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    objectives: [
      { title: 'AI Fundamentals', description: 'Understand basic AI concepts and applications' },
      { title: 'Machine Learning', description: 'Learn basic machine learning algorithms' },
      { title: 'Neural Networks', description: 'Introduction to neural networks' },
      { title: 'Practical Applications', description: 'Build simple AI applications' }
    ],
    prerequisites: ['Python programming', 'Basic mathematics and statistics'],
    curriculum: [
      'Introduction to AI concepts',
      'Machine learning basics',
      'Supervised learning',
      'Neural networks introduction',
      'Computer vision basics',
      'Natural language processing',
      'Final project: AI application'
    ],
    classPeriods: [
      'Monday & Wednesday: 4:00 PM - 7:00 PM',
      'Tuesday & Thursday: 5:00 PM - 8:00 PM',
      'Saturday: 1:00 PM - 7:00 PM'
    ]
  }
];