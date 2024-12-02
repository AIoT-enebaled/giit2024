import React, { useState } from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ParentRegistrationForm from './ParentRegistrationForm';
import StudentRegistrationForm from './StudentRegistrationForm';
import TypewriterEffect from './TypewriterEffect';

interface CourseObjective {
  title: string;
  description: string;
}

interface CourseCatalogProps {
  title: string;
  description: string;
  price: {
    ugx: number;
    usd: number;
  };
  duration: string;
  ageGroup: string;
  objectives: CourseObjective[];
  prerequisites: string[];
  curriculum: string[];
  onClose: () => void;
}

const CourseCatalog: React.FC<CourseCatalogProps> = ({
  title,
  description,
  price,
  duration,
  ageGroup,
  objectives,
  prerequisites,
  curriculum,
  onClose,
}) => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationType, setRegistrationType] = useState<'student' | 'parent'>('student');

  const handleEnroll = () => {
    setShowRegistrationForm(true);
  };

  const handleRegistrationClose = () => {
    setShowRegistrationForm(false);
  };

  const handleRegistrationTypeChange = (type: 'student' | 'parent') => {
    setRegistrationType(type);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('course-details');
    if (input) {
      html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#1a1a2e',
        logging: false,
        width: input.scrollWidth,
        height: input.scrollHeight,
        windowWidth: 1024, // Set a fixed width for consistent rendering
        onclone: (document) => {
          const clone = document.getElementById('course-details');
          if (clone) {
            // Apply specific styles for PDF generation
            clone.style.padding = '20px';
            clone.style.width = '1024px'; // Fixed width for better readability
            clone.style.color = '#ffffff';
            clone.style.background = 'linear-gradient(to bottom, #1a1a2e, #2a2a4e)';
            
            // Adjust font sizes for better readability
            const headings = clone.getElementsByTagName('h2');
            for (let i = 0; i < headings.length; i++) {
              headings[i].style.fontSize = '24px';
            }
            
            const paragraphs = clone.getElementsByTagName('p');
            for (let i = 0; i < paragraphs.length; i++) {
              paragraphs[i].style.fontSize = '14px';
            }
          }
        }
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: 'a4',
          compress: true
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        
        // Calculate optimal scale to fit content on A4
        const scale = Math.min(
          pdfWidth / imgWidth,
          pdfHeight / imgHeight
        );
        
        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;
        
        // Center the content
        const marginX = (pdfWidth - scaledWidth) / 2;
        const marginY = (pdfHeight - scaledHeight) / 2;

        // Add header
        pdf.setFillColor(26, 26, 46);
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

        // Add decorative elements
        pdf.setDrawColor(79, 70, 229); // indigo-600
        pdf.setLineWidth(0.5);
        pdf.line(10, 10, pdfWidth - 10, 10);
        pdf.line(10, pdfHeight - 10, pdfWidth - 10, pdfHeight - 10);

        // Add logo and title
        pdf.setFontSize(24);
        pdf.setTextColor(255, 255, 255);
        pdf.text('GIIT', 10, 20);
        
        pdf.setFontSize(20);
        pdf.setTextColor(147, 197, 253); // blue-300
        pdf.text(`${title} Course Details`, pdfWidth / 2, 20, { align: 'center' });

        // Add main content with proper scaling
        pdf.addImage(
          imgData,
          'PNG',
          marginX,
          marginY,
          scaledWidth,
          scaledHeight
        );

        // Add footer
        pdf.setFontSize(10);
        pdf.setTextColor(156, 163, 175); // gray-400
        pdf.text(
          'Genius Institute of Information Technology',
          pdfWidth / 2,
          pdfHeight - 15,
          { align: 'center' }
        );
        pdf.text(
          `Generated on ${new Date().toLocaleDateString()}`,
          pdfWidth / 2,
          pdfHeight - 10,
          { align: 'center' }
        );

        // Save the PDF
        pdf.save(`${title}_Course_Details.pdf`);
      });
    }
  };

  const handleDownload = () => {
    console.log('Download button clicked');
    // Add download logic here, e.g., download course materials
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-dark-light rounded-xl p-4 sm:p-6 md:p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="course-catalog-container">
          <div className="typewriter-container">
            <TypewriterEffect 
              texts={[
                `Welcome to ${title} Course`,
                `Discover ${title} Learning`,
                `Transform Your Skills with ${title}`
              ]} 
              speed={100} 
              delay={2000} 
              className="typewriter-title"
            />
          </div>
          {showRegistrationForm && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative bg-dark-light rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    Course Registration
                  </h2>
                  <p className="text-gray-400 mt-2">Choose your registration type</p>
                </div>
                
                <div className="flex justify-center gap-4 mb-8">
                  <button
                    onClick={() => handleRegistrationTypeChange('student')}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                      registrationType === 'student'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Register as Student
                    </span>
                  </button>
                  <button
                    onClick={() => handleRegistrationTypeChange('parent')}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                      registrationType === 'parent'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Register Children
                    </span>
                  </button>
                </div>

                <div className="mt-4">
                  {registrationType === 'student' && (
                    <StudentRegistrationForm 
                      onClose={handleRegistrationClose} 
                      courseTitle={title}
                      price={{ ugx: price.ugx, usd: price.usd }}
                      courses={[title]}
                    />
                  )}
                  {registrationType === 'parent' && (
                    <ParentRegistrationForm 
                      onClose={handleRegistrationClose}
                      courseTitle={title}
                      price={{ ugx: price.ugx, usd: price.usd }}
                      courses={[title]}
                    />
                  )}
                </div>

                <button
                  onClick={handleRegistrationClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </div>
          )}
          <div className="flex flex-wrap justify-end gap-2 p-4">
            <button onClick={handleEnroll} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
              Enroll
            </button>
            <button onClick={handleDownloadPDF} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Download PDF
            </button>
            <button onClick={handleDownload} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-200 transition-colors duration-300"
            >
              ×
            </button>
          </div>

          <div id="course-catalog" className="bg-[#1a1a1a] text-[#f0f0f0] p-4 sm:p-5 rounded-[8px]">
            <div id="course-header" className="text-center mb-5 text-2xl">
              {title} Course Catalog
            </div>
            <div id="course-details" className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-2">
                    {title}
                  </h2>
                  <p className="text-gray-400 text-lg">{description}</p>
                </div>
                <button 
                  onClick={handleDownloadPDF} 
                  className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
                  title="Download Course Details"
                >
                  <Download className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-indigo-400 mb-2">Duration</h3>
                  <p className="text-gray-300">{duration}</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-indigo-400 mb-2">Age Group</h3>
                  <p className="text-gray-300">{ageGroup}</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold text-indigo-400 mb-2">Price</h3>
                  <p className="text-gray-300">
                    <span className="block">UGX {price.ugx.toLocaleString()}</span>
                    <span className="block">USD ${price.usd}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-indigo-400 mb-4">Learning Objectives</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {objectives.map((objective, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-800/30 p-4 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white mb-1">{objective.title}</h4>
                          <p className="text-gray-400 text-sm">{objective.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-indigo-400 mb-4">Prerequisites</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-indigo-400 mb-4">Curriculum</h3>
                  <div className="bg-gray-800/30 rounded-lg p-6">
                    <ul className="space-y-4">
                      {curriculum.map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div id="course-contact" className="mt-8 p-4 bg-gray-800/30 rounded-lg space-y-2">
              <h3 className="text-xl font-semibold text-indigo-400 mb-4">Contact Information</h3>
              <p className="text-gray-300">Contact Genius Institute</p>
              <p className="text-gray-300">Email: geniusinstitute2024@gmail.com</p>
              <p className="text-gray-300">Website: www.geniusinstituteofit.org</p>
              <p className="text-gray-300">WhatsApp: +256 752 067 815</p>
            </div>
            <div className="pb-4"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseCatalog;