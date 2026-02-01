import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Settings, Grid, Bookmark, Users } from 'lucide-react';
import { followers, following } from '@/data/followers';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('followers');
  const [followStates, setFollowStates] = useState(() => {
    const states = {};
    [...followers, ...following].forEach(user => {
      states[user.id] = user.isFollowing;
    });
    return states;
  });

  const handleFollowToggle = (userId) => {
    setFollowStates(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const displayList = activeTab === 'followers' ? followers : following;

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
          <div className="flex items-center gap-3">
            <ArrowLeft
              className="cursor-pointer hover:scale-110 transition-transform"
              size={24}
              onClick={() => navigate('/feed')}
            />
            <h1 className="text-xl font-semibold">your_profile</h1>
          </div>
          <Settings className="cursor-pointer hover:scale-110 transition-transform" size={24} />
        </div>
      </motion.header>

      {/* Profile Info */}
      <motion.div
        className="pt-16 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="py-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-[3px]">
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-black object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xl font-semibold">your_profile</h2>
              </div>
              <div className="flex gap-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold">42</div>
                  <div className="text-gray-400">posts</div>
                </div>
                <div
                  className="text-center cursor-pointer"
                  onClick={() => setActiveTab('followers')}
                >
                  <div className="font-semibold">{followers.length}</div>
                  <div className="text-gray-400">followers</div>
                </div>
                <div
                  className="text-center cursor-pointer"
                  onClick={() => setActiveTab('following')}
                >
                  <div className="font-semibold">{following.length}</div>
                  <div className="text-gray-400">following</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-1">Your Name</div>
            <div className="text-gray-300 text-sm">
              Photography • Travel • Technology
              <br />
              Living my best life 🌟
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-4">
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'followers'
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('followers')}
          >
            Followers
            {activeTab === 'followers' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                layoutId="activeTab"
              />
            )}
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'following'
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('following')}
          >
            Following
            {activeTab === 'following' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                layoutId="activeTab"
              />
            )}
          </button>
        </div>

        {/* Users List */}
        <div className="pb-20">
          {displayList.map((user, index) => (
            <motion.div
              key={user.id}
              className="flex items-center justify-between py-3 hover:bg-gray-900/30 rounded-lg px-2 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-full h-full rounded-full border-2 border-black object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm">{user.username}</div>
                  <div className="text-gray-400 text-xs">{user.name}</div>
                </div>
              </div>
              <motion.button
                className={`px-6 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  followStates[user.id]
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                }`}
                onClick={() => handleFollowToggle(user.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {followStates[user.id] ? 'Following' : 'Follow'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
