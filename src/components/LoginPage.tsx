import React from 'react';
import { PhoneAuth } from '@/components/PhoneAuth';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    // Redirect to dashboard after successful login
    navigate('/dashboard');
  };

  return (
    <PhoneAuth onSuccess={handleAuthSuccess} />
  );
};