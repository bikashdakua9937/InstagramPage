import { motion } from 'framer-motion';
import AnimatedBackground from '@/react-app/components/AnimatedBackground';
import SignupForm from '@/react-app/components/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <AnimatedBackground />
      </motion.div>

      <motion.div
        className="relative z-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <SignupForm />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}
