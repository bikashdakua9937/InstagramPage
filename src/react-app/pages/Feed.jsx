import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Home, Search, PlusSquare, Heart, User, Send, LogOut } from 'lucide-react';
import { posts, stories } from '@/data/posts';
import Story from '@/react-app/components/Story';
import Post from '@/react-app/components/Post';

export default function FeedPage() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Instagram
          </h1>
          <div className="flex items-center gap-4">
            <Heart className="cursor-pointer hover:scale-110 transition-transform" size={26} />
            <Send className="cursor-pointer hover:scale-110 transition-transform" size={26} />
            <LogOut 
              className="cursor-pointer hover:scale-110 transition-transform text-red-400 hover:text-red-300" 
              size={26}
              onClick={handleLogout}
              title="Logout"
            />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Stories Section */}
          <motion.section
            className="px-4 py-4 border-b border-gray-800 overflow-x-auto scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex gap-4">
              {stories.map((story, index) => (
                <Story key={story.id} story={story} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Posts Section */}
          <section className="px-4 py-6">
            {posts.map((post, index) => (
              <Post key={post.id} post={post} index={index} />
            ))}
          </section>
        </div>
      </main>

      {/* Bottom Navigation */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 bg-black/95 backdrop-blur-sm"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-around">
          <Home className="cursor-pointer hover:scale-110 transition-transform text-purple-400" size={28} />
          <Search className="cursor-pointer hover:scale-110 transition-transform" size={28} />
          <PlusSquare className="cursor-pointer hover:scale-110 transition-transform" size={28} />
          <Heart className="cursor-pointer hover:scale-110 transition-transform" size={28} />
          <User
            className="cursor-pointer hover:scale-110 transition-transform"
            size={28}
            onClick={() => navigate('/profile')}
          />
        </div>
      </motion.nav>
    </div>
  );
}
