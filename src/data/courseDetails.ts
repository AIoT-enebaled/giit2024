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
}

export const courseCatalogs: CourseCatalog[] = [
  {
    id: 'scratch-kids',
    title: 'Scratch for Kids',
    description: 'Introduction to programming concepts through fun and interactive projects.',
    price: { ugx: 420000, usd: 114 },
    duration: '2 months',
    ageGroup: 'Ages 6-9',
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80',
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
    ]
  },
  {
    id: 'web-design',
    title: 'Responsive Web Design',
    description: 'Learn to create modern, responsive websites using HTML, CSS, and JavaScript.',
    price: { ugx: 550000, usd: 149 },
    duration: '2 months',
    ageGroup: 'Ages 10+',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80',
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
    ]
  },
  {
    id: 'python-course',
    title: 'Python Full Course',
    description: 'Comprehensive Python programming from basics to advanced concepts.',
    price: { ugx: 3500000, usd: 948 },
    duration: '6 months',
    ageGroup: 'Ages 10+',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80',
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
    ]
  },
  {
    id: 'javascript-course',
    title: 'JavaScript Full Course',
    description: 'Master JavaScript and modern web development frameworks.',
    price: { ugx: 3500000, usd: 948 },
    duration: '6 months',
    ageGroup: 'Ages 10+',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80',
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
    ]
  },
  {
    id: 'ai-course',
    title: 'AI Short Course',
    description: 'Introduction to artificial intelligence and machine learning concepts.',
    price: { ugx: 1500000, usd: 406 },
    duration: '3 months',
    ageGroup: 'Ages 16+',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
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
    ]
  }
];