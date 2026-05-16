/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Shirt, 
  Coffee, 
  Zap, 
  Grid3X3, 
  Binary, 
  GitFork, 
  Info,
  RefreshCw,
  X,
  ChevronRight,
  Triangle,
  Square,
  Circle,
  Sandwich,
  Cookie,
  Briefcase,
  Sun,
  Palmtree,
  CupSoda,
  GlassWater,
  LucideIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { THEMES } from './constants';
import { SetItem, ThemeType } from './types';

// Map icon names to components
const IconMap: Record<string, LucideIcon> = {
  Shirt,
  Coffee,
  Triangle,
  Square,
  Circle,
  Sandwich,
  Cookie,
  Briefcase,
  Sun,
  Palmtree,
  CupSoda,
  GlassWater,
};

type ViewMode = 'grid' | 'tree' | 'pairs';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [setA, setSetA] = useState<SetItem[]>(THEMES[0].itemsA);
  const [setB, setSetB] = useState<SetItem[]>(THEMES[0].itemsB);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [newItemName, setNewItemName] = useState('');

  const cartesianProduct = useMemo(() => {
    const product = [];
    for (const a of setA) {
      for (const b of setB) {
        product.push({ a, b });
      }
    }
    return product;
  }, [setA, setB]);

  const handleThemeChange = (themeId: ThemeType) => {
    const theme = THEMES.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      setSetA(theme.itemsA);
      setSetB(theme.itemsB);
    }
  };

  const addItem = (target: 'A' | 'B') => {
    if (!newItemName.trim()) return;
    const newItem: SetItem = {
      id: Math.random().toString(36).substr(2, 9),
      label: newItemName,
      icon: 'Zap'
    };
    if (target === 'A') setSetA([...setA, newItem]);
    else setSetB([...setB, newItem]);
    setNewItemName('');
  };

  const removeItem = (target: 'A' | 'B', id: string) => {
    if (target === 'A') setSetA(setA.filter(i => i.id !== id));
    else setSetB(setB.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 border-8 border-[#3b82f6] flex flex-col">
      {/* Header */}
      <header className="bg-[#3b82f6] text-white p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-50">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight flex items-center gap-2">
            <Zap className="fill-white" size={28} />
            Cartesian Explorer
          </h1>
          <p className="text-sm font-medium opacity-90 mt-1">
            Teaching Tool: Making Sets Tangible for Elementary Math
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id as ThemeType)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                currentTheme.id === theme.id 
                  ? 'bg-white text-[#3b82f6] shadow-md border-white' 
                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        
        {/* Conceptual Introduction */}
        <section className="lg:col-span-12 bg-white/50 border-2 border-dashed border-slate-200 rounded-[2rem] p-6 mb-2 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <Info size={28} />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Pedagogical Context</h2>
            <p className="text-slate-600 leading-relaxed">
              In developing multiplicative thinking, we use three primary models: <span className="font-bold text-slate-800">Repeated Addition</span>, the <span className="font-bold text-slate-800">Rectangular Array</span>, and the <span className="font-bold text-slate-800">Cartesian Product</span>. 
              This interactive playground focuses on the <span className="italic">Cartesian product model</span>, helping students move from concrete "mix and match" scenarios to abstract mathematical notation.
            </p>
          </div>
        </section>

        {/* Left Column: Set Management (Aside) */}
        <aside className="lg:col-span-3 space-y-6">
          <section className="bg-white rounded-3xl shadow-sm border-2 border-pink-400 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-pink-600 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-xs">A</div>
                {currentTheme.setALabel}
              </h2>
              <span className="text-[10px] font-black text-pink-500 uppercase">n(A) = {setA.length}</span>
            </div>
            
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {setA.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id} 
                    className="flex items-center justify-between bg-pink-50 p-2 rounded-xl border border-pink-100 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-pink-500 shadow-sm">
                        {item.icon && IconMap[item.icon] ? React.createElement(IconMap[item.icon], { size: 16 }) : <Zap size={16} />}
                      </div>
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    <button 
                      onClick={() => removeItem('A', item.id)}
                      className="text-pink-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={`Add ${currentTheme.setALabel.toLowerCase()}...`}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addItem('A')}
              />
              <button 
                onClick={() => addItem('A')}
                className="bg-pink-500 text-white p-2 rounded-xl hover:bg-pink-600 transition shadow-sm"
              >
                <Plus size={20} />
              </button>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border-2 border-yellow-400 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-yellow-600 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xs">B</div>
                {currentTheme.setBLabel}
              </h2>
              <span className="text-[10px] font-black text-yellow-500 uppercase">n(B) = {setB.length}</span>
            </div>
            
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {setB.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id} 
                    className="flex items-center justify-between bg-yellow-50 p-2 rounded-xl border border-yellow-100 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-yellow-500 shadow-sm">
                        {item.icon && IconMap[item.icon] ? React.createElement(IconMap[item.icon], { size: 16 }) : <Zap size={16} />}
                      </div>
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    <button 
                      onClick={() => removeItem('B', item.id)}
                      className="text-yellow-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder={`Add ${currentTheme.setBLabel.toLowerCase()}...`}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addItem('B')}
              />
              <button 
                onClick={() => addItem('B')}
                className="bg-yellow-500 text-white p-2 rounded-xl hover:bg-yellow-600 transition shadow-sm"
              >
                <Plus size={20} />
              </button>
            </div>
          </section>
        </aside>

        {/* Right Column: Visualization Section */}
        <section className="lg:col-span-9 bg-white rounded-[2rem] p-8 shadow-inner border border-slate-200 flex flex-col min-h-[600px]">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-black text-slate-800">The Cartesian Product (A × B)</h2>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('tree')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'tree' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Tree View
              </button>
              <button
                onClick={() => setViewMode('pairs')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'pairs' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Set Notation
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar relative">
            <AnimatePresence mode="wait">
              {viewMode === 'grid' && (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full flex items-center justify-center p-4"
                >
                  <table className="border-separate border-spacing-2">
                    <thead>
                      <tr>
                        <th className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-300">
                          <X size={20} className="mx-auto" />
                        </th>
                        {setB.map(item => (
                          <th key={item.id} className="p-4 bg-yellow-50 border border-yellow-100 rounded-2xl text-yellow-600 font-bold text-xs min-w-[100px]">
                            <div className="flex flex-col items-center gap-1">
                              {item.icon && IconMap[item.icon] ? React.createElement(IconMap[item.icon], { size: 20 }) : null}
                              {item.label}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {setA.map(itemA => (
                        <tr key={itemA.id}>
                          <td className="p-4 bg-pink-50 border border-pink-100 rounded-2xl text-pink-600 font-bold text-xs">
                            <div className="flex flex-col items-center gap-1">
                              {itemA.icon && IconMap[itemA.icon] ? React.createElement(IconMap[itemA.icon], { size: 20 }) : null}
                              {itemA.label}
                            </div>
                          </td>
                          {setB.map(itemB => (
                            <td key={`${itemA.id}-${itemB.id}`} className="p-1">
                              <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-4 flex flex-col items-center justify-center gap-2 group hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
                                <div className="flex items-center gap-2 text-2xl group-hover:scale-110 transition-transform">
                                  {itemA.icon && IconMap[itemA.icon] ? React.createElement(IconMap[itemA.icon], { size: 18, className: 'text-pink-500' }) : null}
                                  {itemB.icon && IconMap[itemB.icon] ? React.createElement(IconMap[itemB.icon], { size: 18, className: 'text-yellow-500' }) : null}
                                </div>
                                <div className="text-[10px] font-mono bg-white px-2 py-1 rounded border opacity-60 group-hover:opacity-100">
                                  ({itemA.label}, {itemB.label})
                                </div>
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {viewMode === 'tree' && (
                <motion.div
                  key="tree"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex items-start justify-center pt-10"
                >
                  <div className="flex gap-16">
                    <div className="flex flex-col justify-center">
                      <div className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs tracking-widest shadow-lg">START</div>
                    </div>
                    <div className="flex flex-col gap-8">
                      {setA.map(itemA => (
                        <div key={itemA.id} className="relative flex items-center group">
                          <div className="h-0.5 w-10 bg-slate-200 absolute -left-10 group-hover:bg-pink-400 transition-colors"></div>
                          <div className="px-5 py-3 bg-pink-50 border-2 border-pink-400 text-pink-700 rounded-2xl font-bold text-sm flex items-center gap-3 shadow-sm min-w-[140px]">
                             {itemA.icon && IconMap[itemA.icon] ? React.createElement(IconMap[itemA.icon], { size: 16 }) : null}
                             {itemA.label}
                          </div>
                          
                          <div className="ml-10 flex flex-col gap-4">
                            {setB.map(itemB => (
                              <div key={itemB.id} className="relative flex items-center group/leaf">
                                <div className="h-0.5 w-10 bg-slate-200 absolute -left-10 group-hover/leaf:bg-yellow-400 transition-colors"></div>
                                <div className="px-5 py-3 bg-yellow-50 border-2 border-yellow-400 text-yellow-700 rounded-2xl font-bold text-sm flex items-center gap-3 shadow-sm min-w-[140px]">
                                  {itemB.icon && IconMap[itemB.icon] ? React.createElement(IconMap[itemB.icon], { size: 16 }) : null}
                                  {itemB.label}
                                </div>
                                <div className="ml-6 px-3 py-1 bg-white border border-slate-200 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-sm">
                                  Ordered Pair
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {viewMode === 'pairs' && (
                <motion.div
                  key="pairs"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="h-full p-6"
                >
                  <div className="mb-8">
                    <h4 className="text-slate-400 uppercase text-xs font-black tracking-widest mb-3">Mathematical Notation</h4>
                    <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl border-4 border-blue-500/30">
                      <code className="text-slate-50 font-mono text-lg leading-loose break-words">
                        <span className="text-blue-400 font-black">A × B</span> = {'{'}
                        <div className="pl-6 pt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                          {cartesianProduct.map((p, i) => (
                            <span key={`${p.a.id}-${p.b.id}`} className="hover:bg-white/10 rounded-xl px-3 py-1 transition-all cursor-default border border-white/5 hover:border-white/20">
                              (<span className="text-pink-300 font-bold">{p.a.label}</span>, <span className="text-yellow-300 font-bold">{p.b.label}</span>)
                              {i < cartesianProduct.length - 1 ? ',' : ''}
                            </span>
                          ))}
                        </div>
                        {'}'}
                      </code>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-pink-50 border-2 border-pink-100 rounded-3xl">
                      <h5 className="font-black text-pink-600 text-xs mb-1 uppercase tracking-widest">Set A (Cardinality: {setA.length})</h5>
                      <code className="text-sm font-semibold mt-2 block">A = {'{'}{setA.map(i => i.label).join(', ')}{'}'}</code>
                    </div>
                    <div className="p-6 bg-yellow-50 border-2 border-yellow-100 rounded-3xl">
                      <h5 className="font-black text-yellow-600 text-xs mb-1 uppercase tracking-widest">Set B (Cardinality: {setB.length})</h5>
                      <code className="text-sm font-semibold mt-2 block">B = {'{'}{setB.map(i => i.label).join(', ')}{'}'}</code>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state nudge */}
            {(setA.length === 0 || setB.length === 0) && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-20">
                <div className="text-center space-y-4 max-w-xs p-6 bg-white rounded-[2rem] shadow-xl border-2 border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Info size={32} />
                  </div>
                  <h3 className="font-bold text-slate-800">Add items to both sets</h3>
                  <p className="text-sm text-slate-500 italic">A Cartesian product needs elements in both groups to create pairs!</p>
                </div>
              </div>
            )}
          </div>

          {/* Discovery Card (Footer level) */}
          <div className="mt-8 bg-blue-600 text-white p-6 rounded-3xl flex items-center justify-between shadow-lg shadow-blue-200">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">The Discovery</span>
              <p className="text-xl font-medium italic">"When we pair every item in Set A with every item in Set B, we multiply their sizes."</p>
            </div>
            <div className="text-4xl font-black tabular-nums bg-white/20 p-4 px-6 rounded-2xl border border-white/30 text-center min-w-[140px]">
              {setA.length} × {setB.length} = {cartesianProduct.length}
            </div>
          </div>
        </section>
      </main>

      <footer className="grow-0 bg-slate-800 text-slate-400 p-4 flex justify-between items-center text-xs font-semibold px-8 border-t border-slate-700">
        <div className="flex gap-6">
          <span>&copy; 2026 Math Pedagogy Interactive</span>
          <span className="opacity-60">Teachers Edition v1.0</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span>System Active: Set Theory Sandbox</span>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
