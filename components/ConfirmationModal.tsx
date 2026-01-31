import React from 'react';
import { WhatsappIcon } from './Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 px-6 animate-fade-in-up">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#020617]/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-sm glass-panel rounded-2xl p-6 shadow-2xl ring-1 ring-white/10 transform transition-all">
        <div className="flex flex-col items-center text-center">
          
          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-5 ring-1 ring-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <WhatsappIcon className="w-8 h-8 text-emerald-400" />
          </div>
          
          <h3 className="text-xl font-bold text-white leading-tight mb-3">
            Você falará agora com uma <span className="text-emerald-400">especialista</span>
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
            A Gisele vai te ajudar a entender as melhores opções de plano para o seu perfil.
            <strong className="block text-slate-300 font-medium mt-2">Atendimento humano, sem compromisso.</strong>
          </p>

          <div className="w-full space-y-3">
            <button 
              onClick={onConfirm}
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] group"
            >
              <WhatsappIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Continuar para o WhatsApp
            </button>
            
            <button 
              onClick={onClose}
              className="w-full h-10 text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};