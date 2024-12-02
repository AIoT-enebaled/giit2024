import { motion } from 'framer-motion';
import { Code, Brain, Layout, BookOpen, Users, Trophy, Monitor, UserPlus, Group, Globe } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import NeuralNetwork from '../components/NeuralNetwork';

const Home = () => {
  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Coding Excellence',
      description: 'Learn programming from industry experts',
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI & Innovation',
      description: 'Explore cutting-edge AI technologies',
    },
    {
      icon: <Layout className="h-8 w-8" />,
      title: 'Web Design',
      description: 'Create responsive and modern websites',
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Comprehensive Learning',
      description: 'From basics to advanced concepts',
    },
  ];

  const classFormats = [
    {
      icon: <Globe className="h-12 w-12" />,
      title: 'Remote Classes',
      description: 'Learn from anywhere in the world with our interactive online sessions',
    },
    {
      icon: <UserPlus className="h-12 w-12" />,
      title: 'One-on-One',
      description: 'Personalized attention and customized learning pace',
    },
    {
      icon: <Monitor className="h-12 w-12" />,
      title: 'Physical Classes',
      description: 'Traditional classroom experience with hands-on learning',
    },
    {
      icon: <Group className="h-12 w-12" />,
      title: 'Group Classes',
      description: 'Collaborative learning environment with peer interaction',
    },
  ];

  return (
    <div className="relative">
      <NeuralNetwork />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/50 to-dark" />
          </div>
          
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="text-center mb-16">
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 gradient-text flex items-center justify-center gap-2">
                  <span>Welcome to</span>
                  <Typewriter
                    options={{
                      strings: ['Genius Institute of IT', 'the Future of Learning', 'Innovation', 'Success'],
                      autoStart: true,
                      loop: true,
                      wrapperClassName: "gradient-text",
                      cursorClassName: "text-indigo-400",
                      delay: 50,
                      deleteSpeed: 50,
                    }}
                  />
                </h1>
                <div className="text-3xl lg:text-4xl font-semibold mb-8 text-gray-200 flex items-center justify-center gap-2">
                  <Typewriter
                    options={{
                      strings: [
                        'Learn. Grow. Succeed.',
                        'Discover Your Potential',
                        'Shape Your Future',
                        'Master Technology'
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 75,
                      deleteSpeed: 30,
                      pauseFor: 2500,
                    } as any}
                  />
                </div>
                <p className="text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed mb-12">
                  Transform your passion into expertise with our cutting-edge technology courses and personalized learning paths.
                  Join us on a journey of innovation and excellence in technology education.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/services" className="btn-primary">
                  Explore Our Courses
                </Link>
                <Link to="/contact" className="btn-outline">
                  Get Started
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="mt-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {classFormats.map((format, index) => (
                  <div key={index} className="card p-6 backdrop-blur-sm">
                    <div className="text-indigo-400 mb-4 flex justify-center">
                      {format.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                      {format.title}
                    </h3>
                    <p className="text-gray-400">
                      {format.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold gradient-text mb-4">Why Choose GIIT?</h2>
                <p className="text-indigo-200/80 max-w-2xl mx-auto text-lg">
                  We offer cutting-edge technology education with a focus on practical skills and industry relevance.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <AnimatedSection key={index} delay={index * 0.2}>
                  <div className="card p-6 backdrop-blur-sm">
                    <div className="text-indigo-400 mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection>
                <div className="card p-8 text-center backdrop-blur-sm">
                  <div className="flex justify-center mb-4">
                    <Users className="h-12 w-12 text-indigo-400" />
                  </div>
                  <div className="text-4xl font-bold gradient-text mb-2">50+</div>
                  <div className="text-gray-400">Students Trained</div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="card p-8 text-center backdrop-blur-sm">
                  <div className="flex justify-center mb-4">
                    <BookOpen className="h-12 w-12 text-indigo-400" />
                  </div>
                  <div className="text-4xl font-bold gradient-text mb-2">5+</div>
                  <div className="text-gray-400">Expert Instructors</div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div className="card p-8 text-center backdrop-blur-sm">
                  <div className="flex justify-center mb-4">
                    <Trophy className="h-12 w-12 text-indigo-400" />
                  </div>
                  <div className="text-4xl font-bold gradient-text mb-2">95%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;