import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import NeuralNetwork from '../components/NeuralNetwork';
import { useState } from 'react';
import { courseCatalogs, courseCategories } from '../data/courseDetails';
import CourseCatalog from '../components/CourseCatalog';

const Services = () => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleEnroll = (course: any) => {
    setSelectedCourse(course);
    setShowCatalog(true);
  };

  const getCourseCountByCategory = (category: string | null) => {
    return category
      ? courseCatalogs.filter(course => course.category === category).length
      : courseCatalogs.length;
  };

  const filteredCourses = selectedCategory
    ? courseCatalogs.filter(course => course.category === selectedCategory)
    : courseCatalogs;

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

            {/* Category Filter */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span>All Courses</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-full text-sm">
                  {getCourseCountByCategory(null)}
                </span>
              </button>
              {Object.values(courseCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105'
                      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <span>{category}</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded-full text-sm">
                    {getCourseCountByCategory(category)}
                  </span>
                </button>
              ))}
            </motion.div>

            {/* Course Catalog Section */}
            <div className="container mx-auto px-4 py-16">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold text-white text-center mb-8">
                  {selectedCategory ? (
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {selectedCategory}
                    </span>
                  ) : (
                    <Typewriter
                      options={{
                        strings: ['Our Courses', 'Learn with Us'],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  )}
                </h2>

                {filteredCourses.length > 0 ? (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {filteredCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                      >
                        <AnimatedSection delay={index * 0.2}>
                          <div
                            className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl backdrop-blur-sm border border-indigo-500/20 overflow-hidden group hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
                          >
                            <div className="relative h-64 overflow-hidden">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white border border-white/10">
                                {course.category}
                              </div>
                            </div>
                            
                            <div className="p-8">
                              <h3 className="text-2xl font-bold text-white mb-4">{course.title}</h3>
                              <p className="text-gray-300 mb-6">{course.description}</p>
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm text-gray-400">Starting from</p>
                                  <div className="flex gap-3">
                                    <p className="text-lg font-semibold text-indigo-400">
                                      UGX {course.price.ugx.toLocaleString()}
                                    </p>
                                    <p className="text-lg font-semibold text-purple-400">
                                      ${course.price.usd}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleEnroll(course)}
                                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:scale-105"
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </AnimatedSection>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="text-gray-400 text-xl">
                      No courses found in this category.
                    </div>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:scale-105"
                    >
                      View All Courses
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Course Catalog Modal */}
      {showCatalog && selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCatalog(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
              <CourseCatalog
                title={selectedCourse.title}
                description={selectedCourse.description}
                price={selectedCourse.price}
                duration={selectedCourse.duration}
                ageGroup={selectedCourse.ageGroup}
                objectives={selectedCourse.objectives}
                prerequisites={selectedCourse.prerequisites}
                curriculum={selectedCourse.curriculum}
                onClose={() => setShowCatalog(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;