import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [particles, setParticles] = useState([]);
  const [codeFragments, setCodeFragments] = useState([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Generate code fragments
    const codes = ['{ }', '< >', '01', '10', '#', '$', '@', '*', '++', '--', '[]', '()', '=>', '&&', '||'];
    const newFragments = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      text: codes[Math.floor(Math.random() * codes.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 5,
    }));
    setCodeFragments(newFragments);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-blue-900" />
      
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-pink-400"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            filter: 'blur(1px)',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Code Fragments */}
      {codeFragments.map((fragment) => (
        <motion.div
          key={fragment.id}
          className="absolute text-cyan-400 font-mono text-sm opacity-30"
          style={{
            left: `${fragment.x}%`,
            top: `${fragment.y}%`,
            textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 0.5, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: fragment.duration,
            repeat: Infinity,
            delay: fragment.delay,
            ease: "easeInOut",
          }}
        >
          {fragment.text}
        </motion.div>
      ))}

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full"
        style={{ filter: 'blur(120px)', opacity: 0.3 }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full"
        style={{ filter: 'blur(120px)', opacity: 0.3 }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-96 h-96 bg-pink-500 rounded-full"
        style={{ filter: 'blur(120px)', opacity: 0.2 }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
