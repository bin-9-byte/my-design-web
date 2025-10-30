import React from 'react';
import { motion } from 'framer-motion';

// 定义时间线项目接口
interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

// 个人履历数据
const timelineData: TimelineItem[] = [
  {
    year: '2022 - 至今',
    title: '高级AIGC设计师',
    description: '专注于生成式AI在创意设计领域的应用，开发多种AI辅助设计工具和解决方案。'
  },
  {
    year: '2020 - 2022',
    title: '前端开发工程师',
    description: '负责Web应用的UI/UX设计和前端开发，使用React、TypeScript和Tailwind CSS构建响应式界面。'
  },
  {
    year: '2018 - 2020',
    title: 'UI/UX设计师',
    description: '为移动应用和网站设计用户界面和交互体验，专注于创建直观易用的产品。'
  },
];

// 技能数据
const skills = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'UI/UX设计', level: 88 },
  { name: 'AIGC', level: 92 },
  { name: 'Tailwind CSS', level: 87 },
  { name: 'Framer Motion', level: 83 },
];

const About: React.FC = () => {
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

  return (
    <section className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* 标题 */}
          <motion.h2 
            className="text-5xl font-bold mb-16 text-center"
            variants={itemVariants}
          >
            个人履历
          </motion.h2>

          {/* 个人简介 */}
          <motion.div 
            className="mb-20 text-center max-w-2xl mx-auto"
            variants={itemVariants}
          >
            <p className="text-xl text-gray-300 leading-relaxed">
              我是一名充满激情的AIGC设计师和开发者，专注于将人工智能技术与创意设计相结合。
              拥有多年的前端开发和UI/UX设计经验，致力于创造既美观又实用的数字产品。
            </p>
          </motion.div>

          {/* 工作经历时间线 */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-10 border-b border-gray-800 pb-2">工作经历</h3>
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <motion.div 
                  key={index}
                  className="relative pl-10 border-l border-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white"></div>
                  <div className="text-lg font-medium text-yellow-400 mb-2">{item.year}</div>
                  <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 技能展示 */}
          <motion.div 
            className="mt-20"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold mb-10 border-b border-gray-800 pb-2">专业技能</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-lg font-medium">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-yellow-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;