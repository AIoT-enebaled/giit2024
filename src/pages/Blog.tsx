import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import NeuralNetwork from '../components/NeuralNetwork';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const Blog = () => {
  const blogPosts = [
    {
      title: 'Getting Started with Python Programming',
      excerpt: "Learn the basics of Python programming and why it is perfect for beginners.",
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80',
      date: '2024-02-20',
      author: 'John Doe',
      category: 'Programming',
    },
    {
      title: 'Web Design Trends in 2024',
      excerpt: 'Explore the latest trends in web design and how to implement them.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80',
      date: '2024-02-18',
      author: 'Jane Smith',
      category: 'Design',
    },
    {
      title: 'Machine Learning Fundamentals',
      excerpt: 'Understanding the basic concepts of machine learning and AI.',
      image: 'https://images.unsplash.com/photo-1485796826113-174aa68fd81b?auto=format&fit=crop&q=80',
      date: '2024-02-15',
      author: 'Mike Johnson',
      category: 'AI & ML',
    },
  ];

  return (
    <div className="min-h-screen bg-[#020817]">
      {/* Neural Network Background */}
      <NeuralNetwork />
      
      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Blog & Articles
              </h1>
              <div className="text-xl text-gray-300">
                <Typewriter
                  options={{
                    strings: ['Latest Tech News', 'Programming Insights', 'Industry Updates'],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                />
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl backdrop-blur-sm border border-indigo-500/20 overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 text-gray-100">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <button className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
                      <span>Read More</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;