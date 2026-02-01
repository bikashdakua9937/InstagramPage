import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export default function InstagramLogo() {
  return (
    <motion.div
      className="flex items-center justify-center gap-3 mb-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      {/* Animated Camera Icon */}
      <motion.div
        className="relative"
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 relative overflow-hidden"
          animate={{
            boxShadow: [
              '0 0 20px rgba(168, 85, 247, 0.4)',
              '0 0 40px rgba(236, 72, 153, 0.6)',
              '0 0 20px rgba(168, 85, 247, 0.4)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
          <Camera className="text-white relative z-10" size={28} />
        </motion.div>
      </motion.div>

      {/* Instagram Text with Gradient */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: '200% 200%',
          fontFamily: "'Pacifico', cursive",
        }}
      >
        Instagram
      </motion.h1>
    </motion.div>
  );
}
