import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { projects } from '@/data/projects';

interface PortfolioProps {
  theme: 'light' | 'dark';
}

const Portfolio: React.FC<PortfolioProps> = ({ theme }) => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  // ASC2: 动态主题样式
  const themeClass = theme === 'dark'
    ? 'bg-black text-white'
    : 'bg-white text-black';

  return (
    <section className={`min-h-screen py-20 ${themeClass}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* 标题 */}
          <motion.h2 
            className="text-5xl font-bold mb-4 text-center"
            variants={itemVariants}
          >
            个人作品
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            探索我的创意项目和技术实现
          </motion.p>

          {/* 项目网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className={`rounded-lg overflow-hidden hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} cursor-pointer`}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: project.id * 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/project/${project.id}`)}
              >
                {/* 项目图片 */}
                <div className="h-56 overflow-hidden">
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                {/* 项目内容 */}
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>{project.title}</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'} mb-4`}>{project.description}</p>
                  
                  {/* 技术栈 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`text-xs px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* 外部链接 */}
                  <div className="flex justify-end items-center">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                      onClick={(e) => e.stopPropagation()} // 阻止冒泡，避免触发卡片的点击事件
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* 加载更多按钮 */}
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <Button variant="outline" className="px-8">
              加载更多作品
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;