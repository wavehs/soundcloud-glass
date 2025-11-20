import React from 'react';
import { Home, Radio, Library, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassPanel from './GlassPanel';
import LoginButton from './LoginButton';

interface User {
  username: string;
  avatar_url: string;
}

interface SidebarProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  isLoggingIn: boolean;
}

const Sidebar = ({ user, onLogin, onLogout, isLoggingIn }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Radio, label: 'Stream' }, // Using Radio as a proxy for Stream
    { icon: Library, label: 'Library' },
  ];

  return (
    <GlassPanel className="h-full flex flex-col p-4">
      <div className="mb-8 px-4 pt-2">
        <h1 className="text-xl font-bold text-white tracking-wider">SOUNDCLOUD</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <motion.a
            key={item.label}
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </motion.a>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10">
        {user ? (
          <div className="flex items-center gap-3 px-4 py-3">
            <img src={user.avatar_url} alt={user.username} className="w-8 h-8 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.username}</p>
              <button onClick={onLogout} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 mt-1">
                <LogOut size={12} /> Logout
              </button>
            </div>
          </div>
        ) : (
          <LoginButton onLogin={onLogin} isLoading={isLoggingIn} />
        )}
      </div>
    </GlassPanel>
  );
};

export default Sidebar;
