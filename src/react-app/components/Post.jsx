import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

export default function Post({ post, index }) {
  const { username, userAvatar, postImage, likes, caption, timestamp, comments } = post;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleDoubleClick = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <motion.article
      className="bg-black border border-gray-800 rounded-lg overflow-hidden mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 p-[2px]">
            <img
              src={userAvatar}
              alt={username}
              className="w-full h-full rounded-full border-2 border-black object-cover"
            />
          </div>
          <span className="font-semibold text-sm">{username}</span>
        </div>
        <MoreHorizontal className="cursor-pointer text-gray-400 hover:text-white transition-colors" size={20} />
      </div>

      {/* Post Image */}
      <motion.div
        className="relative bg-gray-900"
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={postImage}
          alt="Post"
          className="w-full aspect-square object-cover"
        />
        {/* Double-tap heart animation */}
        {isLiked && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.6 }}
            key={likeCount}
          >
            <Heart size={80} fill="white" className="text-white" />
          </motion.div>
        )}
      </motion.div>

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                size={26}
                fill={isLiked ? '#ec4899' : 'none'}
                className={`transition-colors ${isLiked ? 'text-pink-500' : 'text-white hover:text-gray-400'}`}
              />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <MessageCircle size={26} className="text-white hover:text-gray-400 transition-colors" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Send size={26} className="text-white hover:text-gray-400 transition-colors" />
            </motion.button>
          </div>
          <motion.button
            onClick={() => setIsSaved(!isSaved)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bookmark
              size={26}
              fill={isSaved ? 'white' : 'none'}
              className="text-white hover:text-gray-400 transition-colors"
            />
          </motion.button>
        </div>

        {/* Likes Count */}
        <div className="font-semibold text-sm mb-2">
          {likeCount.toLocaleString()} likes
        </div>

        {/* Caption */}
        <div className="text-sm mb-1">
          <span className="font-semibold mr-2">{username}</span>
          <span className="text-gray-200">{caption}</span>
        </div>

        {/* Comments */}
        {comments > 0 && (
          <button className="text-gray-400 text-sm mb-2 hover:text-gray-300 transition-colors">
            View all {comments} comments
          </button>
        )}

        {/* Timestamp */}
        <div className="text-gray-500 text-xs">{timestamp}</div>
      </div>

      {/* Comment Input */}
      <div className="border-t border-gray-800 p-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 bg-transparent text-sm focus:outline-none text-white placeholder-gray-500"
        />
        <button className="text-purple-400 font-semibold text-sm hover:text-purple-300 transition-colors">
          Post
        </button>
      </div>
    </motion.article>
  );
}
