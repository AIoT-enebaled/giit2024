import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import NeuralNetwork from '../components/NeuralNetwork';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const Contact = () => {
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
                Contact Us
              </h1>
              <div className="text-xl text-gray-300">
                <Typewriter
                  options={{
                    strings: ['Get in Touch', 'Start Your Journey', 'Join Our Community'],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 rounded-xl backdrop-blur-sm border border-indigo-500/20">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-100">Get in Touch</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-gray-300">
                      <Mail className="text-indigo-400" size={24} />
                      <span>geniusinstitute2024@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <Phone className="text-indigo-400" size={24} />
                      <span>+256 745 695 576</span>
                      <span>+256 752 067 815</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <MapPin className="text-indigo-400" size={24} />
                      <span>123 Technology Street<br />Kampala, Uganda</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-300">
                      <Clock className="text-indigo-400" size={24} />
                      <span>Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 rounded-xl backdrop-blur-sm border border-indigo-500/20">
                <h2 className="text-2xl font-semibold mb-6 text-gray-100">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-2 rounded-lg bg-black/50 border border-indigo-500/20 text-gray-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-2 rounded-lg bg-black/50 border border-indigo-500/20 text-gray-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-black/50 border border-indigo-500/20 text-gray-300 focus:outline-none focus:border-indigo-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;