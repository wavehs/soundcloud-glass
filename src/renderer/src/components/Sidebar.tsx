import React from 'react';
import { Home, Radio, Library } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassPanel from './GlassPanel';

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Radio, label: 'Stream' }, // Using Radio as a proxy for Stream
    { icon: Library, label: 'Library' },
  ];

  return (
    <GlassPanel className="h-full flex flex-col p-4">
      <div className="mb-8 px-4 pt-2">
        <h1 className="text-xl font-bold text-white tracking-wider">APP NAME</h1>
      </div>

      <nav className="space-y-2">
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
    </GlassPanel>
  );
};

export default Sidebar;
