import CourseCard from '../components/CourseCard';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import NeuralNetwork from '../components/NeuralNetwork';
import { useState } from 'react';

const Services = () => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const courses = [
    {
      title: 'Scratch for Kids',
      description: 'Introduction to programming concepts through fun and interactive projects.',
      price: { ugx: 420000, usd: 114 },
      duration: '2 months',
      ageGroup: 'Ages 6-9',
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80',
    },
    {
      title: 'Responsive Web Design',
      description: 'Learn to create modern, responsive websites using HTML, CSS, and JavaScript.',
      price: { ugx: 650000, usd: 176 },
      duration: '2 months',
      ageGroup: 'Ages 13+',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80',
    },
    {
      title: 'Python Programming',
      description: 'Master Python programming through hands-on projects and real-world applications.',
      price: { ugx: 3500000, usd: 950 },
      duration: '4 months',
      ageGroup: 'Ages 14+',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80',
    },
    {
      title: 'AI & Machine Learning',
      description: 'Explore artificial intelligence and machine learning fundamentals.',
      price: { ugx: 2150000, usd: 584 },
      duration: '3 months',
      ageGroup: 'Ages 16+',
      image: 'https://images.unsplash.com/photo-1485796826113-174aa68fd81b?auto=format&fit=crop&q=80',
    },
  ];

  const handleEnroll = (course: any) => {
    setSelectedCourse(course);
    setShowCatalog(true);
  };

  return (
    <div className="min-h-screen bg-[#020817]">
      {/* Neural Network Background */}
      <NeuralNetwork />
      
      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Our Services
                </h1>
                <div className="text-xl text-gray-300">
                  <Typewriter
                    options={{
                      strings: ['Transform Your Skills', 'Build Your Future', 'Learn from Experts'],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                    }}
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {courses.map((course, index) => (
                <AnimatedSection key={index} delay={index * 0.2}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl backdrop-blur-sm border border-indigo-500/20 overflow-hidden group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold mb-3 text-gray-100">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-6 text-lg">
                        {course.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-gray-300 mb-6">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-indigo-400">Duration:</span>
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-indigo-400">Age Group:</span>
                            <span>{course.ageGroup}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl text-indigo-400">UGX {course.price.ugx.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">USD ${course.price.usd}</div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleEnroll(course)}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-lg"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Catalog Modal */}
      {showCatalog && selectedCourse && (
        <CourseCard
          title={selectedCourse.title}
          description={selectedCourse.description}
          price={selectedCourse.price}
          duration={selectedCourse.duration}
          ageGroup={selectedCourse.ageGroup}
          image={selectedCourse.image}
          onClose={() => setShowCatalog(false)}
        />
      )}
    </div>
  );
};

export default Services;