'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, Menu, Smartphone, TrendingUp, Users, Lock, Zap, Shield, Rocket, X, MenuIcon, ChevronDown, Database, Eye, Package } from 'lucide-react';

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

// Parallax Splash Screen
function ParallaxSplash({ onComplete }: { onComplete: () => void }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setScrollProgress(Math.min(progress, 100));
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
        }
      }, 30);
      
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const logoScale = 1 - scrollProgress * 0.004;
  const logoX = scrollProgress * 1.5;
  const opacity = Math.max(0, 1 - scrollProgress * 0.02);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 z-50 flex items-center justify-center overflow-hidden">
      <style jsx>{`
        @keyframes fadeOut { 0% { opacity: 1; } 100% { opacity: 0; pointer-events: none; } }
        @keyframes pulse-subtle { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
        .parallax-splash { animation: fadeOut 0.8s ease-out forwards; animation-delay: 3.5s; }
        .pulse-ring { animation: pulse-subtle 2s ease-in-out infinite; }
      `}</style>

      <div className="parallax-splash absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>

      <div 
        className="absolute transition-all duration-100 ease-out"
        style={{
          transform: `translate(-${logoX}px, 0) scale(${logoScale})`,
          opacity: opacity,
          top: '50%',
          left: '50%',
          marginLeft: '-160px',
          marginTop: '-160px',
        }}
      >
        <div className="w-80 h-80 relative">
          <div className="absolute inset-0 bg-red-600 rounded-full opacity-20 pulse-ring blur-3xl"></div>
          <img 
            src="/tabscan-logo.png" 
            alt="TabScan" 
            className="w-full h-full object-contain relative z-10"
          />
        </div>
      </div>

      <div 
        className="absolute bottom-20 text-center z-10 transition-all duration-100 ease-out"
        style={{
          transform: `translateY(0px)`,
          opacity: Math.max(0, 1 - scrollProgress * 0.01),
        }}
      >
        <p className="text-white text-sm font-semibold">TabScan wird geladen...</p>
        <div className="mt-4 w-48 h-1 bg-slate-700 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-100"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// FAQ Component
function FAQItemComponent({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 hover:border-red-200 animate-fade-in-up">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-red-50 transition text-left group"
      >
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 pr-4 group-hover:text-red-600 transition">
          {item.question}
        </h3>
        <ChevronDown 
          size={20} 
          className={`flex-shrink-0 text-red-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-red-100 bg-red-50 animate-bounce-in">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function TabScanLanding() {
  const [showSplash, setShowSplash] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    restaurant: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [visibleFeatures, setVisibleFeatures] = useState<boolean>(false);

  const features = [
    { emoji: '📱', title: 'Digitales Menü System', description: 'Speisekarten digital verwalten, QR-Codes, mehrsprachig' },
    { emoji: '🛒', title: 'Online Bestellplattform', description: 'Gäste bestellen vom Handy, Payment-Integration' },
    { emoji: '👨‍🍳', title: 'Kitchen Display', description: 'Echtzeit Bestellungen in der Küche, Effizienz' },
    { emoji: '📦', title: 'Lagerverwaltung', description: 'Bestände überwachen, Auto-Benachrichtigungen' },
    { emoji: '📊', title: 'Überwachung', description: 'Live Monitoring, Echtzeit-Updates, Alerts' },
    { emoji: '📈', title: 'Analytics', description: 'Tagesumsatz, Bestseller, Gast-Verhalten' },
  ];

  const useCases = [
    { emoji: '🏨', title: 'Premium Restaurants', description: 'Gehobene Gastronomie mit digitalem Service' },
    { emoji: '🌮', title: 'Imbisse & Fast Food', description: 'Schnelle Bestellungen, Online Payment' },
    { emoji: '☕', title: 'Cafés & Bars', description: 'Flexible Menü-Verwaltung, Live-Updates' },
    { emoji: '🍕', title: 'Pizzerien & Takeaway', description: 'Order-Management, Zubereitungszeit-Tracking' },
    { emoji: '🚴', title: 'Lieferdienste', description: 'Integration mit Delivery-Plattformen' },
    { emoji: '👨‍🍳', title: 'Catering & Events', description: 'Menü-Verwaltung für Events, Gruppenbuchungen' },
  ];

  const faqItems: FAQItem[] = [
    {
      question: 'Was ist TabScan genau?',
      answer: 'TabScan ist eine Plattform für digitale Gastronomie-Lösungen. Wir bieten modulare Features wie digitale Menüs, Bestellsysteme, Kitchen Display, Lagerverwaltung und Analytics - je nachdem was dein Restaurant braucht.'
    },
    {
      question: 'Können wir unsere bestehende Hardware nutzen?',
      answer: 'Ja! TabScan ist hardware-agnostisch. Du kannst deine bestehenden Systeme integrieren oder neue hinzufügen. Wir unterstützen flexible Integration.'
    },
    {
      question: 'Wie schnell ist die Implementierung?',
      answer: 'Zwischen 5 Minuten für Basic Setup bis 2-3 Wochen für Enterprise-Konfiguration mit Custom-Features. Es hängt ab von deinen Anforderungen.'
    },
    {
      question: 'Ist das DSGVO-konform und sicher?',
      answer: 'Absolut. Alle Daten sind verschlüsselt, auf Schweizer Servern, DSGVO-konform und mit höchsten Sicherheitsstandards geschützt.'
    },
    {
      question: 'Können wir mehrere Standorte verwalten?',
      answer: 'Ja! TabScan ist multi-location fähig. Ein Dashboard für alle deine Standorte oder separate Management - ganz wie du möchtest.'
    },
    {
      question: 'Wie funktioniert die Preisgestaltung?',
      answer: 'Wir bieten flexible Lösungen für jede Größe. Von Starter-Paketen für kleine Restaurants bis zu Custom-Enterprise-Lösungen. Kontaktiere uns für eine personalisierte Quote.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    
    setTimeout(() => {
      setShowModal(false);
      setFormData({ name: '', email: '', restaurant: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  if (showSplash) {
    return <ParallaxSplash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      <style jsx>{`
        @keyframes slide-up { 
          from { opacity: 0; transform: translateY(40px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          50% { opacity: 1; }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes rotate-in {
          from { opacity: 0; transform: rotate(-10deg) scale(0.8); }
          to { opacity: 1; transform: rotate(0deg) scale(1); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.6); }
        }
        @keyframes text-shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.5s ease-out; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-scale-in { animation: scale-in 0.6s ease-out; }
        .animate-rotate-in { animation: rotate-in 0.6s ease-out; }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        .animate-text-shimmer { animation: text-shimmer 3s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-out; }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }

        .gradient-text { 
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .feature-card {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }
        .feature-card:nth-child(5) { animation-delay: 0.5s; }
        .feature-card:nth-child(6) { animation-delay: 0.6s; }

        .usecase-card {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .usecase-card:nth-child(1) { animation-delay: 0.05s; }
        .usecase-card:nth-child(2) { animation-delay: 0.15s; }
        .usecase-card:nth-child(3) { animation-delay: 0.25s; }
        .usecase-card:nth-child(4) { animation-delay: 0.35s; }
        .usecase-card:nth-child(5) { animation-delay: 0.45s; }
        .usecase-card:nth-child(6) { animation-delay: 0.55s; }

        .icon-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .icon-spin {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .text-glow {
          text-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
        }

        .hero-particles {
          position: relative;
        }

        .particle {
          position: absolute;
          pointer-events: none;
          opacity: 0.5;
        }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
          <img 
            src="/tabscan-logo.png" 
            alt="TabScan Logo" 
            className="h-20 sm:h-32 w-auto hover:scale-110 transition-transform"
          />
          
          <div className="hidden md:flex gap-6 sm:gap-8 items-center">
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-sm text-slate-600 hover:text-red-600 font-medium transition duration-300 hover:scale-110"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('usecases')}
              className="text-sm text-slate-600 hover:text-red-600 font-medium transition duration-300 hover:scale-110"
            >
              Für Wen
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-sm text-slate-600 hover:text-red-600 font-medium transition duration-300 hover:scale-110"
            >
              FAQ
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-110 animate-glow-pulse"
            >
              Demo Starten
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-900 hover:scale-125 transition-transform"
          >
            <MenuIcon size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 animate-slide-down">
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left text-sm text-slate-600 hover:text-red-600 font-medium py-2"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('usecases')}
              className="block w-full text-left text-sm text-slate-600 hover:text-red-600 font-medium py-2"
            >
              Für Wen
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left text-sm text-slate-600 hover:text-red-600 font-medium py-2"
            >
              FAQ
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg text-sm font-bold"
            >
              Demo Starten
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50 pt-12 sm:pt-20 pb-20 sm:pb-32 hero-particles">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center animate-slide-up max-w-3xl mx-auto">
            <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6 animate-bounce-in">
              🇨🇭 100% Schweizer Lösung
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight">
              Digitale Lösungen für die <span className="gradient-text text-glow">Gastronomie</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 sm:mb-10 leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Digitale Menüs • Bestellsysteme • Kitchen Management • Lagerverwaltung • Überwachung • Analytics
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center mb-12 sm:mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={() => setShowModal(true)}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 sm:px-10 py-4 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-110 w-full sm:w-auto flex items-center justify-center gap-2 animate-glow-pulse"
              >
                <Rocket size={20} className="group-hover:icon-spin" />
                Kostenlose Demo
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setShowModal(true)}
                className="group relative border-2 border-slate-300 text-slate-900 px-8 sm:px-10 py-4 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:border-red-600 hover:bg-red-50 transition-all duration-300 transform hover:scale-110 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                💬 Team kontaktieren
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="group cursor-pointer">
                <div className="text-2xl sm:text-3xl font-black text-red-600 group-hover:scale-125 transition-transform">1000+</div>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-red-600 transition">Features</p>
              </div>
              <div className="group cursor-pointer">
                <div className="text-2xl sm:text-3xl font-black text-red-600 group-hover:scale-125 transition-transform">♾️</div>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-red-600 transition">Flexibel</p>
              </div>
              <div className="group cursor-pointer">
                <div className="text-2xl sm:text-3xl font-black text-red-600 group-hover:scale-125 transition-transform">24/7</div>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-red-600 transition">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Unser <span className="gradient-text text-glow">Portfolio</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Wir bieten modulare Lösungen - nimm was du brauchst, erweitere später
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="feature-card group bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-red-300 hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-5 group-hover:animate-float group-hover:scale-125 transition-all duration-300">
                {feature.emoji}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES SECTION */}
      <section id="usecases" className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              Für jeden Restaurant-Typ
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Von Premium-Restaurants bis zu Imbissen - TabScan passt sich an deine Bedürfnisse an
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {useCases.map((useCase, idx) => (
              <div 
                key={idx}
                className="usecase-card group bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 sm:p-8 hover:border-red-500 hover:bg-slate-700 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4 group-hover:animate-bounce group-hover:scale-150 transition-all duration-300 inline-block">
                  {useCase.emoji}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-red-400 transition">
                  {useCase.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TABSCAN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Warum <span className="gradient-text">TabScan?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[
            { emoji: '⚡', title: 'Blitzschnell Setup', desc: '5 Minuten einsatzbereit' },
            { emoji: '📱', title: 'Mobile First', desc: '100% optimiert für Handys' },
            { emoji: '🔒', title: 'Sicher & DSGVO', desc: 'Schweizer Server, verschlüsselt' },
            { emoji: '📊', title: 'Echtzeit Analytics', desc: 'Daten-Insights sofort' },
            { emoji: '🔌', title: 'Flexible Integration', desc: 'Passt sich an deine Systeme an' },
            { emoji: '👥', title: 'Dedicated Support', desc: 'Schweizer Team 24/7' }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex gap-4 sm:gap-6 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-4xl group-hover:animate-bounce">
                {item.emoji}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-red-600 transition">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION - FLEXIBLE */}
      <section className="bg-gradient-to-br from-slate-50 to-red-50 py-12 sm:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 sm:mb-4 text-center animate-slide-up">
            Flexible Preisgestaltung
          </h2>
          <p className="text-center text-slate-600 mb-12 sm:mb-16 text-sm sm:text-base animate-fade-in-up">
            Für jede Größe. Für jedes Budget. Kein Verstecktes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: 'Starter', description: 'Für kleine Restaurants & Imbisse', features: ['Digitales Menü', 'QR-Codes', 'Basic Analytics', 'Mobile App'] },
              { title: 'Growth', description: 'Für wachsende Betriebe', features: ['Alles von Starter +', 'Bestellsystem', 'Kitchen Display', 'Advanced Analytics', 'Multi-Location'] },
              { title: 'Enterprise', description: 'Für große Ketten & Custom', features: ['Alles von Growth +', 'Custom Features', 'Account Manager', 'API Access', 'White Label'] }
            ].map((plan, idx) => (
              <div 
                key={idx}
                className="border-2 border-slate-300 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:border-red-300 bg-white animate-fade-in-up hover:scale-105"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-red-600">{plan.title}</h3>
                <p className="text-slate-600 text-sm mb-6">{plan.description}</p>
                <p className="text-sm text-slate-600 mb-6 font-semibold">Flexible Preise</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700 animate-fade-in-up" style={{ animationDelay: `${(idx * 0.15) + (i * 0.05)}s` }}>
                      <Check size={18} className="text-red-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setShowModal(true)}
                  className="w-full border-2 border-red-600 text-red-600 py-3 rounded-lg font-bold hover:bg-red-50 hover:scale-105 transition-all text-sm sm:text-base"
                >
                  {idx === 2 ? '💬 Anfrage' : 'ℹ️ Mehr Info'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 sm:mb-4 text-center animate-slide-up">
          Häufig gestellte Fragen
        </h2>
        <p className="text-center text-slate-600 mb-8 sm:mb-12 text-sm sm:text-base animate-fade-in-up">
          Alles was du über TabScan wissen solltest
        </p>

        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <FAQItemComponent key={index} item={item} />
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white py-16 sm:py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
            Bereit, dein Restaurant zu digitalisieren?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-10 sm:mb-12 animate-fade-in-up">
            Starten wir mit einer kostenlosen Demo. Keine Verpflichtung.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-10 sm:px-14 py-5 sm:py-6 rounded-2xl font-black text-lg sm:text-xl hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-110 inline-flex items-center gap-3 animate-glow-pulse"
          >
            <Rocket size={24} className="group-hover:animate-bounce" />
            Demo starten
            <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 sm:py-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in-up">
            <p className="text-xs sm:text-sm">© 2024 TabScan. Alle Rechte vorbehalten.</p>
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src="/tabscan-icon.png" 
                alt="TabScan Logo" 
                className="h-8 sm:h-10 w-auto hover:scale-125 transition-transform"
              />
              <p className="text-xs sm:text-sm">
                Made with ❤️ in Switzerland
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-bounce-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition hover:rotate-90 hover:scale-150 duration-300"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="text-center py-8 animate-bounce-in">
                <div className="text-6xl mb-4 animate-bounce">✅</div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Vielen Dank!</h2>
                <p className="text-slate-600 text-sm sm:text-base">Unser Team kontaktiert dich in Kürze. 🚀</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 animate-slide-down">Demo anfragen</h2>
                <p className="text-slate-600 mb-6 text-sm sm:text-base">
                  Lass uns deine Anforderungen besprechen
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2 uppercase">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition hover:border-red-300"
                      placeholder="Dein Name"
                    />
                  </div>

                  <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2 uppercase">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition hover:border-red-300"
                      placeholder="deine@email.ch"
                    />
                  </div>

                  <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2 uppercase">Restaurant</label>
                    <input
                      type="text"
                      name="restaurant"
                      value={formData.restaurant}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition hover:border-red-300"
                      placeholder="Name deines Betriebs"
                    />
                  </div>

                  <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2 uppercase">Interesse</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition h-24 resize-none hover:border-red-300"
                      placeholder="z.B. Menü, Bestellungen, Kitchen..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 text-sm sm:text-base transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: '0.5s' }}
                  >
                    Demo anfordern 🚀
                  </button>
                </form>

                <p className="text-xs text-slate-500 text-center mt-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  Keine Spam, nur echte Werte 🎯
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}