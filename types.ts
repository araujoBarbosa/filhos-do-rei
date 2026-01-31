export type PlanType = 'individual' | 'familiar' | 'empresarial' | 'adesao';

export interface FormData {
  name: string;
  city: string;
  age: string; // Keeping as string to allow ranges or exact numbers
  planType: PlanType;
  copay: 'sim' | 'nao' | 'indiferente';
  whatsapp: string;
}

export interface PlanCardProps {
  title: string;
  badge?: string;
  description: string;
  features: string[];
  recommendedFor: string;
  color: 'blue' | 'emerald' | 'purple';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WhatsappMessageTemplate {
  label: string;
  message: (data: FormData) => string;
}