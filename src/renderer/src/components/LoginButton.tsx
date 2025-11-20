import React from 'react';
import { LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginButtonProps {
  onLogin: () => void;
  isLoading?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin, isLoading }) => {
  return (
    <motion.button
      onClick={onLogin}
      disabled={isLoading}
      className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white rounded-lg transition-colors w-full mt-auto"
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.95 }}
    >
      <LogIn size={20} />
      <span className="font-medium">{isLoading ? 'Connecting...' : 'Login with SoundCloud'}</span>
    </motion.button>
  );
};

export default LoginButton;
