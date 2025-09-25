import React from 'react';
import { PhoneAuth } from '@/components/PhoneAuth';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    // Redirect will be handled by AuthProvider
    navigate('/');
  };

  return (
    <PhoneAuth onSuccess={handleAuthSuccess} />
  );
};