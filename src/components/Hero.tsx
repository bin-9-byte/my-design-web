import React from 'react';
import { motion, easeInOut, easeOut } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from './Button';

// 几何背景元素配置
const backgroundElements = [
  { className: 'top-1/4 left-1/4 w-64 h-64 bg-red-500', animate: { rotate: 360 }, transition: { duration: 120 } },
  { className: 'bottom-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full', animate: { scale: [1, 1.2, 1] }, transition: { duration: 15, ease: easeInOut } },
  { className: 'top-2/3 left-1/3 w-48 h-48 bg-yellow-400 rotate-45', animate: { x: [0, 50, 0], y: [0, -50, 0] }, transition: { duration: 20, ease: easeInOut } },
];

// 社交媒体图标配置
const socialIcons = [
  { Icon: Github, href: '#' },
  { Icon: Twitter, href: '#' },
  { Icon: Linkedin, href: '#' },
  { Icon: Mail, href: '#' },
];

// 包豪斯风格的Hero组件
interface HeroProps {
  theme: 'light' | 'dark';
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  // 导航钩子
  const navigate = useNavigate();
  
  // 动画配置 - 简化为常量
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOut } }
  };

  // ASC2: 动态主题样式
  const themeClass = theme === 'dark'
    ? 'bg-black text-white'
    : 'bg-white text-black';

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${themeClass}`}>
      {/* 包豪斯风格的几何背景元素 */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundElements.map((elem, idx) => (
          <motion.div 
            key={idx}
            className={`absolute ${elem.className} opacity-10`}
            animate={elem.animate}
            transition={{ ...elem.transition, repeat: Infinity }}
          />
        ))}
      </div>

      {/* 主要内容 */}
      <motion.div 
        className="container mx-auto px-4 z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 几何形状装饰 */}
        <motion.div className="mb-8 inline-block" variants={itemVariants}>
          <div className={`w-24 h-24 mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
        </motion.div>

        {/* 标题 */}
        <motion.h1 
          className={`text-6xl md:text-8xl font-bold mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          variants={itemVariants}
        >
          <span className="block">Hello!</span>
          <span className="block">I'm Ma Bin</span>
        </motion.h1>

        {/* 副标题 */}
        <motion.h2 
          className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          variants={itemVariants}
        >
          Aigc 设计师 & 独立开发者
        </motion.h2>

        {/* 按钮组 */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={itemVariants}
        >
          <Button 
            variant="default" 
            data-theme={theme}
            onClick={() => {
              // 导航到首页
              navigate('/');
              // 延迟滚动到作品部分，确保页面已切换
              setTimeout(() => {
                const portfolioSection = document.querySelector('[data-section="portfolio"]');
                if (portfolioSection) {
                  portfolioSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
          >
            查看我的项目
          </Button>
          <Button variant="outline" data-theme={theme}>联系我</Button>
        </motion.div>

        {/* 社交媒体图标 */}
        <motion.div className="flex justify-center gap-6" variants={itemVariants}>
          {socialIcons.map(({ Icon, href }, idx) => (
            <a 
              key={idx} 
              href={href} 
              className={`transition-colors ${
                theme === 'dark' 
                  ? 'text-white hover:text-gray-300' 
                  : 'text-black hover:text-gray-600'
              }`}
            >
              <Icon size={24} />
            </a>
          ))}
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