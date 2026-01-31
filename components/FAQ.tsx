import React, { useState } from 'react';
import { FAQItem } from '../types';
import { ChevronDownIcon } from './Icons';

interface Props {
  items: FAQItem[];
}

const FAQ: React.FC<Props> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'bg-white/[0.05] border-white/20 shadow-lg' : 'hover:bg-white/[0.04]'}`}>
          <button
            onClick={() => toggle(idx)}
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            aria-expanded={openIndex === idx}
          >
            <span className={`font-medium pr-4 leading-snug transition-colors ${openIndex === idx ? 'text-white' : 'text-slate-300'}`}>{item.question}</span>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transform transition-all duration-300 ${openIndex === idx ? 'rotate-180 bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-400'}`}>
               <ChevronDownIcon className="w-5 h-5" />
            </div>
          </button>
          
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-5 pt-0 text-slate-400 text-sm leading-relaxed mt-0">
              <div className="h-px w-full bg-white/5 mb-4"></div>
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;