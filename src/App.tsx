import React, { useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';

// 主应用组件
function App() {
  // 创建各部分的引用，用于滚动定位
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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

      if (homeRef.current && scrollPosition < homeRef.current.offsetHeight) {
        setCurrentPage('home');
      } else if (aboutRef.current && 
                scrollPosition >= homeRef.current!.offsetHeight && 
                scrollPosition < homeRef.current!.offsetHeight + aboutRef.current.offsetHeight) {
        setCurrentPage('about');
      } else if (portfolioRef.current && 
                scrollPosition >= homeRef.current!.offsetHeight + aboutRef.current!.offsetHeight) {
        setCurrentPage('portfolio');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 固定导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white mr-3" />
              <span className="text-xl font-bold">Bin Ma</span>
            </div>
            
            {/* 导航链接 */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection(homeRef)}
                className={`text-lg font-medium transition-colors ${currentPage === 'home' ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}
              >
                首页
              </button>
              <button 
                onClick={() => scrollToSection(aboutRef)}
                className={`text-lg font-medium transition-colors ${currentPage === 'about' ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}
              >
                关于我
              </button>
              <button 
                onClick={() => scrollToSection(portfolioRef)}
                className={`text-lg font-medium transition-colors ${currentPage === 'portfolio' ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}
              >
                作品
              </button>
            </div>
            
            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                <div className="w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300"></div>
                <div className="w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300"></div>
                <div className="w-6 h-0.5 bg-white transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 移动端下拉菜单 */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 bg-black/95 border-b border-gray-800 z-40 py-4 px-6">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => {
                scrollToSection(homeRef);
                setMobileMenuOpen(false);
              }}
              className={`text-lg font-medium transition-colors ${currentPage === 'home' ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}
            >
              首页
            </button>
            <button 
              onClick={() => {
                scrollToSection(aboutRef);
                setMobileMenuOpen(false);
              }}
              className={`text-lg font-medium transition-colors ${currentPage === 'about' ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}
            >
              关于我
            </button>
            <button 
              onClick={() => {
                scrollToSection(portfolioRef);
                setMobileMenuOpen(false);
              }}
              className={`text-lg font-medium transition-colors ${currentPage === 'portfolio' ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}
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
          <Hero />
        </section>
        
        {/* 个人履历部分 */}
        <section ref={aboutRef}>
          <About />
        </section>
        
        {/* 作品展示部分 */}
        <section ref={portfolioRef}>
          <Portfolio />
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 py-10 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-6">© 2024 Bin Ma. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
