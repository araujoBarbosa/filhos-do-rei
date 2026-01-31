import React from 'react';
import { PlanCardProps } from '../types';
import { CheckIcon } from './Icons';

interface Props {
  plan: PlanCardProps;
  onSelect: () => void;
}

const PlanCard: React.FC<Props> = ({ plan, onSelect }) => {
  // Cores mais sofisticadas e sutis
  const getGradientBorder = () => {
    switch(plan.color) {
      case 'emerald': return 'group-hover:border-emerald-500/30';
      case 'purple': return 'group-hover:border-purple-500/30';
      case 'blue': return 'group-hover:border-blue-500/30';
      default: return 'group-hover:border-white/20';
    }
  };

  const getGlowColor = () => {
    switch(plan.color) {
      case 'emerald': return 'from-emerald-500/5 to-transparent';
      case 'purple': return 'from-purple-500/5 to-transparent';
      case 'blue': return 'from-blue-500/5 to-transparent';
      default: return 'from-white/5 to-transparent';
    }
  };

  const getBadgeStyle = () => {
    switch(plan.color) {
      case 'emerald': return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      case 'purple': return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
      default: return 'bg-slate-700 text-gray-200';
    }
  };

  const getButtonStyle = () => {
     switch(plan.color) {
      case 'emerald': return 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/40';
      case 'purple': return 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/40';
      default: return 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10';
    }
  };

  const getIconColor = () => {
     switch(plan.color) {
      case 'emerald': return 'text-emerald-400';
      case 'purple': return 'text-purple-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className={`group relative flex flex-col p-6 rounded-2xl glass-panel transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-2xl border border-transparent ${getGradientBorder()}`}>
      
      {/* Background Glow */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${getGlowColor()} opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

      {plan.badge && (
        <span className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md shadow-lg ${getBadgeStyle()}`}>
          {plan.badge}
        </span>
      )}
      
      <div className="relative z-10 text-center mb-6 mt-2">
        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{plan.title}</h3>
        <p className="text-sm text-slate-400 min-h-[40px] leading-relaxed font-light">{plan.description}</p>
      </div>

      <div className="relative z-10 flex-grow space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className={`mt-0.5 p-0.5 rounded-full bg-white/[0.03] border border-white/5 ${getIconColor()}`}>
              <CheckIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-300 text-sm leading-snug font-light">{feature}</span>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-auto">
        <p className="text-[10px] text-center text-slate-500 mb-3 uppercase tracking-wider font-semibold">Ideal para: <span className="text-slate-300">{plan.recommendedFor}</span></p>
        <button 
          onClick={onSelect}
          className={`w-full h-12 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg active:scale-[0.98] ${getButtonStyle()}`}
        >
          Cotar Plano {plan.title}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;