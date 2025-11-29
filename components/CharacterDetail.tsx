
import React from 'react';
import { Character } from '../types';
import { X, MapPin, Key, AlertTriangle, ArrowRight, CheckCircle2, CornerDownRight, ScrollText, GitBranch } from 'lucide-react';

interface CharacterDetailProps {
  character: Character;
  onClose: () => void;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character, onClose }) => {
  // Helper function to parse custom tags for styling
  const renderRichText = (text: string) => {
    const parts = text.split(/(\[r\].*?\[\/r\]|\[g\].*?\[\/g\]|\[b\].*?\[\/b\]|\[big\].*?\[\/big\])/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('[r]') && part.endsWith('[/r]')) {
        return <span key={index} className="text-red-500 font-bold mx-1">{part.slice(3, -4)}</span>;
      }
      if (part.startsWith('[g]') && part.endsWith('[/g]')) {
        return <span key={index} className="text-emerald-600 font-bold mx-1">{part.slice(3, -4)}</span>;
      }
      if (part.startsWith('[b]') && part.endsWith('[/b]')) {
        return <span key={index} className="text-blue-600 font-bold mx-1">{part.slice(3, -4)}</span>;
      }
      if (part.startsWith('[big]') && part.endsWith('[/big]')) {
        return <span key={index} className="text-xl md:text-2xl font-black text-slate-800 mx-1">{part.slice(5, -6)}</span>;
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white/95 w-full max-w-7xl h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative border border-white/50 animate-slide-up"
      >
        
        {/* Header */}
        <div className="flex justify-between items-center px-10 py-6 border-b border-slate-100 bg-white/80 backdrop-blur-xl z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg text-white font-bold text-3xl shrink-0">
              {character.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                {character.name}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm font-mono text-slate-400 bg-slate-100 px-3 py-1 rounded">ID: {character.id.toUpperCase()}</span>
                <span className="text-sm font-bold text-win-accent bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {character.role}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="group p-3 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={32} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
          </button>
        </div>

        {/* Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Image & Info (Fixed) */}
          <div className="w-96 bg-slate-50/80 border-r border-slate-100 p-8 flex flex-col gap-8 overflow-y-auto shrink-0 hidden lg:flex">
            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white relative group">
              <img 
                src={character.avatarUrl} 
                alt={character.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                  <MapPin size={16} /> 出现区域
                </h4>
                <div className="flex flex-wrap gap-2">
                  {character.locations.map(loc => (
                    <span key={loc} className="px-3 py-1.5 bg-slate-100 text-sm rounded-lg text-slate-600 font-bold border border-slate-200">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              {character.unlockConditions && (
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                    <Key size={16} /> 解锁/触发条件
                  </h4>
                  <p className="text-base text-orange-600 font-bold leading-relaxed bg-orange-50 p-4 rounded-xl border border-orange-100">
                    {renderRichText(character.unlockConditions)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Content Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto bg-white scroll-smooth p-10">
            <div className="max-w-5xl mx-auto space-y-16 pb-24">
              
              {/* Profile Section */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <ScrollText size={28} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">档案概览</h3>
                </div>
                
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-slate-700 leading-loose text-lg shadow-sm">
                  {renderRichText(character.description)}
                </div>

                {character.tips && character.tips.length > 0 && (
                  <div className="bg-amber-50/50 border border-amber-100 p-8 rounded-3xl">
                    <h4 className="text-amber-600 font-bold mb-4 flex items-center gap-2 text-base uppercase tracking-wider">
                      <AlertTriangle size={20} /> 重要提示
                    </h4>
                    <ul className="space-y-4">
                      {character.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-slate-700 text-lg leading-relaxed">
                          <span className="mt-2 w-2 h-2 bg-amber-400 rounded-full shrink-0" />
                          <span>{renderRichText(tip)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              {/* Guide Section */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <ArrowRight size={28} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800">攻略流程</h3>
                </div>

                <div className="space-y-0 relative pl-6">
                  {/* Timeline Line */}
                  <div className="absolute left-[23px] top-6 bottom-6 w-1 bg-slate-100" />
                  
                  {character.guideSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-8 relative pb-8 group last:pb-0">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center text-slate-400 font-mono font-bold text-lg shadow-sm group-hover:border-win-accent group-hover:text-win-accent group-hover:scale-110 transition-all shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-slate-700 text-lg leading-loose shadow-[0_2px_12px_rgba(0,0,0,0.02)] group-hover:shadow-md group-hover:border-blue-200 transition-all">
                          {renderRichText(step)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Routes Section */}
              {character.routes && character.routes.length > 0 && (
                <section className="space-y-8">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                      <GitBranch size={28} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800">分支路线</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    {character.routes.map((route, idx) => (
                      <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                        <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex justify-between items-center">
                          <h4 className="font-bold text-slate-800 flex items-center gap-3 text-xl">
                            <CheckCircle2 size={24} className="text-green-500" />
                            {route.name}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-100 font-bold">
                            ROUTE {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="p-8 bg-white">
                          <ul className="space-y-4">
                            {route.steps.map((step, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-4 text-lg text-slate-600 group-hover:text-slate-800 transition-colors leading-relaxed">
                                <CornerDownRight size={20} className="text-purple-300 mt-1 shrink-0" />
                                <span>{renderRichText(step)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
