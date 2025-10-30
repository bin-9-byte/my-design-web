import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from './Button';

// 导入作品数据
import { projects } from '@/data/projects';

interface ProjectDetailProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ theme, toggleTheme }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // 页面加载时滚动到顶部
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // 查找对应的项目
  const project = projects.find(p => p.id === parseInt(id || '', 10));
  
  // 如果项目不存在，显示404
  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-xl mb-8">项目不存在</p>
          <Button 
            variant="default" 
            onClick={() => navigate('/')}
            data-theme={theme}
          >
            返回首页
          </Button>
        </div>
      </div>
    );
  }

  // 动画配置
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // 动态主题样式
  const themeClass = theme === 'dark'
    ? 'bg-black text-white'
    : 'bg-white text-black';

  return (
    <div className={`min-h-screen ${themeClass}`}>
      <div className="container mx-auto px-4 py-16">
        {/* 返回按钮和主题切换 */}
        <motion.div 
          className="mb-8 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            data-theme={theme}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            返回上一页
          </Button>
          
          {/* 主题切换按钮 */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            aria-label="切换主题"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {theme === 'dark' ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                />
              )}
            </svg>
          </button>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 项目标题 */}
          <motion.h1 
            className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}
            variants={itemVariants}
          >
            {project.title}
          </motion.h1>

          {/* 项目主图 */}
          <motion.div 
            className="mb-12 overflow-hidden rounded-xl"
            variants={itemVariants}
          >
            <motion.img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          {/* 项目描述 */}
          <motion.div 
            className={`text-xl leading-relaxed mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
            variants={itemVariants}
          >
            <p>{project.description}</p>
            <p className="mt-6">
              这是一个精心设计和开发的项目，专注于提供优质的用户体验和创新的解决方案。通过使用现代前端技术栈，
              我们成功地实现了高性能、响应式的界面设计，同时确保代码的可维护性和可扩展性。
            </p>
          </motion.div>

          {/* 技术栈 */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-4">技术栈</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 项目链接 */}
          <motion.div 
            className="mt-16 flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <Button 
              variant="default" 
              className="flex items-center gap-2"
              data-theme={theme}
            >
              <ExternalLink size={18} />
              访问项目
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              data-theme={theme}
            >
              查看更多作品
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;