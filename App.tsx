
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CharacterCard from './components/CharacterCard';
import CharacterDetail from './components/CharacterDetail';
import HackerMiniGame from './components/HackerMiniGame';
import DonationModal from './components/DonationModal';
import { ViewState, Character, CharacterRole } from './types';
import { CHARACTERS, GAME_CHANGELOG, TOOL_CHANGELOG, AUTHOR_INFO, SUPPORTERS } from './constants';
import { Search, Bell, Sparkles, Gamepad2, Info, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Custom hero images for the carousel
  const heroCharacters = [
    { id: 'hero-1', avatarUrl: '/images/1.png' },
    { id: 'hero-2', avatarUrl: '/images/2.png' },
    { id: 'hero-3', avatarUrl: '/images/3.png' },
    { id: 'hero-4', avatarUrl: '/images/4.png' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroCharacters.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroCharacters.length]);

  // Separate data based on views
  const characterList = useMemo(() => {
    return CHARACTERS.filter(c => c.role !== CharacterRole.SYSTEM);
  }, []);

  const guideList = useMemo(() => {
    return CHARACTERS.filter(c => c.role === CharacterRole.SYSTEM);
  }, []);

  // Search logic
  const filteredItems = useMemo(() => {
    let sourceList = currentView === ViewState.GAME_GUIDES ? guideList : characterList;
    
    if (!searchQuery) return sourceList;
    
    // If searching globally while in other views, search everything
    if (currentView !== ViewState.CHARACTER_LIST && currentView !== ViewState.GAME_GUIDES) {
       sourceList = CHARACTERS;
    }

    return sourceList.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentView, characterList, guideList]);

  const handleCharacterSelect = (char: Character) => {
    setSelectedCharacter(char);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HACKER_TOOL:
        return <HackerMiniGame />;
      
      case ViewState.CHANGELOG:
        return (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Tool Updates */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-800 font-sans flex items-center gap-4">
                <Sparkles size={32} className="text-win-accent fill-win-accent" /> 
                工具更新日志 (v1.0)
              </h2>
              {TOOL_CHANGELOG.map((log, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-baseline mb-6 border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-bold text-slate-800">v{log.version}</h3>
                    <span className="font-mono text-slate-400 text-sm">{log.date}</span>
                  </div>
                  <ul className="space-y-4">
                    {log.changes.map((change, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-slate-600 text-base">
                        <span className="w-2 h-2 bg-win-accent rounded-full mt-2 shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Game Updates */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-800 font-sans flex items-center gap-4">
                <Gamepad2 size={32} className="text-purple-500 fill-purple-500" /> 
                游戏更新内容
              </h2>
              {GAME_CHANGELOG.map((log, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm opacity-90">
                  <div className="flex justify-between items-baseline mb-6 border-b border-slate-100 pb-4">
                    <h3 className="text-2xl font-bold text-slate-700">v{log.version}</h3>
                    <span className="font-mono text-slate-400 text-sm">{log.date}</span>
                  </div>
                  <ul className="space-y-4">
                    {log.changes.map((change, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-slate-500 text-base">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case ViewState.ABOUT:
        return (
          <div className="max-w-4xl mx-auto pt-12">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-black text-slate-800 mb-6 tracking-tight">关于 Starmaker Archives</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">{AUTHOR_INFO.description}</p>
            </div>
            
            <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-xl mb-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
               
               <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3 relative z-10">
                 <Star size={28} className="text-yellow-500 fill-yellow-500" />
                 特别感谢名单 (Special Thanks)
               </h3>
               
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
                 {SUPPORTERS.map((name, idx) => (
                   <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center font-bold text-slate-700 text-base hover:bg-yellow-50 hover:text-yellow-800 hover:border-yellow-200 transition-colors shadow-sm">
                     {name}
                   </div>
                 ))}
                 <div className="col-span-full mt-6 text-center text-sm text-slate-400">
                   感谢所有提供反馈和支持的玩家！名单持续更新中...
                 </div>
               </div>
            </div>
          </div>
        );

      case ViewState.CHARACTER_LIST:
      case ViewState.GAME_GUIDES:
        const isGuideView = currentView === ViewState.GAME_GUIDES;
        return (
          <div className="space-y-10 animate-fade-in">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                  {isGuideView ? '游戏百科 & 节日' : '人物档案库'}
                </h2>
                <p className="text-slate-500 text-base mt-2">
                  {isGuideView ? '系统玩法 / 节日活动 / 常见问题' : '主要角色 / 配角 / 隐藏人物攻略'}
                </p>
              </div>
              <div className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-mono text-slate-400 shadow-sm font-bold">
                ITEMS: {filteredItems.length}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-24">
              {filteredItems.map(char => (
                <CharacterCard 
                  key={char.id} 
                  character={char} 
                  onClick={() => handleCharacterSelect(char)} 
                />
              ))}
            </div>
          </div>
        );

      case ViewState.DASHBOARD:
      default:
        // Dashboard / Cover Page
        return (
          <div className="space-y-10 animate-fade-in pb-16">
            {/* Hero Section */}
            <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl group">
              {/* Background Slideshow */}
              {heroCharacters.map((char, index) => (
                <div 
                  key={char.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === heroImageIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img 
                    src={char.avatarUrl} 
                    alt="Hero" 
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
                </div>
              ))}

              {/* Hero Content */}
              <div className="absolute inset-0 p-16 flex flex-col justify-center max-w-3xl text-white z-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-sm font-bold tracking-widest uppercase mb-6 w-fit">
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
                  Online v1.0
                </div>
                <h1 className="text-7xl font-black mb-6 tracking-tighter leading-tight">
                  造星物语<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">详细攻略档案</span>
                </h1>
                <p className="text-xl text-slate-200 mb-10 leading-relaxed text-shadow-sm max-w-xl">
                  一站式查询所有人物剧情分支、隐藏要素、节日活动及黑客代码。
                  {AUTHOR_INFO.description}
                </p>
                
                <div className="flex gap-6">
                  <button 
                    onClick={() => setCurrentView(ViewState.CHARACTER_LIST)}
                    className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3 shadow-lg shadow-white/10"
                  >
                    开始查阅 <ChevronRight size={24} />
                  </button>
                  <button 
                    onClick={() => setCurrentView(ViewState.GAME_GUIDES)}
                    className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-colors"
                  >
                    新手指南
                  </button>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-8 right-10 flex gap-3">
                {heroCharacters.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setHeroImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${idx === heroImageIndex ? 'w-12 bg-white' : 'w-3 bg-white/40'}`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div 
                onClick={() => setCurrentView(ViewState.HACKER_TOOL)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                  <Gamepad2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">黑客工具箱</h3>
                <p className="text-base text-slate-500">萨曼莎电脑密码、游戏答案一键查询复制。</p>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.GAME_GUIDES)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <Info size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">基础问答</h3>
                <p className="text-base text-slate-500">常见卡死修复、修改器建议及基础操作指引。</p>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.CHANGELOG)}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">更新日志</h3>
                <p className="text-base text-slate-500">查看工具版本更新内容及游戏版本变动。</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-win-bg font-sans text-win-text overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        onOpenDonation={() => setIsDonationOpen(true)}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Glass Bar */}
        <header className="h-20 flex items-center px-10 justify-between z-30 sticky top-0">
          {/* Breadcrumb / Title placeholder */}
          <div className="flex items-center gap-3 text-slate-400 text-base font-medium">
            <span>APP</span>
            <ChevronRight size={16} />
            <span className="text-slate-800 font-bold uppercase">{currentView.replace('_', ' ')}</span>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative w-80 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-win-accent transition-colors" size={20} />
              <input
                type="text"
                placeholder="全局搜索..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView === ViewState.DASHBOARD) setCurrentView(ViewState.CHARACTER_LIST);
                }}
                className="w-full bg-white/80 backdrop-blur-sm border border-transparent hover:border-slate-200 focus:border-win-accent rounded-full pl-12 pr-6 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-win-accent/20 transition-all shadow-sm"
              />
            </div>
            
            <button className="relative p-3 rounded-full hover:bg-white/50 text-slate-500 hover:text-slate-800 transition-colors">
              <Bell size={24} />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 pt-2 relative scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedCharacter && (
        <CharacterDetail 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)} 
        />
      )}

      <DonationModal 
        isOpen={isDonationOpen} 
        onClose={() => setIsDonationOpen(false)} 
      />
    </div>
  );
};
