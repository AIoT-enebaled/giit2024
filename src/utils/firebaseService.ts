import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfXqFxDrAVRQhEgmSQQKsYGZWWXHxFmLU",
  authDomain: "giit2024.firebaseapp.com",
  projectId: "giit2024",
  storageBucket: "giit2024.appspot.com",
  messagingSenderId: "795835746549",
  appId: "1:795835746549:web:4f0b3e4c9c0e5c2d9c6f0a"
};

// Initialize Firebase
let app;
let db: Firestore;
let isInitialized = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  isInitialized = true;
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export interface RegistrationData {
  to_name: string;
  to_email: string;
  course_title: string;
  class_type: string;
  class_mode: string;
  student_name?: string;
  student_age?: string;
  parent_name?: string;
  contact?: string;
  education?: string;
  previous_coding?: string;
}

export async function submitRegistration(data: RegistrationData): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isInitialized || !db) {
      throw new Error('Firebase is not properly initialized');
    }

    console.log('Starting registration process with data:', JSON.stringify(data, null, 2));
    
    // Validate input data
    if (!data.to_email || !data.to_name || !data.course_title) {
      throw new Error('Missing required fields: email, name, or course title');
    }

    // Add timestamp and metadata
    const registrationData = {
      ...data,
      timestamp: Timestamp.now(),
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // Save to Firestore
    const registrationsRef = collection(db, 'registrations');
    const docRef = await addDoc(registrationsRef, registrationData);
    
    console.log('Registration submitted successfully with ID:', docRef.id);

    return {
      success: true
    };
  } catch (error) {
    console.error('Failed to submit registration:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return {
      success: false,
      error: `Registration failed: ${errorMessage}`
    };
  }
}