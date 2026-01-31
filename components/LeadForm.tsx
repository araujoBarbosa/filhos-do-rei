import React, { useState } from 'react';
import { FormData, PlanType } from '../types';
import { generateWhatsappMessage, WHATSAPP_NUMBER } from '../constants';
import { WhatsappIcon, LockIcon } from './Icons';
import { ConfirmationModal } from './ConfirmationModal';

interface Props {
  initialPlan?: PlanType;
}

const LeadForm: React.FC<Props> = ({ initialPlan = 'individual' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    city: '',
    age: '',
    planType: initialPlan,
    copay: 'indiferente',
    whatsapp: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [pendingLink, setPendingLink] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Mask (99) 99999-9999
    if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 9) value = `${value.slice(0, 10)}-${value.slice(10)}`;
    
    setFormData(prev => ({ ...prev, whatsapp: value }));
  };

  // Função de Backup do Lead (Fail Silent)
  const submitLeadBackup = (data: FormData) => {
    const ENDPOINT = "https://api.sheetmonkey.io/form/SEU_ENDPOINT_AQUI";
    
    const payload = {
      nome: data.name,
      whatsapp: data.whatsapp,
      cidade: data.city,
      idades: data.age,
      modalidade: data.planType,
      preferencia: data.copay,
      origem: "site_filhos_do_rei",
      data_hora: new Date().toISOString()
    };

    // Fire and forget: Não usamos await para não bloquear a UI
    fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).catch(err => console.warn('Lead backup error (silent):', err));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if(formData.whatsapp.replace(/\D/g, '').length < 10) {
      alert("Por favor, digite um telefone válido com DDD.");
      return;
    }

    // Dispara backup dos dados (assíncrono e silencioso)
    submitLeadBackup(formData);

    const text = generateWhatsappMessage(formData);
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    
    setPendingLink(link);
    setShowModal(true);
  };

  const handleConfirmSubmit = () => {
    // GTM: Form Submit Event (Tracked only on confirmation)
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'form_submit',
        modality: formData.planType,
        city: formData.city,
        ages: formData.age
      });
    } catch (err) {
      console.error("GTM Error:", err);
    }

    window.open(pendingLink, '_blank');
    setShowModal(false);
  };

  return (
    <>
      <ConfirmationModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={handleConfirmSubmit} 
      />

      <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden ring-1 ring-white/10">
        {/* Decorative Glow - Subtle ambient light */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
             <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Cotação <span className="text-emerald-400">Inteligente</span></h3>
             <p className="text-slate-400 text-sm leading-tight max-w-xs mx-auto">Nossa IA encontra o melhor custo-benefício para o seu perfil em segundos.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="group">
              <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">Nome Completo</label>
              <input 
                required
                name="name"
                type="text"
                placeholder="Digite seu nome"
                autoComplete="name"
                className="w-full h-12 px-4 rounded-xl glass-input placeholder-slate-600 text-sm md:text-base font-medium"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">Cidade/UF</label>
                <input 
                  required
                  name="city"
                  type="text"
                  placeholder="Ex: São Paulo"
                  className="w-full h-12 px-4 rounded-xl glass-input placeholder-slate-600 text-sm md:text-base font-medium"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                 <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">Idades <span className="text-[9px] normal-case tracking-normal opacity-50">(sep. vírgula)</span></label>
                 <input 
                  required
                  name="age"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex: 32, 28, 5"
                  className="w-full h-12 px-4 rounded-xl glass-input placeholder-slate-600 text-sm md:text-base font-medium"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">Modalidade</label>
                <div className="relative">
                  <select 
                    name="planType" 
                    value={formData.planType} 
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl glass-input text-sm md:text-base font-medium appearance-none cursor-pointer"
                  >
                    <option value="individual">Individual</option>
                    <option value="familiar">Familiar</option>
                    <option value="empresarial">Empresarial (CNPJ)</option>
                    <option value="adesao">Adesão (Profissão)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">Preferência</label>
                <div className="relative">
                  <select 
                    name="copay" 
                    value={formData.copay} 
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl glass-input text-sm md:text-base font-medium appearance-none cursor-pointer"
                  >
                    <option value="indiferente">Indiferente</option>
                    <option value="sim">Com Coparticipação</option>
                    <option value="nao">Sem Coparticipação</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">Seu WhatsApp</label>
              <input 
                required
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(DD) 99999-9999"
                className="w-full h-12 px-4 rounded-xl glass-input placeholder-slate-600 text-sm md:text-base font-medium"
                value={formData.whatsapp}
                onChange={handlePhoneMask}
              />
            </div>

            <div>
              <button 
                type="submit" 
                className="w-full h-14 group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-[0.99] text-white font-bold text-lg rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 mt-8 border border-white/10"
              >
                <WhatsappIcon className="w-6 h-6" />
                <span>Ver Tabela de Preços</span>
              </button>
              <p className="text-center text-xs text-emerald-400/80 mt-3 font-medium tracking-wide">
                Atendimento humano, sem compromisso.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] mt-6 font-medium border-t border-white/5 pt-4">
              <LockIcon className="w-3 h-3 opacity-70" />
              <span>Seus dados são usados apenas para essa cotação.</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LeadForm;