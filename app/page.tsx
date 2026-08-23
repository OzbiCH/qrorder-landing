'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, Menu, Smartphone, TrendingUp, Users, Calendar, MapPin, X, MenuIcon, ChevronDown, Play, Zap, Shield, Rocket, Image } from 'lucide-react';

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
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-red-100 bg-red-50 animate-in fade-in">
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
  const [activeTab, setActiveTab] = useState<'menu' | 'imbiss'>('menu');

  const faqItems: FAQItem[] = [
    {
      question: "Was ist TabScan Menü?",
      answer: "TabScan Menü ist eine digitale Speisekartenlösung für gehobene Restaurants. Gäste scannen einen QR-Code, sehen das Menü auf dem Handy, und können optional bestellen. Mit Kitchen Display System und Live-Analytics."
    },
    {
      question: "Was ist TabScan Imbiss Order?",
      answer: "TabScan Imbiss Order ist speziell für Kebab-Stände, Burger-Läden und Imbisse. Kunden bestellen UND bezahlen online (TWINT, Karte, Apple Pay, Google Pay), erhalten SMS-Updates, und kein Warten an der Kasse."
    },
    {
      question: "Welche Zahlungsmethoden unterstützen wir?",
      answer: "TabScan Menü: Optional (Bestellungen möglich). TabScan Imbiss Order: TWINT, Kreditkarte (Visa/Mastercard), Apple Pay, Google Pay, und Bar mit SMS-Verifikation."
    },
    {
      question: "Wie schnell ist das Setup?",
      answer: "5 Minuten. Anmelden, Menü eingeben (oder hochladen), QR-Codes ausdrucken, fertig. Das Dashboard ist sofort einsatzbereit."
    },
    {
      question: "Funktioniert es auch auf Smartphones?",
      answer: "100%. Beide Apps sind vollständig mobil-optimiert. Das ist der gesamte Fokus — perfekt für Handy-Nutzer."
    },
    {
      question: "Können wir mehrere Standorte haben?",
      answer: "Ja! Beide Systeme sind multi-location fähig. Jeder Standort bekommt eine eigene sichere URL und sein eigenes Dashboard."
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
              onClick={() => scrollToSection('menu')}
              className="text-sm text-slate-600 hover:text-red-600 font-medium transition duration-300"
            >
              Menü
            </button>
            <button 
              onClick={() => scrollToSection('imbiss')}
              className="text-sm text-slate-600 hover:text-red-600 font-medium transition duration-300"
            >
              Imbiss Order
            </button>
            <button 
              onClick={() => scrollToSection('preise')}
              className="text-sm text-slate-600 hover:text-red-600 font-medium transition duration-300"
            >
              Preise
            </button>
            <button 
              onClick={openModal}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105"
            >
              Starten
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
              onClick={() => scrollToSection('menu')}
              className="block w-full text-left text-sm text-slate-600 hover:text-red-600 font-medium py-2"
            >
              Menü
            </button>
            <button 
              onClick={() => scrollToSection('imbiss')}
              className="block w-full text-left text-sm text-slate-600 hover:text-red-600 font-medium py-2"
            >
              Imbiss Order
            </button>
            <button 
              onClick={() => scrollToSection('preise')}
              className="block w-full text-left text-sm text-slate-600 hover:text-red-600 font-medium py-2"
            >
              Preise
            </button>
            <button 
              onClick={openModal}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg text-sm font-bold hover:shadow-lg transition-all duration-300"
            >
              Starten
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
              🇨🇭 Schweizer Bestelllösungen
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight">
              Zwei Lösungen. <span className="gradient-text">Ein Ziel.</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 sm:mb-10 leading-relaxed font-medium">
              TabScan Menü für gehobene Restaurants. TabScan Imbiss Order für Kebab, Burger & Imbisse.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center mb-12 sm:mb-16">
              <button 
                onClick={() => { scrollToSection('menu'); }}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 sm:px-10 py-4 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Smartphone size={20} />
                TabScan Menü
                <ChevronRight size={20} />
              </button>
              
              <button 
                onClick={() => { scrollToSection('imbiss'); }}
                className="group relative border-2 border-slate-300 text-slate-900 px-8 sm:px-10 py-4 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:border-red-600 hover:bg-red-50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Zap size={20} />
                Imbiss Order
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-8">
              <div className="group">
                <div className="text-2xl sm:text-3xl font-black text-red-600">20+</div>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-red-600 transition">Restaurants aktiv</p>
              </div>
              <div className="group">
                <div className="text-2xl sm:text-3xl font-black text-red-600">5 Min</div>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-red-600 transition">Setup</p>
              </div>
              <div className="group">
                <div className="text-2xl sm:text-3xl font-black text-red-600">CHF 49+</div>
                <p className="text-xs sm:text-sm text-slate-600 group-hover:text-red-600 transition">Pro Monat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABSCAN MENÜ SECTION */}
      <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
            <span className="gradient-text">TabScan Menü</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Für gehobene Restaurants, Bars & Cafés. Digitale Speisekarten mit QR-Codes, Kitchen Display & Live Analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          {/* TEXT */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Für wen?</h3>
            <ul className="space-y-3 sm:space-y-4 mb-8">
              {[
                'Premium Restaurants & Dining',
                'Gehobene Bars & Lounges',
                'Cafés mit hohem Standard',
                'Multilingual Service (DE/EN/AR)',
                'Professional Kitchen Display',
                'Echtzeit Analytics & Stats'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <Check size={20} className="text-red-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="bg-red-50 border-l-4 border-red-600 p-4 sm:p-6 rounded">
              <p className="text-sm sm:text-base font-semibold text-slate-900 mb-2">Echte Kunden:</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white px-3 py-2 rounded border border-red-200 text-xs font-semibold text-slate-900">👑 Royal</span>
                <span className="bg-white px-3 py-2 rounded border border-red-200 text-xs font-semibold text-slate-900">🔥 KULT</span>
                <span className="bg-white px-3 py-2 rounded border border-red-200 text-xs font-semibold text-slate-900">✨ Golden Club</span>
              </div>
            </div>
          </div>

          {/* SCREENSHOTS PLACEHOLDER */}
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl aspect-video flex items-center justify-center border-2 border-dashed border-slate-400">
              <div className="text-center">
                <Image size={48} className="mx-auto text-slate-500 mb-2" />
                <p className="text-sm text-slate-600">KULT Menu Screenshot</p>
                <p className="text-xs text-slate-500">(upload: /public/kult-menu.png)</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg aspect-square flex items-center justify-center border-2 border-dashed border-slate-400">
                <div className="text-center">
                  <Image size={32} className="mx-auto text-slate-500 mb-1" />
                  <p className="text-xs text-slate-600">Golden Club 1</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg aspect-square flex items-center justify-center border-2 border-dashed border-slate-400">
                <div className="text-center">
                  <Image size={32} className="mx-auto text-slate-500 mb-1" />
                  <p className="text-xs text-slate-600">Golden Club 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE DEMO & PRICING */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8 text-center">
          <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Live Demos ansehen:</h4>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a href="https://royal.tabscan.ch" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-red-600 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition text-sm sm:text-base">
              Royal.tabscan.ch →
            </a>
            <a href="https://kult.tabscan.ch" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-red-600 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition text-sm sm:text-base">
              KULT.tabscan.ch →
            </a>
            <a href="https://golden-club.tabscan.ch" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-red-600 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition text-sm sm:text-base">
              Golden-Club.tabscan.ch →
            </a>
          </div>
          <p className="text-slate-600 text-sm sm:text-base">
            <strong>Preis:</strong> CHF 49/Monat (Basic) | CHF 99/Monat (Pro) | CHF 199/Monat (Business)
          </p>
        </div>
      </section>

      {/* TABSCAN IMBISS ORDER SECTION */}
      <section id="imbiss" className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              TabScan Imbiss Order
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Online-Bestellungen + Payment für Kebab, Burger & Imbisse. Keine Warteschlangen mehr.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* SCREENSHOTS */}
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl aspect-video flex items-center justify-center border-2 border-dashed border-slate-500">
                <div className="text-center">
                  <Image size={48} className="mx-auto text-slate-400 mb-2" />
                  <p className="text-sm text-slate-300">Imbiss Order App</p>
                  <p className="text-xs text-slate-400">(upload: /public/imbiss-app.png)</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg aspect-square flex items-center justify-center border-2 border-dashed border-slate-500">
                  <div className="text-center">
                    <Image size={32} className="mx-auto text-slate-400 mb-1" />
                    <p className="text-xs text-slate-300">Order</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg aspect-square flex items-center justify-center border-2 border-dashed border-slate-500">
                  <div className="text-center">
                    <Image size={32} className="mx-auto text-slate-400 mb-1" />
                    <p className="text-xs text-slate-300">Status</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Features:</h3>
              <ul className="space-y-3 sm:space-y-4 mb-8">
                {[
                  '💳 Online Payment: Karte, TWINT, Apple Pay, Google Pay',
                  '📱 SMS-Verifikation: Sichere Bar-Zahlung',
                  '🍳 Kitchen Display: Echtzeit Bestellungen',
                  '📊 Admin Dashboard: Tagesumsatz & Statistiken',
                  '⏱️ Status Tracking: Kunden sehen was läuft',
                  '🚀 Schnelle Integration: 5 Minuten Setup',
                  '🇨🇭 100% Schweiz-optimiert: CHF, +41 Nummern'
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-200">
                    <Check size={20} className="text-green-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-slate-800 border-l-4 border-green-500 p-4 sm:p-6 rounded">
                <p className="text-sm sm:text-base font-semibold text-white mb-3">Preis:</p>
                <p className="text-2xl sm:text-3xl font-black text-green-400 mb-2">CHF 100/Monat</p>
                <p className="text-xs sm:text-sm text-slate-400">NEU - Ideal für Imbisse & QSR</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERGLEICHSTABELLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-8 sm:mb-12 text-center">
          Vergleich der zwei Lösungen
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="border-b-2 border-slate-300 bg-slate-50">
                <th className="text-left py-4 px-4 font-black text-slate-900">Feature</th>
                <th className="text-center py-4 px-4 font-bold text-slate-900">TabScan Menü</th>
                <th className="text-center py-4 px-4 font-bold text-slate-900">TabScan Imbiss</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Online Bestellungen', menu: '✅', imbiss: '✅' },
                { feature: 'Payment Integration', menu: '❌ Optional', imbiss: '✅ PFLICHT' },
                { feature: 'Kitchen Display', menu: '✅', imbiss: '✅' },
                { feature: 'SMS-Verifikation', menu: '❌', imbiss: '✅' },
                { feature: 'Admin Dashboard', menu: '✅ Analytics', imbiss: '✅ + Tagesumsatz' },
                { feature: 'Sprachen', menu: 'DE/EN/AR', imbiss: 'DE/FR' },
                { feature: 'Zielgruppe', menu: 'Restaurants', imbiss: 'Imbisse/QSR' },
                { feature: 'Preis/Monat', menu: 'CHF 49-199', imbiss: 'CHF 100' }
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-slate-900">{row.feature}</td>
                  <td className="text-center py-4 px-4 text-slate-700">{row.menu}</td>
                  <td className="text-center py-4 px-4 text-slate-700 font-semibold">{row.imbiss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PRICING */}
      <section id="preise" className="bg-gradient-to-br from-slate-50 to-red-50 py-12 sm:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 sm:mb-4 text-center">
            Transparente Preise
          </h2>
          <p className="text-center text-slate-600 mb-12 sm:mb-16 text-sm sm:text-base">
            Wähle den Plan der zu dir passt. Keine versteckten Gebühren.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* TABSCAN MENÜ */}
            <div className="border-2 border-slate-300 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-red-300 bg-white">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">TabScan Menü</h3>
              
              <div className="space-y-4 mb-8">
                <div className="border-t pt-4">
                  <p className="text-sm text-slate-600 mb-2">Basic Plan</p>
                  <p className="text-3xl font-black text-red-600">CHF 49</p>
                  <p className="text-xs text-slate-500">/Monat</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-slate-600 mb-2">Pro Plan</p>
                  <p className="text-3xl font-black text-red-600">CHF 99</p>
                  <p className="text-xs text-slate-500">/Monat</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-slate-600 mb-2">Business Plan</p>
                  <p className="text-3xl font-black text-red-600">CHF 199</p>
                  <p className="text-xs text-slate-500">/Monat</p>
                </div>
              </div>

              <button 
                onClick={openModal}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all text-sm sm:text-base"
              >
                TabScan Menü starten
              </button>
            </div>

            {/* TABSCAN IMBISS - FEATURED */}
            <div className="border-2 border-red-600 rounded-2xl p-6 bg-gradient-to-br from-red-50 to-white relative transform md:scale-105 z-10 hover:shadow-2xl transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1 rounded-full text-xs font-black">🔥 NEU</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-6 mt-6">TabScan Imbiss Order</h3>
              
              <div className="mb-8">
                <p className="text-sm text-slate-600 mb-2">Standard Plan</p>
                <p className="text-4xl font-black text-red-600">CHF 100</p>
                <p className="text-xs text-slate-500">/Monat</p>
                <p className="text-xs text-slate-700 mt-3">✅ Alles inklusive</p>
              </div>

              <button 
                onClick={openModal}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/50 transition-all text-sm sm:text-base transform hover:scale-105"
              >
                Imbiss Order starten
              </button>
            </div>

            {/* KONTAKT */}
            <div className="border-2 border-slate-300 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-red-300 bg-white">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Custom Plan</h3>
              
              <p className="text-slate-600 mb-8">
                Mehrere Standorte? Enterprise-Features? Besondere Wünsche?
              </p>

              <button 
                onClick={openModal}
                className="w-full border-2 border-red-600 text-red-600 py-3 rounded-lg font-bold hover:bg-red-50 transition-all text-sm sm:text-base"
              >
                Kontakt aufnehmen
              </button>
            </div>
          </div>

          <p className="text-center text-slate-600 text-xs sm:text-sm">
            ✅ 14 Tage kostenlos testen • Keine Kreditkarte nötig • Jederzeit kündbar
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 sm:mb-4 text-center">
          Häufig gestellte Fragen
        </h2>
        <p className="text-center text-slate-600 mb-8 sm:mb-12 text-sm sm:text-base">
          Alles was du über TabScan Menü & Imbiss Order wissen solltest
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
            Bereit für die Zukunft?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-10 sm:mb-12">
            Starte heute. 14 Tage kostenlos. Keine Kreditkarte nötig.
          </p>
          <button 
            onClick={openModal}
            className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-10 sm:px-14 py-5 sm:py-6 rounded-2xl font-black text-lg sm:text-xl hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-110 inline-flex items-center gap-3"
          >
            <Rocket size={24} />
            Jetzt starten
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
                <p className="text-slate-600 text-sm sm:text-base">Wir kontaktieren dich in Kürze. 🚀</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Kostenlos starten</h2>
                <p className="text-slate-600 mb-6 text-sm sm:text-base">
                  Wähle TabScan Menü oder Imbiss Order
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
                      placeholder="Dein Restaurant oder Imbiss"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 text-sm sm:text-base transform hover:scale-105"
                  >
                    Jetzt starten → 
                  </button>
                </form>

                <p className="text-xs text-slate-500 text-center mt-4">
                  Kein Spam, versprochen! 🎯
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}