'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, MenuIcon, ChevronDown, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  restaurant: string;
  message: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ==========================================
// ELEGANT SPLASH SCREEN WITH LARGE LOGO
// ==========================================
function MinimalSplash({ onComplete }: { onComplete: () => void }) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onComplete, 100);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out"
      style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'auto' }}
    >
      <style>{`
        @keyframes scale-breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.95; }
        }
        .animate-scale-breathe { 
          animation: scale-breathe 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; 
        }
      `}</style>
      
      <div className="animate-scale-breathe">
        <img 
          src="/tabscan-logo.png" 
          alt="TabScan" 
          className="h-40 w-auto drop-shadow-xl"
        />
      </div>
      <p className="text-slate-500 tracking-widest uppercase text-xs font-light mt-8 letter-spacing-wide">Loading...</p>
    </div>
  );
}

// ==========================================
// CUSTOM SVG ICONS
// ==========================================
function DigitalMenuIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="8" y="6" width="32" height="36" rx="2"/>
      <path d="M14 14h20M14 22h20M14 30h20"/>
      <circle cx="37" cy="9" r="2" fill="currentColor"/>
    </svg>
  );
}

function OrderIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 12h32v24H8z"/>
      <path d="M16 12V8h16v4M24 28v-8M18 28v-8M30 28v-8"/>
      <circle cx="24" cy="20" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function KitchenDisplayIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="6" y="8" width="36" height="26" rx="2"/>
      <line x1="18" y1="36" x2="30" y2="36" strokeWidth="1.2"/>
      <line x1="22" y1="36" x2="22" y2="40" strokeWidth="1.2"/>
      <line x1="26" y1="36" x2="26" y2="40" strokeWidth="1.2"/>
      <path d="M12 16l8 6-2 4M28 16l8 6-2 4"/>
    </svg>
  );
}

function InventoryIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="8" y="10" width="32" height="28" rx="2"/>
      <line x1="8" y1="18" x2="40" y2="18"/>
      <line x1="14" y1="10" x2="14" y2="38"/>
      <line x1="24" y1="10" x2="24" y2="38"/>
      <line x1="34" y1="10" x2="34" y2="38"/>
    </svg>
  );
}

function MonitoringIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="24" cy="20" r="12"/>
      <path d="M12 20c0-6.6 5.4-12 12-12s12 5.4 12 12"/>
      <path d="M18 28v2h12v-2"/>
      <path d="M20 30h8"/>
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 34h32"/>
      <path d="M10 28l6-8 6 4 8-10 6 8"/>
      <circle cx="16" cy="20" r="2" fill="currentColor"/>
      <circle cx="22" cy="24" r="2" fill="currentColor"/>
      <circle cx="30" cy="14" r="2" fill="currentColor"/>
    </svg>
  );
}

// ==========================================
// FAQ COMPONENT
// ==========================================
function FAQItemComponent({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <h3 className="text-lg font-semibold text-slate-900 pr-4 group-hover:text-red-600 transition-colors duration-300">
          {item.question}
        </h3>
        <ChevronDown 
          size={20} 
          className={`text-slate-400 group-hover:text-red-600 transition-all duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <p className="text-base text-slate-600 leading-relaxed mt-4">
          {item.answer}
        </p>
      )}
    </div>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function TabScanLanding() {
const [showSplash, setShowSplash] = useState(true);
const [showModal, setShowModal] = useState<boolean>(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    restaurant: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const features = [
    { 
      icon: DigitalMenuIcon, 
      title: 'Digitales Menü', 
      description: 'Speisekarten digital verwalten, QR-Codes generieren, mehrsprachig'
    },
    { 
      icon: OrderIcon, 
      title: 'Bestellplattform', 
      description: 'Gäste bestellen direkt vom Handy mit Payment-Integration'
    },
    { 
      icon: KitchenDisplayIcon, 
      title: 'Kitchen Display System', 
      description: 'Echtzeit Bestellungen in der Küche, Effizienz optimieren'
    },
    { 
      icon: InventoryIcon, 
      title: 'Lagerverwaltung', 
      description: 'Bestände überwachen, automatische Benachrichtigungen'
    },
    { 
      icon: MonitoringIcon, 
      title: 'Live Monitoring', 
      description: 'Echtzeit-Updates, Alerts, vollständiger Überblick'
    },
    { 
      icon: AnalyticsIcon, 
      title: 'Analytics & Insights', 
      description: 'Tagesumsatz, Bestseller, Gast-Verhalten analysieren'
    },
  ];

  const faqItems: FAQItem[] = [
    {
      question: 'Was ist TabScan?',
      answer: 'TabScan ist eine flexible Plattform für digitale Gastronomie-Lösungen. Wir bieten modulare Features wie digitale Menüs, Bestellsysteme, Kitchen Display und Analytics – je nachdem was dein Restaurant braucht.'
    },
    {
      question: 'Wie schnell ist die Implementierung?',
      answer: 'Basic Setup funktioniert in 5 Minuten. Für Enterprise-Konfiguration mit Custom-Features rechnen wir 2-3 Wochen. Es hängt von deinen spezifischen Anforderungen ab.'
    },
    {
      question: 'Ist das DSGVO-konform?',
      answer: 'Ja, absolut. Alle Daten sind verschlüsselt, auf Schweizer Servern gehostet, DSGVO-konform und mit höchsten Sicherheitsstandards geschützt.'
    },
    {
      question: 'Können wir mehrere Standorte verwalten?',
      answer: 'Ja! TabScan ist multi-location fähig. Ein zentrales Dashboard für alle deine Standorte oder separate Management – ganz wie du es möchtest.'
    },
    {
      question: 'Wie funktioniert die Preisgestaltung?',
      answer: 'Wir bieten flexible Lösungen für jede Größe. Von Starter-Paketen für kleine Restaurants bis zu Custom-Enterprise-Lösungen. Kontaktiere uns für eine personalisierte Quote.'
    },
    {
      question: 'Können wir unsere Hardware integrieren?',
      answer: 'Ja, TabScan ist hardware-agnostisch. Du kannst bestehende Systeme integrieren oder neue hinzufügen. Wir unterstützen flexible Integration mit verschiedenen Plattformen.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setShowModal(false);
          setFormData({ name: '', email: '', restaurant: '', message: '' });
          setSubmitted(false);
          setIsLoading(false);
        }, 2000);
      } else {
        const errorMessage = typeof data.error === 'string' 
          ? data.error 
          : (data.error?.message || 'Email konnte nicht versendet werden');
        setError(errorMessage);
        setIsLoading(false);
      }
    } catch (error) {
      setError('Fehler beim Versenden. Bitte versuche es später erneut.');
      setIsLoading(false);
    }
  };

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // SHOW SPLASH SCREEN FIRST
  if (showSplash) return <MinimalSplash onComplete={() => setShowSplash(false)} />;

  return (
    <div className="bg-white text-slate-900">
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes subtle-hover {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-subtle-hover {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-subtle-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      {/* Navigation */}
     <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 z-40">
  <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
    <div className="flex items-center">
      <img 
        src="/tabscan-logo.png" 
        alt="TabScan" 
        className="h-24 w-auto"
      />
    </div>
    
    <div className="hidden md:flex gap-8 items-center">
      <button 
        onClick={() => scrollToSection('features')}
        className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-300"
      >
        Features
      </button>
      <button 
        onClick={() => scrollToSection('pricing')}
        className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-300"
      >
        Pricing
      </button>
      <button 
        onClick={() => scrollToSection('faq')}
        className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-300"
      >
        FAQ
      </button>
      <Link 
        href="/blog"
        className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-300"
      >
        Blog
      </Link>
      <button 
        onClick={() => setShowModal(true)}
        className="px-6 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-all duration-300"
      >
        Demo
      </button>
    </div>

    <button 
      className="md:hidden p-2"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
    </button>
  </div>

  {mobileMenuOpen && (
    <div className="md:hidden border-t border-slate-100 p-6 space-y-4">
      <button 
        onClick={() => {
          scrollToSection('features');
          setMobileMenuOpen(false);
        }}
        className="block w-full text-left text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-300 py-2"
      >
        Features
      </button>
      <button 
        onClick={() => {
          scrollToSection('pricing');
          setMobileMenuOpen(false);
        }}
        className="block w-full text-left text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-300 py-2"
      >
        Pricing
      </button>
      <button 
        onClick={() => {
          scrollToSection('faq');
          setMobileMenuOpen(false);
        }}
        className="block w-full text-left text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-300 py-2"
      >
        FAQ
      </button>
      <Link 
        href="/blog"
        className="block text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-300 py-2"
        onClick={() => setMobileMenuOpen(false)}
      >
        Blog
      </Link>
      <button 
        onClick={() => {
          setShowModal(true);
          setMobileMenuOpen(false);
        }}
        className="w-full mt-4 px-6 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-all duration-300"
      >
        Demo
      </button>
    </div>
  )}
</nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              🇨🇭 Swiss Enterprise Solution
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight animate-fade-in-up delay-100">
            Die digitale Zukunft deines Restaurants
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Moderne Lösungen für digitale Menüs, Bestellungen, Kitchen Management und Analytics. Flexibel skalierbar für jede Größe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up delay-300">
            <button 
              onClick={() => setShowModal(true)}
              className="px-8 py-3.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2 animate-subtle-hover"
            >
              Kostenlose Demo
              <ArrowRight size={18} />
            </button>
            
            <button 
              onClick={() => scrollToSection('features')}
              className="px-8 py-3.5 border-2 border-slate-200 text-slate-900 rounded-lg font-semibold hover:border-red-600 hover:text-red-600 transition-all duration-300 animate-subtle-hover"
            >
              Mehr erfahren
            </button>
          </div>

          <div className="mt-16 pt-16 border-t border-slate-100 animate-fade-in-up delay-400">
            <p className="text-sm text-slate-500 mb-6">Vertraut von führenden Restaurants in der Schweiz</p>
            <div className="flex justify-center gap-12 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">500+</div>
                <p className="text-xs text-slate-600 mt-1">Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">99.9%</div>
                <p className="text-xs text-slate-600 mt-1">Uptime</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">24/7</div>
                <p className="text-xs text-slate-600 mt-1">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Alles was du brauchst
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Modulare Features, die du kombinieren kannst – je nachdem was dein Restaurant braucht
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-xl p-8 border border-slate-100 animate-fade-in-up animate-subtle-hover"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-5 text-slate-400">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why TabScan */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">
            Warum TabScan?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'Blitzschnell Setup', desc: '5 Minuten bis dein Menü online ist' },
              { title: 'Schweizer Qualität', desc: 'Gehostet auf Schweizer Servern, DSGVO-konform' },
              { title: 'Flexible Skalierbarkeit', desc: 'Passt sich deinem Wachstum an' },
              { title: 'Enterprise-ready', desc: 'Sicherheit, Zuverlässigkeit, Support auf höchstem Niveau' },
              { title: 'Moderne Technologie', desc: 'Built with Next.js, React, und Supabase' },
              { title: 'Kundenorientiert', desc: 'Dein Feedback prägt die Weiterentwicklung' }
            ].map((item, idx) => (
              <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.08}s` }}>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-red-600 transition-colors duration-300">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Flexible Preisgestaltung
            </h2>
            <p className="text-lg text-slate-600">
              Von kleinen Restaurants bis Enterprise – wir haben das richtige Paket für dich
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                desc: 'Für kleine Restaurants',
                features: ['Digitales Menü', 'QR-Codes', 'Basic Analytics', 'Mobile App']
              },
              {
                name: 'Professional',
                desc: 'Für wachsende Betriebe',
                features: ['Alles von Starter +', 'Bestellsystem', 'Kitchen Display', 'Advanced Analytics', 'Multi-Location'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                desc: 'Für große Ketten',
                features: ['Alles von Professional +', 'Custom Features', 'Dedicated Manager', 'API Access', 'White Label']
              }
            ].map((plan, idx) => (
              <div 
                key={idx}
                className={`rounded-xl p-8 border transition-all duration-300 animate-fade-in-up animate-subtle-hover ${
                  plan.highlighted 
                    ? 'bg-red-50 border-red-200 shadow-lg' 
                    : 'bg-white border-slate-100'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {plan.highlighted && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase">
                      Beliebt
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 text-sm mb-6">{plan.desc}</p>
                <p className="text-sm text-slate-500 mb-6">Custom Pricing</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check size={16} className="text-red-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setShowModal(true)}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'border border-slate-200 text-slate-900 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  Kontaktieren
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-lg text-slate-600">
              Alles, was du über TabScan wissen solltest
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {faqItems.map((item, index) => (
              <FAQItemComponent key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Bereit für die digitale Transformation?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Starten wir mit einer kostenlosen Demo. Keine Verpflichtung, keine versteckten Kosten.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="px-8 py-3.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
          >
            Demo anfordern
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-600">
            © 2024 TabScan. Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <Link href="/blog" className="hover:text-slate-900 transition-colors">
              Blog
            </Link>
            <span>•</span>
            <div className="flex items-center gap-2">
              Made with ❤️ in Switzerland
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-xl border border-slate-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors duration-300"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Vielen Dank!</h2>
                <p className="text-slate-600">Unser Team kontaktiert dich in Kürze.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Demo anfordern</h2>
                <p className="text-slate-600 mb-6 text-sm">
                  Lass uns deine Anforderungen besprechen
                </p>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-2 uppercase">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:bg-slate-50"
                      placeholder="Dein Name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-2 uppercase">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:bg-slate-50"
                      placeholder="deine@email.ch"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-2 uppercase">Restaurant</label>
                    <input
                      type="text"
                      name="restaurant"
                      value={formData.restaurant}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:bg-slate-50"
                      placeholder="Name deines Betriebs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-2 uppercase">Nachricht</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:bg-slate-50 h-24 resize-none"
                      placeholder="z.B. Digitales Menü, Bestellungen, Kitchen Display..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isLoading ? '⏳ Wird gesendet...' : 'Demo anfordern'}
                  </button>
                </form>

                <p className="text-xs text-slate-500 text-center mt-4">
                  Keine Spam, nur echte Werte
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}