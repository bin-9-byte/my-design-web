/* =========================================================
  App.tsx - 主应用入口
  ASC2 Block: 主题切换 + 页面导航 + 内容渲染
  ---------------------------------------------------------
  哥，代码是写给人看的，只是顺便让机器能跑。
  ========================================================= */

import React, { useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';

// 主应用组件
function App() {
  /* =========================================================
     ASC2 Block: Section Ref 创建
     ---------------------------------------------------------
     用于页面滚动定位，消除特殊情况
  ========================================================= */
  
  // 创建各部分的引用，用于滚动定位
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // ===============================
  // ASC2: 主题模式状态与切换逻辑
  // ===============================
  
  // 从 localStorage 或系统主题获取初始主题
  const getInitialTheme = (): 'light' | 'dark' => {
    // 尝试从 localStorage 获取
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // 检查系统主题偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  };

  const [theme, setTheme] = React.useState<'light' | 'dark'>(getInitialTheme);
  
  // 主题切换时保存到 localStorage
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // 监听系统主题变化
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {  // 只在用户未手动设置主题时响应
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 滚动到指定部分
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 定义页面类型用于导航高亮
  type Page = 'home' | 'about' | 'portfolio';
  // 当前页面状态，用于导航高亮
  const [currentPage, setCurrentPage] = React.useState<Page>('home');

  // 监听滚动，更新当前页面状态以高亮导航
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let accumulated = 0;
      for (const section of sections) {
        const height = section.ref.current?.offsetHeight || 0;
        if (scrollPosition < accumulated + height) {
          setCurrentPage(section.key as Page);
          break;
        }
        accumulated += height;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ===============================
  // Section 映射优化，消除分支
  // ===============================
  const sections = [
    { ref: homeRef, key: 'home' },
    { ref: aboutRef, key: 'about' },
    { ref: portfolioRef, key: 'portfolio' },
  ];

  // ===============================
  // ASC2: 动态主题样式
  // ===============================
  const themeClass = theme === 'dark'
    ? 'bg-black text-white'
    : 'bg-white text-black';

  return (
    <div className={`min-h-screen ${themeClass}`}>
      {/* 固定导航栏 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-black/80 border-gray-800' : 'bg-white/80 border-gray-300'} backdrop-blur-md border-b`}> 
        {/* =========================================================
            ASC2 Block: 固定导航栏 + 主题切换按钮
            ---------------------------------------------------------
            哥，导航栏是品味的门面。
         ========================================================= */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white mr-3" />
              <span className="text-xl font-bold">Bin Ma</span>
            </div>
            
            {/* 导航链接 + 主题切换 */}
            <div className="hidden md:flex space-x-8 items-center">
              <button 
                onClick={() => scrollToSection(homeRef as React.RefObject<HTMLDivElement>)}
                className={`text-lg font-medium transition-colors ${currentPage === 'home' ? (theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600') : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black')}`}
              >
                首页
              </button>
              <button 
                onClick={() => scrollToSection(aboutRef as React.RefObject<HTMLDivElement>)}
                className={`text-lg font-medium transition-colors ${currentPage === 'about' ? (theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600') : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black')}`}
              >
                关于我
              </button>
              <button 
                onClick={() => scrollToSection(portfolioRef as React.RefObject<HTMLDivElement>)}
                className={`text-lg font-medium transition-colors ${currentPage === 'portfolio' ? (theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600') : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black')}`}
              >
                作品
              </button>
              {/* ===============================
                  ASC2: 主题切换按钮
              =============================== */}
              <button
                onClick={toggleTheme}
                className={`ml-6 px-3 py-1 rounded transition-colors border ${theme === 'dark' ? 'border-gray-700 bg-gray-900 text-white hover:bg-gray-800' : 'border-gray-300 bg-gray-100 text-black hover:bg-gray-200'}`}
                aria-label="切换主题"
              >
                {theme === 'dark' ? '🌙 暗黑' : '☀️ 明亮'}
              </button>
            </div>
            
            {/* 移动端菜单按钮 + 主题切换 */}
            <div className="md:hidden flex items-center space-x-2">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                <div className={`w-6 h-0.5 ${theme === 'dark' ? 'bg-white' : 'bg-black'} mb-1.5 transition-transform duration-300`}></div>
                <div className={`w-6 h-0.5 ${theme === 'dark' ? 'bg-white' : 'bg-black'} mb-1.5 transition-transform duration-300`}></div>
                <div className={`w-6 h-0.5 ${theme === 'dark' ? 'bg-white' : 'bg-black'} transition-transform duration-300`}></div>
              </button>
              <button
                onClick={toggleTheme}
                className={`px-2 py-1 rounded transition-colors border ${theme === 'dark' ? 'border-gray-700 bg-gray-900 text-white hover:bg-gray-800' : 'border-gray-300 bg-gray-100 text-black hover:bg-gray-200'}`}
                aria-label="切换主题"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 移动端下拉菜单 */}
      {mobileMenuOpen && (
        <div className={`fixed top-20 left-0 right-0 z-40 py-4 px-6 border-b ${theme === 'dark' ? 'bg-black/95 border-gray-800' : 'bg-white/95 border-gray-300'}`}>
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => {
                scrollToSection(homeRef as React.RefObject<HTMLDivElement>);
                setMobileMenuOpen(false);
              }}
              className={`text-lg font-medium transition-colors ${currentPage === 'home' ? (theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600') : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black')}`}
            >
              首页
            </button>
            <button 
              onClick={() => {
                scrollToSection(aboutRef as React.RefObject<HTMLDivElement>);
                setMobileMenuOpen(false);
              }}
              className={`text-lg font-medium transition-colors ${currentPage === 'about' ? (theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600') : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black')}`}
            >
              关于我
            </button>
            <button 
              onClick={() => {
                scrollToSection(portfolioRef as React.RefObject<HTMLDivElement>);
                setMobileMenuOpen(false);
              }}
              className={`text-lg font-medium transition-colors ${currentPage === 'portfolio' ? (theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600') : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black')}`}
            >
              作品
            </button>
          </div>
        </div>
      )}

      {/* 页面内容 - 添加顶部内边距避免被导航栏遮挡 */}
      <main className="pt-20">
        {/* 首页部分 */}
        <section ref={homeRef}>
          <Hero theme={theme} />
        </section>
        
        {/* 个人履历部分 */}
        <section ref={aboutRef}>
          <About theme={theme} />
        </section>
        
        {/* 作品展示部分 */}
        <section ref={portfolioRef}>
          <Portfolio theme={theme} />
        </section>
      </main>

      {/* 页脚 */}
      <footer className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} py-10 mt-20`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-6`}>© 2024 Bin Ma. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>LinkedIn</a>
            <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>GitHub</a>
            <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
