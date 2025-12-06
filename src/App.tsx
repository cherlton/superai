import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  LandingPage,
  LoginPage,
  SignUpPage,
  ForgotPasswordPage,
  ContactPage
} from './Pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;