/* =========================================================
  App.tsx - 主应用入口
 // ASC2 Block: 主题切换 + 页面导航 + 路由配置
  ---------------------------------------------------------
  哥，好代码不是写出来的，是重构出来的。
  ========================================================= */

import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import ProjectDetail from './components/ProjectDetail';

// 定义页面类型
interface NavigationItem {
  key: 'home' | 'about' | 'portfolio';
  label: string;
  ref: React.RefObject<HTMLDivElement>;
}

// 主内容组件 - 包含首页内容和导航
const MainContent = ({ theme, toggleTheme }: { theme: 'light' | 'dark'; toggleTheme: () => void }) => {
    // React Router钩子在组件内部可以正常使用
    const navigate = useNavigate();
    const location = useLocation();
  
  // 引用和状态初始化
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 导航配置 - 统一管理，消除重复
  const navigationItems = [
    { key: 'home', label: '首页', ref: homeRef },
    { key: 'about', label: '关于我', ref: aboutRef },
    { key: 'portfolio', label: '作品', ref: portfolioRef },
  ];
  
  // 获取导航链接的类名 - 消除重复条件判断
  const getNavLinkClass = (key: string) => {
    const baseClass = 'text-lg font-medium transition-colors';
    const activeClass = location.pathname === '/' && key === 'home' ? 
      (theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600') : 
      (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black');
    return `${baseClass} ${activeClass}`;
  };
  
  // 滚动到指定部分
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // 滚动监听 - 高亮当前部分
  useEffect(() => {
    const handleScroll = () => {
      // 滚动监听逻辑
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 渲染导航链接
  const renderNavLink = (item: any, closeMenu: boolean = false) => {
    const handleClick = () => {
      if (location.pathname !== '/') {
        navigate('/');
        // 延迟滚动，确保页面已切换
        setTimeout(() => scrollToSection(item.ref), 100);
      } else {
        scrollToSection(item.ref);
      }
      if (closeMenu) setMobileMenuOpen(false);
    };
    
    return (
      <button 
        key={item.key}
        onClick={handleClick}
        className={getNavLinkClass(item.key)}
      >
        {item.label}
      </button>
    );
  };
  
  return (
    <div className={`${getThemeClass(theme)} min-h-screen`}>
      {/* 导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-opacity-80 border-b border-opacity-20 border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div 
              className={`p-2 rounded-lg cursor-pointer ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img 
                src="/src/assets/personal-logo.svg" 
                alt="设计师Logo" 
                className={`h-8 w-auto ${theme === 'dark' ? 'filter brightness-125' : ''}`}
              />
            </div>
          </div>
          
          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-8">
              {navigationItems.map(item => renderNavLink(item))}
            </nav>
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
          </div>
          
          {/* 移动端菜单和主题按钮容器 */}
          <div className="flex items-center gap-4 md:hidden">
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
            {/* 移动端菜单按钮 */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
            </button>
          </div>
        </div>
        
        {/* 移动端导航菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-opacity-95 backdrop-blur-lg border-b border-opacity-20 border-gray-200">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navigationItems.map(item => renderNavLink(item, true))}
            </div>
          </div>
        )}
      </header>
      
      {/* 主内容区域 */}
      <main className="pt-20">
        <div ref={homeRef}>
          <Hero theme={theme} />
        </div>
        <div ref={aboutRef}>
          <About theme={theme} />
        </div>
        <div ref={portfolioRef} data-section="portfolio">
          <Portfolio theme={theme} />
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className={`py-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} 设计师作品集. 保留所有权利.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            {/* 社交媒体链接 */}
            <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>GitHub</a>
            <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>LinkedIn</a>
            <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// 从localStorage获取主题
export const getThemeFromLocalStorage = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }
  // 如果没有保存的主题，使用系统偏好
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// 获取主题类名
export const getThemeClass = (theme: 'light' | 'dark'): string => {
  return theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
};

// 主应用组件 - 路由配置
function App() {
  // 主题状态管理
  const [theme, setTheme] = useState<'light' | 'dark'>(getThemeFromLocalStorage());
  
  // 切换主题函数
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // 路由配置
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent theme={theme} toggleTheme={toggleTheme} />} />
        <Route 
          path="/project/:id" 
          element={<ProjectDetail theme={theme} toggleTheme={toggleTheme} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
