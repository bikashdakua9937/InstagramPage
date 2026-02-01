import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router';
import InstagramLogo from './InstagramLogo';
import { users } from '@/data/users';

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if username or email already exists in hardcoded data
    const existingUser = users.find(
      (u) => u.username === formData.username || u.email === formData.email
    );

    if (existingUser) {
      setError('Username or email already exists. Try logging in instead.');
      return;
    }

    // Create new user and store in localStorage
    const newUser = {
      id: users.length + 1,
      username: formData.username,
      email: formData.email,
      fullName: formData.fullName,
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    setSuccess('Account created successfully!');
    
    setTimeout(() => {
      navigate('/feed');
    }, 800);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = Object.values(formData).every(val => val.trim() !== '');

  return (
    <motion.div
      className="w-full max-w-md mx-auto px-4"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }}
    >
      <div
        className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20"
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 80px rgba(139, 92, 246, 0.3)',
        }}
      >
        <InstagramLogo />

        <motion.p
          className="text-center text-gray-300 mb-6 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Sign up to see photos and videos from your friends.
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300"
              style={{
                boxShadow: focusedInput === 'email' ? '0 0 20px rgba(167, 139, 250, 0.5)' : 'none',
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <label htmlFor="fullName" className="sr-only">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={() => setFocusedInput('fullName')}
              onBlur={() => setFocusedInput(null)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300"
              style={{
                boxShadow: focusedInput === 'fullName' ? '0 0 20px rgba(167, 139, 250, 0.5)' : 'none',
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300"
              style={{
                boxShadow: focusedInput === 'username' ? '0 0 20px rgba(167, 139, 250, 0.5)' : 'none',
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all duration-300 pr-12"
                style={{
                  boxShadow: focusedInput === 'password' ? '0 0 20px rgba(167, 139, 250, 0.5)' : 'none',
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.button
              type="submit"
              disabled={!isFormValid}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              whileHover={isFormValid ? { scale: 1.02 } : {}}
              whileTap={isFormValid ? { scale: 0.98 } : {}}
              style={{
                boxShadow: isFormValid ? '0 0 30px rgba(139, 92, 246, 0.6)' : 'none',
              }}
            >
              {isFormValid && (
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0.5 }}
                  whileHover={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Sign Up</span>
            </motion.button>
          </motion.div>
        </form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <p className="text-gray-400 text-sm">
            Have an account?{' '}
            <motion.button
              onClick={() => navigate('/')}
              className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log in
            </motion.button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
