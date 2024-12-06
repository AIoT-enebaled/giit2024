import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// Layout component for protected pages
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <ChatBot />
      <Footer />
    </>
  );
};

// Layout component for public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-[#020817]">
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              }
            />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SignInForm />} />

            {/* Protected routes */}
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Services />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <About />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Blog />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <Contact />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/email-templates"
              element={
                <ProtectedRoute>
                  <ProtectedLayout>
                    <EmailTemplates />
                  </ProtectedLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;