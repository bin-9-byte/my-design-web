import React from 'react';
import { motion, easeInOut, easeOut } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from './Button';

// 包豪斯风格的Hero组件
const Hero: React.FC = () => {
  // 滑入动画配置
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 包豪斯风格的几何背景元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500 opacity-10 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: easeInOut }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/3 w-48 h-48 bg-yellow-400 opacity-10 rotate-45"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: easeInOut }}
        />
      </div>

      {/* 主要内容 */}
      <motion.div 
        className="container mx-auto px-4 z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 几何形状装饰 */}
        <motion.div 
          className="mb-8 inline-block"
          variants={itemVariants}
        >
          <div className="w-24 h-24 bg-white mx-auto" />
        </motion.div>

        {/* 标题 */}
        <motion.h1 
          className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter"
          variants={itemVariants}
        >
          <span className="block">LINUS</span>
          <span className="block">TORVALDS</span>
        </motion.h1>

        {/* 副标题 */}
        <motion.h2 
          className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Linux 内核创造者 & 开源革命者
        </motion.h2>

        {/* 按钮组 */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={itemVariants}
        >
          <Button variant="default" className="bg-white text-black hover:bg-gray-200">
            了解更多
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            联系我
          </Button>
        </motion.div>

        {/* 社交媒体图标 */}
        <motion.div 
          className="flex justify-center gap-6"
          variants={itemVariants}
        >
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Github size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Mail size={24} />
          </a>
        </motion.div>
      </motion.div>

      {/* 底部几何线条 */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1 bg-white"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, delay: 1 }}
      />
    </section>
  );
};

export default Hero;