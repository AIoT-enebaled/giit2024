import { motion } from 'framer-motion';
import { Users, Award, Target, BookOpen, Globe, UserPlus, Monitor, Group } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import NeuralNetwork from '../components/NeuralNetwork';

const About = () => {
  const values = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Student-Centered',
      description: "We prioritize our students' needs and learning journey.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do.',
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Innovation',
      description: 'We embrace new technologies and teaching methods.',
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Continuous Learning',
      description: 'We believe in lifelong learning and growth.',
    },
  ];

  const classFormats = [
    {
      icon: <Globe className="h-12 w-12" />,
      title: 'Remote Classes',
      description: 'Learn from anywhere in the world with our interactive online sessions.',
    },
    {
      icon: <UserPlus className="h-12 w-12" />,
      title: 'One-on-One',
      description: 'Get personalized attention and learn at your own pace.',
    },
    {
      icon: <Monitor className="h-12 w-12" />,
      title: 'Physical Classes',
      description: 'Traditional classroom experience with hands-on learning.',
    },
    {
      icon: <Group className="h-12 w-12" />,
      title: 'Group Classes',
      description: 'Learn collaboratively in small groups, sharing ideas.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white"
    >
      {/* Hero Section with Neural Network */}
      <div className="relative h-[500px] overflow-hidden">
        <NeuralNetwork />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              About GiiT
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-200"
            >
              <Typewriter
                options={{
                  strings: [
                    'Empowering Future Tech Leaders',
                    'Building Tomorrow\'s Innovators',
                    'Creating Digital Excellence'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-8 rounded-2xl backdrop-blur-sm border border-indigo-500/20"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-gray-300 leading-relaxed">
                To provide high-quality technology education that empowers individuals to succeed in the digital age through practical skills, innovative teaching methods, and industry-relevant curriculum.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-8 rounded-2xl backdrop-blur-sm border border-indigo-500/20"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Our Vision
              </h2>
              <p className="text-gray-300 leading-relaxed">
                To be the leading technology education institute in East Africa, recognized for excellence in teaching, innovation, and producing skilled professionals who drive technological advancement.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          >
            Our Core Values
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, _index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 rounded-xl backdrop-blur-sm border border-indigo-500/20
                         hover:border-indigo-500/40 transition-all duration-300 group"
              >
                <div className="text-indigo-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-gray-100">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-center">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Learning Formats Section */}
      <section className="py-20 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          >
            Learning Formats
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {classFormats.map((format, _index) => (
              <motion.div
                key={format.title}
                variants={itemVariants}
                className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 rounded-xl backdrop-blur-sm border border-indigo-500/20
                         hover:border-indigo-500/40 transition-all duration-300 group"
              >
                <div className="text-indigo-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {format.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center text-gray-100">
                  {format.title}
                </h3>
                <p className="text-gray-400 text-center">
                  {format.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 relative z-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join us and transform your passion for technology into expertise.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
                       text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300
                       shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;