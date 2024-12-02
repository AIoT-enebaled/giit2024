import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StudentRegistrationForm from './StudentRegistrationForm';
import ParentRegistrationForm from './ParentRegistrationForm';
import CourseCatalog from './CourseCatalog';
import { X, Download } from 'lucide-react';
import { courseCatalogs } from '../data/courseDetails';

interface CourseCardProps {
  title: string;
  description: string;
  price: {
    ugx: number;
    usd: number;
  };
  duration: string;
  ageGroup: string;
  image: string;
  onClose?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  price,
  duration,
  ageGroup,
  image,
  onClose,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [registrationType, setRegistrationType] = useState<'student' | 'parent' | null>(null);

  const courseDetails = courseCatalogs.find(course => course.title === title);

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const handleViewCatalog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCatalog(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRegistrationType(null);
    onClose && onClose();
  };

  const closeCatalog = () => {
    setShowCatalog(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-dark-light rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors duration-300"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative h-48 overflow-hidden rounded-lg mb-6">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 glass-effect text-white px-4 py-1 rounded-full text-sm">
            {ageGroup}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-100 mb-4 gradient-text">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Duration:</span>
            <span className="font-medium text-indigo-300">{duration}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Price:</span>
            <div className="text-right">
              <div className="font-medium text-indigo-300">UGX {price.ugx.toLocaleString()}</div>
              <div className="text-sm text-gray-400">USD ${price.usd}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={handleViewCatalog}
            className="flex-1 btn-outline flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            View Catalog
          </button>
          <button 
            onClick={handleEnroll}
            className="flex-1 btn-primary"
          >
            Enroll Now
          </button>
        </div>

        <AnimatePresence>
          {showModal && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
              onClick={closeModal}
            >
              <div 
                className="relative bg-dark-light rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={stopPropagation}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors duration-300"
                >
                  <X className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold gradient-text mb-6">{title} Registration</h2>
                
                {!registrationType ? (
                  <div className="space-y-4">
                    <button
                      className="w-full btn-primary"
                      onClick={() => setRegistrationType('student')}
                    >
                      Register as Student
                    </button>
                    <button
                      className="w-full btn-outline"
                      onClick={() => setRegistrationType('parent')}
                    >
                      Register Child (Parent Registration)
                    </button>
                  </div>
                ) : registrationType === 'student' ? (
                  <StudentRegistrationForm courseTitle={title} price={price} courses={[title]} onClose={() => setRegistrationType(null)} />
                ) : (
                  <ParentRegistrationForm courseTitle={title} price={price} />
                )}

                {registrationType && (
                  <button
                    className="mt-4 text-gray-400 hover:text-gray-300 transition-colors duration-300"
                    onClick={() => setRegistrationType(null)}
                  >
                    ← Back to registration options
                  </button>
                )}
              </div>
            </div>
          )}

          {showCatalog && courseDetails && (
            <CourseCatalog
              {...courseDetails}
              onClose={closeCatalog}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CourseCard;