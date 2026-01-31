import React, { useRef, useState } from 'react';
import LeadForm from './components/LeadForm';
import PlanCard from './components/PlanCard';
import FAQ from './components/FAQ';
import { ConfirmationModal } from './components/ConfirmationModal';
import { PLANS, FAQS, WHATSAPP_NUMBER } from './constants';
import { StarIcon, ShieldIcon, ClockIcon, WhatsappIcon } from './components/Icons';

function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingSource, setPendingSource] = useState<string>('');

  const scrollToForm = (source?: string) => {
    if (source) {
       try {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'cta_click',
          source: source
        });
      } catch (err) {
        console.error("GTM Error:", err);
      }
    }
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Step 1: Trigger Modal
  const openDirectWhatsapp = (source: string) => {
     setPendingSource(source);
     setShowModal(true);
  };

  // Step 2: Confirm and Redirect
  const handleConfirmWhatsapp = () => {
    // GTM: WhatsApp Click Event (Tracked only on confirmation)
     try {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'whatsapp_click',
          source: pendingSource
        });
      } catch (err) {
        console.error("GTM Error:", err);
      }
     
     const message = "Olá Gisele, vim pelo site da Filhos do Rei e gostaria de fazer uma cotação de plano de saúde 😊";
     window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
     setShowModal(false);
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0 overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200 font-sans">
      <ConfirmationModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={handleConfirmWhatsapp} 
      />

      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">F</div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">Filhos do <span className="text-emerald-400">Rei</span></span>
          </div>
          <button onClick={() => openDirectWhatsapp('header')} className="hidden md:flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors text-sm border border-emerald-500/20 px-5 py-2 rounded-full hover:bg-emerald-500/10 hover:border-emerald-500/40">
            <WhatsappIcon className="w-4 h-4" />
            <span>Consultoria Gratuita</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 md:pt-40 md:pb-32 overflow-hidden">
        {/* Premium Light Blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none opacity-50"></div>

        <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <div className="space-y-8 text-center md:text-left animate-fade-in-up">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.1)] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Consultoria Especializada
            </div>

            <h1 className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Saúde da sua família <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-blue-400">
                sem preços abusivos.
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto md:mx-0 leading-relaxed font-light">
              Na <strong>Filhos do Rei</strong>, combinamos tecnologia e atendimento humano para encontrar o plano ideal. Economize até 40% com segurança.
            </p>

            {/* Mobile-optimized buttons */}
            <div className="flex flex-col gap-3 w-full max-w-xs mx-auto md:max-w-none md:flex-row md:justify-start pt-2">
              <button 
                onClick={() => scrollToForm('hero_primary')}
                className="w-full md:w-auto h-14 md:h-12 px-8 bg-white text-brand-dark font-bold rounded-xl md:rounded-full hover:bg-slate-200 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center text-base"
              >
                Simular Agora
              </button>
              <button 
                onClick={() => openDirectWhatsapp('hero_secondary')}
                className="w-full md:w-auto h-12 md:h-12 px-8 bg-white/5 border border-white/10 text-white font-semibold rounded-xl md:rounded-full hover:bg-white/10 transition-colors active:scale-[0.98] flex items-center justify-center text-base backdrop-blur-sm"
              >
                Falar no WhatsApp
              </button>
            </div>

            <div className="pt-4 md:pt-6 flex flex-wrap items-center justify-center md:justify-start gap-5 text-slate-500 text-xs font-medium">
              <div className="flex items-center gap-1.5 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5">
                <div className="flex text-yellow-500/90">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} className="w-3 h-3" />)}
                </div>
                <span className="ml-1 text-slate-300">5.0</span>
              </div>
              <span className="text-slate-400 tracking-wide">+15k Vidas Seguradas</span>
            </div>
          </div>

          <div className="relative mt-6 md:mt-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Form is anchored here */}
            <div ref={formRef}>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Triggers / How it Works */}
      <section className="py-16 md:py-24 bg-[#0F172A]/30 border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">Segurança e agilidade</h2>
            <p className="text-sm md:text-base text-slate-400 px-4 max-w-2xl mx-auto font-light">
              Entendemos sua necessidade para oferecer a solução exata com o menor custo possível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                icon: <ClockIcon className="w-6 h-6 md:w-7 md:h-7 text-blue-400" />, 
                title: "1. Envio dos Dados", 
                desc: "Informe seu perfil no formulário seguro. Tecnologia criptografada." 
              },
              { 
                icon: <ShieldIcon className="w-6 h-6 md:w-7 md:h-7 text-emerald-400" />, 
                title: "2. Estudo Personalizado", 
                desc: "Nossa IA cruza dados de +20 operadoras para seu CEP." 
              },
              { 
                icon: <WhatsappIcon className="w-6 h-6 md:w-7 md:h-7 text-teal-400" />, 
                title: "3. Receba no WhatsApp", 
                desc: "Comparativo detalhado enviado em minutos. Sem burocracia." 
              }
            ].map((step, idx) => (
              <div key={idx} className="glass-panel p-6 md:p-8 rounded-2xl flex md:block items-start md:text-center gap-4 hover:bg-white/[0.04] transition-colors group">
                <div className="flex-shrink-0 p-3 md:p-4 rounded-xl bg-slate-900 border border-white/10 md:inline-flex md:mb-6 shadow-inner group-hover:border-white/20 transition-colors">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-3 text-slate-100">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">Escolha seu perfil</h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto font-light">Trabalhamos com todas as seguradoras líderes do mercado nacional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PLANS.map((plan, idx) => (
              <PlanCard key={idx} plan={plan} onSelect={() => scrollToForm(`plan_card_${plan.title}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#020617] relative">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white">Dúvidas Frequentes</h2>
          <FAQ items={FAQS} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#020617] text-center pb-32 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-6 opacity-80">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded flex items-center justify-center text-white text-xs font-bold">F</div>
            <span className="font-bold tracking-tight text-white">Filhos do <span className="text-emerald-400">Rei</span></span>
          </div>
          <p className="text-slate-500 text-xs mb-4 px-4 leading-relaxed font-light">
            A Filhos do Rei é uma corretora especializada em benefícios. <br className="hidden md:block"/>
            Nossa missão é proteger famílias e empresas com transparência.
          </p>
          <p className="text-slate-600 text-[10px] uppercase tracking-wider font-semibold">© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Sticky Mobile CTA with Safe Area Support */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#020617]/90 backdrop-blur-xl border-t border-white/10 z-50 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <button 
          onClick={() => scrollToForm('mobile_sticky')}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 active:from-emerald-700 active:to-teal-700 text-white font-bold h-14 rounded-xl shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-3 transition-all text-lg"
        >
          <WhatsappIcon className="w-6 h-6" />
          Receber Cotação
        </button>
      </div>
    </div>
  );
}

export default App;