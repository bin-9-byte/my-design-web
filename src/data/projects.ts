// 定义作品项目接口
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
}

// 作品数据
export const projects: Project[] = [
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

// 根据ID获取项目
export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};

// 获取所有项目ID
export const getAllProjectIds = (): { params: { id: string } }[] => {
  return projects.map(project => ({
    params: {
      id: project.id.toString()
    }
  }));
};