'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, Menu, Smartphone, TrendingUp, Users, Lock, Zap, Shield, Rocket, X, MenuIcon, ChevronDown, Database, Eye, Package, Utensils, BarChart3 } from 'lucide-react';

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

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface UseCase {
  emoji: string;
  title: string;
  description: string;
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
    <div className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 hover:border-red-200">
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
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-red-100 bg-red-50">
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

  const features: Feature[] = [
    {
      icon: <Utensils size={28} className="text-red-600" />,
      title: 'Digitales Menü System',
      description: 'Speisekarten digital verwalten, QR-Codes generieren, Mehrsprachigkeit, Bilder & Beschreibungen'
    },
    {
      icon: <ShoppingCart size={28} className="text-red-600" />,
      title: 'Online Bestellplattform',
      description: 'Gäste bestellen direkt vom Handy, Payment-Integration, Order-Tracking'
    },
    {
      icon: <Eye size={28} className="text-red-600" />,
      title: 'Kitchen Display System',
      description: 'Echtzeit Bestellungen in der Küche, Status-Management, Effizienz-Optimierung'
    },
    {
      icon: <Package size={28} className="text-red-600" />,
      title: 'Intelligente Lagerverwaltung',
      description: 'Bestände überwachen, Automatische Benachrichtigungen, Verfügbarkeit steuern'
    },
    {
      icon: <Eye size={28} className="text-red-600" />,
      title: 'Überwachungssysteme',
      description: 'Live Monitoring, Echtzeit-Updates, Alarm-Management'
    },
    {
      icon: <BarChart3 size={28} className="text-red-600" />,
      title: 'Analytics & Reporting',
      description: 'Tagesumsatz, Bestseller, Gast-Verhalten, Daten-Insights'
    },
  ];

  const useCases: UseCase[] = [
    {
      emoji: '🏨',
      title: 'Premium Restaurants & Dining',
      description: 'Gehobene Gastronomie mit digitalem Service-Erlebnis'
    },
    {
      emoji: '🌮',
      title: 'Imbisse & Fast Food',
      description: 'Schnelle Bestellungen, Online Payment, Warteschlangen reduzieren'
    },
    {
      emoji: '☕',
      title: 'Cafés & Bars',
      description: 'Flexible Menü-Verwaltung, Echtzeit-Updates'
    },
    {
      emoji: '🍕',
      title: 'Pizzerien & Takeaway',
      description: 'Order-Management, Zubereitungszeit-Tracking'
    },
    {
      emoji: '🚴',
      title: 'Lieferdienste',
      description: 'Integration mit Delivery-Plattformen, Tracking'
    },
    {
      emoji: '👨‍🍳',
      title: 'Catering & Events',
      description: 'Flexible Menü-Verwaltung für Events, Gruppenbuchungen'
    },
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
    console.log('Form submitted:', formData);
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

  const openModal = () => {
    setShowModal(true);
    setMobileMenuOpen(false);
    setSubmitted(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setFormData({ name: '', email: '', restaurant: '', message: '' });
  };

  if (showSplash) {
    return <ParallaxSplash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="bg-white text-slate-900">
      <style jsx>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .gradient-text { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hover-lift { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(220, 38, 38, 0.15); }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
          <img 
            src="/tabscan-logo.png" 
            alt="TabScan Logo" 
            className="h-20 sm:h-32 w-auto hover:scale-105 transition-transform"
          />
          
          <div className="hidden md:flex gap-6 sm:gap-8 items-center">
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-sm text-slate-600 hover:text-red-600 font-medium transition duration-300"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('usecases')}
              className="text-sm text-slate-600 hover:text-red-600 font-medium transition duration-300"
            >
              Für Wen
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-sm text-slate-600 hover:text-red-600 font-medium transition duration-300"
            >
              FAQ
            </button>
            <button 
              onClick={openModal}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105"
            >
              Demo Starten
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-900"
          >
            <MenuIcon size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 animate-slide-up">
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
              onClick={openModal}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg text-sm font-bold hover:shadow-lg transition-all duration-300"
            >
              Demo Starten
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50 pt-12 sm:pt-20 pb-20 sm:pb-32">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center animate-slide-up max-w-3xl mx-auto">
            <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">
              🇨🇭 100% Schweizer Lösung
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight">
              Digitale Lösungen für die <span className="gradient-text">Gastronomie</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 sm:mb-10 leading-relaxed font-medium">
              Digitale Menüs • Bestellsysteme • Kitchen Management • Lagerverwaltung • Überwachung • Analytics
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center mb-12 sm:mb-16">
              <button 
                onClick={openModal}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 sm:px-10 py-4 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Rocket size={20} />
                Kostenlose Demo
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={openModal}
                className="group relative border-2 border-slate-300 text-slate-900 px-8 sm:px-10 py-4 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:border-red-600 hover:bg-red-50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Team kontaktieren
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-8">
              <div className="group">
                <div className="text-2xl sm:text-3xl font-black text-red-600">1000+</div>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-red-600 transition">Features</p>
              </div>
              <div className="group">
                <div className="text-2xl sm:text-3xl font-black text-red-600">Flexibel</div>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-red-600 transition">Skalierbar</p>
              </div>
              <div className="group">
                <div className="text-2xl sm:text-3xl font-black text-red-600">24/7</div>
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
            Unser <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Wir bieten modulare Lösungen - nimm was du brauchst, erweitere später
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-red-300 hover:shadow-xl transition-all duration-300 hover-lift"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border-2 border-red-200">
                {feature.icon}
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
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Von Premium-Restaurants bis zu Imbissen - TabScan passt sich an deine Bedürfnisse an
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {useCases.map((useCase, idx) => (
              <div 
                key={idx}
                className="group bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 sm:p-8 hover:border-red-500 hover:bg-slate-700 transition-all duration-300 hover-lift"
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
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

      {/* TRUST SECTION - GENERISCHE RESTAURANT LOGOS */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-10 sm:mb-12">
            ⭐ Vertraut von hunderten Restaurants in der Schweiz
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i}
                className="bg-slate-800 border-2 border-slate-700 rounded-lg aspect-square flex items-center justify-center hover:border-red-500 hover:bg-slate-700 transition-all duration-300"
              >
                <div className="text-center">
                  <Utensils size={32} className="mx-auto text-slate-500 mb-2" />
                  <p className="text-xs text-slate-400">Restaurant {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TABSCAN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
            Warum <span className="gradient-text">TabScan?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[
            { icon: Zap, title: 'Blitzschnell Setup', desc: '5 Minuten einsatzbereit' },
            { icon: Smartphone, title: 'Mobile First', desc: '100% optimiert für Handys' },
            { icon: Lock, title: 'Sicher & DSGVO', desc: 'Schweizer Server, verschlüsselt' },
            { icon: TrendingUp, title: 'Echtzeit Analytics', desc: 'Daten-Insights sofort verfügbar' },
            { icon: Zap, title: 'Flexible Integration', desc: 'Passt sich an deine Systeme an' },
            { icon: Users, title: 'Dedicated Support', desc: 'Schweizer Team 24/7' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex gap-4 sm:gap-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING SECTION - FLEXIBLE */}
      <section className="bg-gradient-to-br from-slate-50 to-red-50 py-12 sm:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 sm:mb-4 text-center">
            Flexible Preisgestaltung
          </h2>
          <p className="text-center text-slate-600 mb-12 sm:mb-16 text-sm sm:text-base">
            Für jede Größe. Für jedes Budget. Kein Verstecktes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Starter',
                description: 'Für kleine Restaurants & Imbisse',
                features: ['Digitales Menü', 'QR-Codes', 'Basic Analytics', 'Mobile App']
              },
              {
                title: 'Growth',
                description: 'Für wachsende Betriebe',
                features: ['Alles von Starter +', 'Bestellsystem', 'Kitchen Display', 'Advanced Analytics', 'Multi-Location']
              },
              {
                title: 'Enterprise',
                description: 'Für große Ketten & Custom Lösungen',
                features: ['Alles von Growth +', 'Custom Features', 'Dedicated Account Manager', 'API Access', 'White Label Option']
              }
            ].map((plan, idx) => (
              <div 
                key={idx}
                className="border-2 border-slate-300 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 hover:border-red-300 bg-white"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.title}</h3>
                <p className="text-slate-600 text-sm mb-6">{plan.description}</p>
                <p className="text-sm text-slate-600 mb-6 font-semibold">Flexible Preise nach Anfrage</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <Check size={18} className="text-red-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={openModal}
                  className="w-full border-2 border-red-600 text-red-600 py-3 rounded-lg font-bold hover:bg-red-50 transition-all text-sm sm:text-base"
                >
                  {idx === 2 ? 'Anfrage stellen' : 'Mehr Info'}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-600 mt-8 sm:mt-12 text-xs sm:text-sm">
            ✅ 14 Tage kostenlos testen • Flexible Laufzeiten • Kein Verstecktes
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 sm:mb-4 text-center">
          Häufig gestellte Fragen
        </h2>
        <p className="text-center text-slate-600 mb-8 sm:mb-12 text-sm sm:text-base">
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
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
            Bereit, dein Restaurant zu digitalisieren?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-10 sm:mb-12">
            Starten wir mit einer kostenlosen Demo. Keine Verpflichtung.
          </p>
          <button 
            onClick={openModal}
            className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-10 sm:px-14 py-5 sm:py-6 rounded-2xl font-black text-lg sm:text-xl hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-110 inline-flex items-center gap-3"
          >
            <Rocket size={24} />
            Demo starten
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 sm:py-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm">© 2024 TabScan. Alle Rechte vorbehalten.</p>
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src="/tabscan-icon.png" 
                alt="TabScan Logo" 
                className="h-8 sm:h-10 w-auto"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-slide-up">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition hover:rotate-90 duration-300"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="text-center py-8 animate-slide-up">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Vielen Dank!</h2>
                <p className="text-slate-600 text-sm sm:text-base">Unser Team kontaktiert dich in Kürze. 🚀</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Demo anfragen</h2>
                <p className="text-slate-600 mb-6 text-sm sm:text-base">
                  Lass uns deine spezifischen Anforderungen besprechen
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2 uppercase">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition"
                      placeholder="Dein Name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2 uppercase">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition"
                      placeholder="deine@email.ch"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2 uppercase">Restaurant/Betrieb</label>
                    <input
                      type="text"
                      name="restaurant"
                      value={formData.restaurant}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition"
                      placeholder="Name deines Betriebs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2 uppercase">Was interessiert dich?</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition h-24 resize-none"
                      placeholder="z.B. Digital Menü, Bestellsystem, Kitchen Display..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 text-sm sm:text-base transform hover:scale-105"
                  >
                    Demo anfordern →
                  </button>
                </form>

                <p className="text-xs text-slate-500 text-center mt-4">
                  Wir werden uns in Kürze mit dir in Verbindung setzen 🎯
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Icon component (ShoppingCart) that wasn't imported
function ShoppingCart(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );
}