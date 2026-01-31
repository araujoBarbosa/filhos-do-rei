import { FAQItem, PlanCardProps, FormData } from './types';

// Config
export const WHATSAPP_NUMBER = "5511982165212";
export const BRAND_NAME = "Filhos do Rei";

// Data
export const PLANS: PlanCardProps[] = [
  {
    title: "Essencial",
    description: "Para quem prioriza proteção em casos graves e consultas básicas com o menor investimento possível.",
    features: [
      "Cobertura para Urgência e Emergência",
      "Rede credenciada selecionada",
      "Ótimo para quem está sem cobertura",
      "Opções com coparticipação inteligente"
    ],
    recommendedFor: "Jovens e Economia",
    color: "blue"
  },
  {
    title: "Conforto",
    badge: "Escolha das Famílias",
    description: "O equilíbrio ideal. Tenha acesso a bons hospitais e laboratórios sem pagar mensalidades abusivas.",
    features: [
      "Hospitais de qualidade reconhecida",
      "Cobertura completa (Ambulatorial + Hospitalar)",
      "Rede ampla de médicos e laboratórios",
      "Acomodação em Enfermaria ou Apartamento"
    ],
    recommendedFor: "Famílias e Casais",
    color: "emerald"
  },
  {
    title: "Exclusivo",
    badge: "Alto Padrão",
    description: "Acesso aos hospitais de elite (Linha A), reembolso robusto e atendimento preferencial.",
    features: [
      "Hospitais de Referência Premium",
      "Alto valor de reembolso (Livre escolha)",
      "Seguro Viagem Internacional",
      "Coleta de exames domiciliar"
    ],
    recommendedFor: "Executivos e Empresários",
    color: "purple"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Como posso reduzir o valor do meu plano atual?",
    answer: "Muitas vezes você paga por coberturas que não usa. Nossa consultoria analisa seu perfil para encontrar planos com rede similar, porém mais econômicos, ou migrar para opções com coparticipação que reduzem a mensalidade fixa em até 40%."
  },
  {
    question: "Tenho CNPJ. O desconto é real?",
    answer: "Sim! Planos empresariais (inclusive MEI) chegam a custar 35% a menos que planos de pessoa física. Basta ter o CNPJ ativo e incluir a partir de 2 vidas (sócios, funcionários ou familiares dependentes)."
  },
  {
    question: "Existe carência se eu trocar de plano?",
    answer: "Não necessariamente. Se você já possui um plano ativo há algum tempo, conseguimos fazer a 'Portabilidade de Carências' ou 'Compra de Carência', permitindo que você mude de operadora sem cumprir novos prazos para consultas e exames."
  },
  {
    question: "O atendimento da corretora continua após a venda?",
    answer: "Absolutamente. Na Filhos do Rei, nosso compromisso é vitalício. Auxiliamos em questões de reembolso, autorizações, inclusão de dependentes e renovações. Você nunca ficará sem suporte."
  }
];

export const generateWhatsappMessage = (data: FormData): string => {
  const ageLabel = data.planType === 'individual' ? 'Idade' : 'Idades';
  
  return `Olá Gisele, tudo bem? 😊

Acabei de preencher a simulação no site da Filhos do Rei.
Para facilitar, aqui estão meus dados preliminares:

👤 *Nome:* ${data.name}
📍 *Cidade:* ${data.city}
🎂 *${ageLabel}:* ${data.age}
🏥 *Modalidade:* ${data.planType.toUpperCase()}
💳 *Preferência:* ${data.copay}

Poderia me ajudar a encontrar a melhor opção para o meu perfil, por favor?`;
};