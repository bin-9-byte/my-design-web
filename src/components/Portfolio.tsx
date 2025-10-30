import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from './Button';

// 定义作品项目接口
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
}

// 作品数据
const projects: Project[] = [
  {
    id: 1,
    title: 'AI创意助手',
    description: '一个基于生成式AI的设计辅助工具，帮助设计师快速生成创意概念和设计素材。',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenAI API'],
    imageUrl: 'https://picsum.photos/seed/ai1/800/600',
    link: '#project1'
  },
  {
    id: 2,
    title: '智能作品集展示平台',
    description: '为创意专业人士打造的作品集展示平台，支持AI辅助的内容优化和推荐。',
    technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Supabase'],
    imageUrl: 'https://picsum.photos/seed/portfolio/800/600',
    link: '#project2'
  },
  {
    id: 3,
    title: '响应式电子商务网站',
    description: '一个现代化的电子商务平台，具有流畅的用户体验和强大的产品展示功能。',
    technologies: ['React', 'Redux', 'Tailwind CSS', 'Firebase'],
    imageUrl: 'https://picsum.photos/seed/ecommerce/800/600',
    link: '#project3'
  },
  {
    id: 4,
    title: '数据可视化仪表板',
    description: '为企业用户打造的数据可视化工具，支持实时数据监控和交互式图表。',
    technologies: ['React', 'D3.js', 'TypeScript', 'Node.js'],
    imageUrl: 'https://picsum.photos/seed/dashboard/800/600',
    link: '#project4'
  },
  {
    id: 5,
    title: '社交网络移动应用界面',
    description: '为社交网络应用设计的移动界面，专注于用户体验和交互设计。',
    technologies: ['React Native', 'TypeScript', 'Redux', 'React Navigation'],
    imageUrl: 'https://picsum.photos/seed/social/800/600',
    link: '#project5'
  },
  {
    id: 6,
    title: 'AIGC内容生成平台',
    description: '一个综合性的AIGC内容生成平台，支持文本、图像和视频的智能创作。',
    technologies: ['React', 'TypeScript', 'AWS', 'TensorFlow.js'],
    imageUrl: 'https://picsum.photos/seed/content/800/600',
    link: '#project6'
  }
];

interface PortfolioProps {
  theme: 'light' | 'dark';
}

const Portfolio: React.FC<PortfolioProps> = ({ theme }) => {
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
                className={`rounded-lg overflow-hidden hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: project.id * 0.1 }}
                viewport={{ once: true }}
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
                  
                  {/* 操作按钮 */}
                  <div className="flex justify-between items-center">
                    <Button variant="default" size="sm">
                      查看详情
                    </Button>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
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