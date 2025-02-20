interface CourseObjective {
  title: string;
  description: string;
}

interface CourseCatalog {
  id: string;
  title: string;
  description: string;
  category: string;
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

export const courseCategories = {
  FUNDAMENTALS: 'Computer Fundamentals',
  PROGRAMMING_KIDS: 'Programming for Kids',
  WEB_DEVELOPMENT: 'Web Development',
  PROGRAMMING: 'Programming Languages',
  AI_ML: 'AI & Machine Learning',
  THINKING_SKILLS: 'Thinking & Innovation',
  CONSULTATION: 'Business Consultation'
} as const;

export const courseCatalogs: CourseCatalog[] = [
  {
    id: 'computer-training',
    title: 'Computer Training',
    category: courseCategories.FUNDAMENTALS,
    description: 'Comprehensive computer training course covering essential computer skills and digital literacy.',
    price: { ugx: 350000, usd: 95 },
    duration: '1 month',
    ageGroup: 'Ages 6+',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    objectives: [
      { title: 'Computer Basics', description: 'Learn fundamental computer operations and terminology' },
      { title: 'Digital Literacy', description: 'Develop essential digital skills for modern computing' },
      { title: 'Software Applications', description: 'Master common software applications and tools' },
      { title: 'Internet Skills', description: 'Learn safe internet usage and basic web navigation' }
    ],
    prerequisites: ['No prior experience required'],
    curriculum: [
      'Introduction to computers and operating systems',
      'Basic hardware components and their functions',
      'File management and organization',
      'Microsoft Office basics (Word, Excel, PowerPoint)',
      'Internet browsing and online safety',
      'Email communication',
      'Basic troubleshooting',
      'Final assessment project'
    ],
    classPeriods: [
      'Monday to Friday: 9:00 AM - 11:00 AM',
      'Monday to Friday: 2:00 PM - 4:00 PM',
      'Saturday: 10:00 AM - 2:00 PM'
    ]
  },
  {
    id: 'scratch-kids',
    title: 'Scratch for Kids',
    category: courseCategories.PROGRAMMING_KIDS,
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
    category: courseCategories.WEB_DEVELOPMENT,
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
    category: courseCategories.PROGRAMMING,
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
    category: courseCategories.PROGRAMMING,
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
    category: courseCategories.AI_ML,
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
  },
  {
    id: 'innovation-creativity',
    title: 'Innovation and Creativity',
    category: courseCategories.THINKING_SKILLS,
    description: 'Develop innovative thinking and creative problem-solving skills for the modern world.',
    price: { ugx: 450000, usd: 122 },
    duration: '2 months',
    ageGroup: 'Ages 6+',
    image: 'https://images.pexels.com/photos/7376/startup-photos.jpg',
    objectives: [
      { title: 'Creative Thinking', description: 'Develop creative thinking and ideation skills' },
      { title: 'Problem Solving', description: 'Learn effective problem-solving techniques' },
      { title: 'Innovation Process', description: 'Understand the innovation process and methodologies' },
      { title: 'Project Development', description: 'Create and develop innovative projects' }
    ],
    prerequisites: ['No prior experience required'],
    curriculum: [
      'Introduction to creativity and innovation',
      'Creative thinking techniques',
      'Problem-solving methodologies',
      'Innovation process and frameworks',
      'Project ideation and development',
      'Presentation skills',
      'Final innovation project'
    ],
    classPeriods: [
      'Monday & Wednesday: 9:00 AM - 11:00 AM',
      'Tuesday & Thursday: 2:00 PM - 4:00 PM',
      'Saturday: 10:00 AM - 2:00 PM'
    ]
  },
  {
    id: 'critical-thinking',
    title: 'Critical Thinking',
    category: courseCategories.THINKING_SKILLS,
    description: 'Master the art of analytical and critical thinking for better decision making.',
    price: { ugx: 450000, usd: 122 },
    duration: '2 months',
    ageGroup: 'Ages 6+',
    image: 'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg',
    objectives: [
      { title: 'Analytical Skills', description: 'Develop strong analytical and logical thinking' },
      { title: 'Decision Making', description: 'Learn effective decision-making processes' },
      { title: 'Problem Analysis', description: 'Master problem analysis and evaluation' },
      { title: 'Logical Reasoning', description: 'Enhance logical reasoning capabilities' }
    ],
    prerequisites: ['No prior experience required'],
    curriculum: [
      'Introduction to critical thinking',
      'Logical reasoning and analysis',
      'Decision-making frameworks',
      'Problem analysis techniques',
      'Evidence evaluation',
      'Argument construction',
      'Final critical analysis project'
    ],
    classPeriods: [
      'Monday & Wednesday: 2:00 PM - 4:00 PM',
      'Tuesday & Thursday: 9:00 AM - 11:00 AM',
      'Saturday: 2:00 PM - 6:00 PM'
    ]
  },
  {
    id: 'design-thinking',
    title: 'Design Thinking',
    category: courseCategories.THINKING_SKILLS,
    description: 'Learn human-centered approach to innovation and problem solving.',
    price: { ugx: 450000, usd: 122 },
    duration: '2 months',
    ageGroup: 'Ages 6+',
    image: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg',
    objectives: [
      { title: 'Design Process', description: 'Master the design thinking process' },
      { title: 'User Research', description: 'Learn effective user research methods' },
      { title: 'Prototyping', description: 'Develop prototyping and testing skills' },
      { title: 'Solution Design', description: 'Create user-centered solutions' }
    ],
    prerequisites: ['No prior experience required'],
    curriculum: [
      'Introduction to design thinking',
      'Empathy and user research',
      'Problem definition',
      'Ideation techniques',
      'Prototyping methods',
      'Testing and iteration',
      'Final design project'
    ],
    classPeriods: [
      'Monday & Wednesday: 9:00 AM - 11:00 AM',
      'Tuesday & Thursday: 2:00 PM - 4:00 PM',
      'Saturday: 10:00 AM - 2:00 PM'
    ]
  },
  {
    id: 'ai-consultation',
    title: 'AI Consultation',
    category: courseCategories.CONSULTATION,
    description: 'Expert consultation on artificial intelligence implementation and strategy.',
    price: { ugx: 150000, usd: 41 },
    duration: '1 hour',
    ageGroup: 'Business Owners',
    image: 'https://images.pexels.com/photos/8353802/pexels-photo-8353802.jpeg',
    objectives: [
      { title: 'AI Assessment', description: 'Evaluate AI opportunities in your business' },
      { title: 'Strategy Development', description: 'Create an AI implementation strategy' },
      { title: 'Technology Selection', description: 'Choose the right AI technologies' },
      { title: 'Implementation Planning', description: 'Plan for successful AI integration' }
    ],
    prerequisites: ['Must be a business owner or decision maker'],
    curriculum: [
      'Business needs assessment',
      'AI opportunity identification',
      'Technology stack evaluation',
      'Implementation strategy',
      'Resource planning',
      'Risk assessment',
      'Action plan development'
    ],
    classPeriods: [
      'Monday to Friday: 9:00 AM - 5:00 PM (By appointment)',
      'Saturday: 10:00 AM - 2:00 PM (By appointment)'
    ]
  },
  {
    id: 'ai-business',
    title: 'AI in Business Consultation',
    category: courseCategories.CONSULTATION,
    description: 'Strategic consultation on leveraging AI for business growth and optimization.',
    price: { ugx: 150000, usd: 41 },
    duration: '1 hour',
    ageGroup: 'Business Owners',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
    objectives: [
      { title: 'Business Analysis', description: 'Analyze business processes for AI integration' },
      { title: 'ROI Assessment', description: 'Evaluate potential return on AI investment' },
      { title: 'Process Optimization', description: 'Identify processes for AI automation' },
      { title: 'Growth Strategy', description: 'Develop AI-driven growth strategies' }
    ],
    prerequisites: ['Must be a business owner or decision maker'],
    curriculum: [
      'Business process analysis',
      'AI application assessment',
      'Cost-benefit analysis',
      'Implementation roadmap',
      'Change management strategy',
      'ROI projection',
      'Action plan development'
    ],
    classPeriods: [
      'Monday to Friday: 9:00 AM - 5:00 PM (By appointment)',
      'Saturday: 10:00 AM - 2:00 PM (By appointment)'
    ]
  }
];