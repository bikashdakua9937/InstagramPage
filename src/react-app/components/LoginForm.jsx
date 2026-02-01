import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router';
import InstagramLogo from './InstagramLogo';
import { users } from '@/data/users';

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = (e) => {
  e.preventDefault();

  // optional: basic empty check
  if (!username || !password) {
    setError('Please enter username and password');
    return;
  }

  // store whatever user entered (optional)
  localStorage.setItem(
    'user',
    JSON.stringify({
      username: username,
    })
  );

  setSuccess('Login successful!');

  setTimeout(() => {
    navigate('/feed');
  }, 500);
};

  const handleFacebookLogin = () => {
    setError('Facebook login is for UI demonstration only. Use demo/password to login.');
  };

  const isFormValid = username.trim() !== '' && password.trim() !== '';

  return (
    <motion.div
      className="w-full max-w-md mx-auto px-4"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
    >
      {/* Login Card with Glassmorphism */}
      <div
        className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20"
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 80px rgba(139, 92, 246, 0.3)',
        }}
      >
        <InstagramLogo />

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <label htmlFor="username" className="sr-only">Username or Email</label>
            <div className="relative">
              <input
                id="username"
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedInput('username')}
                onBlur={() => setFocusedInput(null)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300"
                style={{
                  boxShadow: focusedInput === 'username' 
                    ? '0 0 20px rgba(167, 139, 250, 0.5)' 
                    : 'none',
                }}
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300 pr-12"
                style={{
                  boxShadow: focusedInput === 'password' 
                    ? '0 0 20px rgba(167, 139, 250, 0.5)' 
                    : 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-2"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 text-sm text-center bg-green-500/10 border border-green-500/20 rounded-lg p-2"
            >
              {success}
            </motion.div>
          )}

          {/* Login Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.button
              type="submit"
              disabled={!isFormValid}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              whileHover={isFormValid ? { scale: 1.02 } : {}}
              whileTap={isFormValid ? { scale: 0.98 } : {}}
              style={{
                boxShadow: isFormValid
                  ? '0 0 30px rgba(139, 92, 246, 0.6)'
                  : 'none',
              }}
            >
              {/* Ripple Effect Layer */}
              {isFormValid && (
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0.5 }}
                  whileHover={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Log In</span>
            </motion.button>
          </motion.div>
        </form>

        {/* OR Divider */}
        <motion.div
          className="my-6 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-gray-400 text-sm font-semibold">OR</span>
          <div className="flex-1 h-px bg-white/20" />
        </motion.div>

        {/* Facebook Login */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <motion.button
            onClick={handleFacebookLogin}
            className="w-full py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 relative overflow-hidden flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              boxShadow: '0 0 20px rgba(37, 99, 235, 0.5)',
            }}
          >
            <Facebook size={20} fill="currentColor" />
            <span>Log in with Facebook</span>
          </motion.button>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <motion.button
              onClick={() => navigate('/signup')}
              className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign up for Instagram
            </motion.button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
