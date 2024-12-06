import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import EmailTemplates from './pages/EmailTemplates';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-[#020817]">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/email-templates" element={<EmailTemplates />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/signin" element={<SignInForm />} />
            </Routes>
          </main>
          <ChatBot />
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;