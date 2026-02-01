import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function Story({ story, index }) {
  const { username, userAvatar, isViewed, isOwn } = story;

  return (
    <motion.div
      className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Gradient Ring */}
        <div
          className={`w-16 h-16 rounded-full p-[2px] ${
            isViewed
              ? 'bg-gray-600'
              : 'bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500'
          }`}
        >
          <div className="w-full h-full rounded-full bg-black p-[2px]">
            <img
              src={userAvatar}
              alt={username}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Plus Icon for Own Story */}
        {isOwn && (
          <motion.div
            className="absolute bottom-0 right-0 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-black"
            whileHover={{ scale: 1.2 }}
          >
            <Plus size={12} className="text-white" />
          </motion.div>
        )}
      </div>

      {/* Username */}
      <span className="text-xs text-gray-300 truncate max-w-[70px]">
        {isOwn ? 'Your story' : username}
      </span>
    </motion.div>
  );
}
