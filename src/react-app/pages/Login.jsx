import { motion } from 'framer-motion';
import AnimatedBackground from '@/react-app/components/AnimatedBackground';
import LoginForm from '@/react-app/components/LoginForm';
import PhoneMockup from '@/react-app/components/PhoneMockup';

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <AnimatedBackground />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="flex items-center justify-center gap-16">
          {/* Phone Mockup */}
          <PhoneMockup />
          
          {/* Login Form */}
          <div className="flex-1 max-w-md">
            <LoginForm />
          </div>
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
