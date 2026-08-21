'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, Menu, Smartphone, TrendingUp, Users, Calendar, MapPin, X, MenuIcon, ChevronDown, Play, Zap, Shield, Rocket } from 'lucide-react';

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

// Parallax Splash Screen Component
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
  const contentY = scrollProgress * 0.5;
  const opacity = Math.max(0, 1 - scrollProgress * 0.02);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 z-50 flex items-center justify-center overflow-hidden">
      <style jsx>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .parallax-splash {
          animation: fadeOut 0.8s ease-out forwards;
          animation-delay: 3.5s;
        }
        .pulse-ring {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
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
          transform: `translateY(${contentY * 2}px)`,
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

// FAQ Item Component
function FAQItemComponent({ item, index }: { item: FAQItem; index: number }) {
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
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-red-100 bg-red-50 animate-in fade-in slide-in-from-top-2 duration-300">
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
  const [videoPlaying, setVideoPlaying] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: "Wie lange dauert es, bis TabScan einsatzbereit ist?",
      answer: "Ungefähr 5 Minuten. Du registrierst dich, gibst dein Menü ein (oder lädst es hoch), und erhältst sofort deine QR-Codes zum Ausdrucken. Keine komplizierten Setups, keine technischen Kenntnisse erforderlich."
    },
    {
      question: "Kann ich mein Menü jederzeit ändern?",
      answer: "Ja, absolut! Mit TabScan updatest du dein Menü in Sekundenschnelle. Neue Gerichte? Weg in 30 Sekunden. Preisanpassungen? Sofort live für alle Gäste. Keine neuen Karten drucken nötig."
    },
    {
      question: "Funktioniert es auch ohne Internet im Restaurant?",
      answer: "Die QR-Codes sind dauerhaft gültig und erfordern keine Synchronisierung. Deine Gäste brauchen nur Internetzugriff auf ihrem Handy. Dein Restaurant-WLAN genügt vollkommen."
    },
    {
      question: "Wie viel kostet TabScan wirklich?",
      answer: "Basic-Plan startet bei CHF 49/Monat. Dafür erhältst du digitale Speisekarten, QR-Codes und Email-Support. Pro (CHF 99) beinhaltet Bestellsystem und Kitchen Display. Keine versteckten Gebühren, keine Setup-Kosten."
    },
    {
      question: "Können meine Gäste auch bestellen?",
      answer: "Ja, das ist optional. Mit Basic-Plan nur Menü-Anschauen. Mit Pro oder Business-Plan können Gäste direkt bestellen, und du siehst die Bestellungen live in der Küche. Du entscheidest, was aktiviert ist."
    },
    {
      question: "Ist TabScan mobil-freundlich?",
      answer: "100%. TabScan ist von Grund auf für Handys optimiert. Große Texte, einfache Navigation, schnelle Ladezeit. Deine Gäste brauchen nur einen QR-Code zu scannen."
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
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .gradient-text {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.15);
        }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
          <img 
            src="/tabscan-logo.png" 
            alt="TabScan Logo" 
            className="h-20 sm:h-32 w-auto hover:scale-105 transition-transform"
          />
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 sm:gap-8 items-center">
            <button 
              onClick={() => scrollToSection('vorteile')}
              className="text-sm text-slate-600 hover:text-red-600 font-medium transition duration-300"
            >
              Vorteile
            </button>
            <button 
              onClick={() => scrollToSection('preise')}
              className="text-sm text-slate-600 hover:text-red-600 font-medium transition duration-300"
            >
              Preise
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
              Kostenlos starten
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-900"
          >
            <MenuIcon size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 animate-slide-up">
            <button 
              onClick={() => scrollToSection('vorteile')}
              className="block w-full text-left text-sm text-slate-600 hover:text-red-600 font-medium py-2"
            >
              Vorteile
            </button>
            <button 
              onClick={() => scrollToSection('preise')}
              className="block w-full text-left text-sm text-slate-600 hover:text-red-600 font-medium py-2"
            >
              Preise
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
              Kostenlos starten
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section - MEGA DRAMATIC */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50 pt-12 sm:pt-20 pb-20 sm:pb-32">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="animate-fade-in-left">
              <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6 hover:bg-red-200 transition">
                🇨🇭 MADE IN SWITZERLAND
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight">
                Vergiss gedruckte <span className="gradient-text">Menüs.</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 sm:mb-10 leading-relaxed font-medium">
                Deine Gäste scannen. Sie sehen das Menü. Sie bestellen. Du siehst alles in <span className="text-red-600 font-bold">Echtzeit.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-12 sm:mb-16">
                <button 
                  onClick={openModal}
                  className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 sm:px-10 py-4 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Rocket size={20} />
                  14 Tage kostenlos testen
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={() => setVideoPlaying(!videoPlaying)}
                  className="group relative border-2 border-slate-300 text-slate-900 px-8 sm:px-10 py-4 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:border-red-600 hover:bg-red-50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Play size={20} />
                  Video ansehen
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 sm:gap-8">
                <div className="group">
                  <div className="text-2xl sm:text-3xl font-black text-red-600">20+</div>
                  <p className="text-xs sm:text-sm text-slate-600 group-hover:text-red-600 transition">Restaurants aktiv</p>
                </div>
                <div className="group">
                  <div className="text-2xl sm:text-3xl font-black text-red-600">5 Min</div>
                  <p className="text-xs sm:text-sm text-slate-600 group-hover:text-red-600 transition">Bis live gehen</p>
                </div>
                <div className="group">
                  <div className="text-2xl sm:text-3xl font-black text-red-600">CHF 0</div>
                  <p className="text-xs sm:text-sm text-slate-600 group-hover:text-red-600 transition">Setup-Kosten</p>
                </div>
              </div>
            </div>

            {/* Phone Mockup - FLOATING */}
            <div className="flex justify-center animate-float">
              <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl sm:rounded-4xl p-4 sm:p-6 shadow-2xl w-72 sm:w-96 h-96 sm:h-full max-h-96 sm:max-h-full flex flex-col hover-lift">
                <div className="bg-white rounded-2xl sm:rounded-3xl flex-1 flex flex-col overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 sm:px-6 py-3 sm:py-4">
                    <p className="text-xs sm:text-sm font-bold">Royal Restaurant</p>
                    <p className="text-xs text-slate-400">Heute geöffnet bis 23:00</p>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
                    <div className="border-2 border-slate-200 rounded-lg p-3 sm:p-4 hover:border-red-300 hover:bg-red-50 transition-all duration-300 transform hover:scale-105">
                      <p className="font-bold text-xs sm:text-sm text-slate-900">Ribeye Steak</p>
                      <p className="text-xs text-slate-600">Mit Kartoffeln & Sauce</p>
                      <p className="text-red-600 font-black text-xs sm:text-sm mt-2">CHF 45.90</p>
                    </div>
                    <div className="border-2 border-slate-200 rounded-lg p-3 sm:p-4 hover:border-red-300 hover:bg-red-50 transition-all duration-300 transform hover:scale-105">
                      <p className="font-bold text-xs sm:text-sm text-slate-900">Fisch del Día</p>
                      <p className="text-xs text-slate-600">Saisonale Spezialität</p>
                      <p className="text-red-600 font-black text-xs sm:text-sm mt-2">CHF 38.50</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold hover:shadow-lg transition-all duration-300">
                    → Zum Bestellen scannen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - IF PLAYING */}
      {videoPlaying && (
        <section className="bg-black py-8 sm:py-12 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="relative bg-slate-900 rounded-lg overflow-hidden aspect-video max-w-4xl mx-auto">
              <button
                onClick={() => setVideoPlaying(false)}
                className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all"
              >
                <X size={24} />
              </button>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <Play size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Video kommt bald... 🎬</p>
                  <p className="text-sm text-slate-400 mt-2">Generiere es mit Gemini!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Section - Kunden */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-10 sm:mb-12">
            ⭐ Trusted by restaurants in Switzerland
          </p>
          <div className="grid grid-cols-3 gap-6 sm:gap-12 items-center justify-center">
            <div className="text-center hover:scale-110 transition-transform duration-300">
              <div className="text-xl sm:text-2xl font-black text-red-500 mb-1">👑</div>
              <p className="font-bold text-sm sm:text-lg">Royal</p>
              <p className="text-xs text-slate-400">Premium Dining</p>
            </div>
            <div className="text-center hover:scale-110 transition-transform duration-300">
              <div className="text-xl sm:text-2xl font-black text-red-500 mb-1">🔥</div>
              <p className="font-bold text-sm sm:text-lg">KULT</p>
              <p className="text-xs text-slate-400">Shisha Bar</p>
            </div>
            <div className="text-center hover:scale-110 transition-transform duration-300">
              <div className="text-xl sm:text-2xl font-black text-red-500 mb-1">✨</div>
              <p className="font-bold text-sm sm:text-lg">Golden Club</p>
              <p className="text-xs text-slate-400">Lounge</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="vorteile" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Warum <span className="gradient-text">TabScan?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Wir machen es dir leicht. Keine versteckten Überraschungen. Nur das, was dein Restaurant braucht.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { icon: Zap, title: 'Blitzschnell', desc: '5 Minuten Setup. Sofort live.' },
            { icon: Smartphone, title: 'Mobile First', desc: '100% optimiert für Handys.' },
            { icon: TrendingUp, title: 'Real-Time Analytics', desc: 'Sehe welche Gerichte beliebt sind.' },
            { icon: Users, title: 'Multi-Lingual', desc: '10+ Sprachen. Ein Klick.' },
            { icon: Shield, title: 'Sicher & DSGVO', desc: 'Daten bleiben in der Schweiz.' },
            { icon: Rocket, title: 'Wachstum ohne Grenzen', desc: 'Von Basic zu Enterprise.' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="group bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-red-300 hover:shadow-xl transition-all duration-300 hover-lift"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-red-600 transition">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-4 text-center">
            Papiermenü vs. <span className="text-red-500">TabScan</span>
          </h2>
          <p className="text-center text-slate-400 mb-8 sm:mb-12 text-sm sm:text-base">
            Ein klarer Vergleich zweier Welten
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b-2 border-red-500">
                  <th className="text-left py-4 px-4 font-black text-white">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-400">📄 Papier</th>
                  <th className="text-center py-4 px-4 font-bold text-red-500">✨ TabScan</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Startkosten', paper: 'CHF 200+', tabscan: 'CHF 0' },
                  { feature: 'Menü updaten', paper: 'Neue Karten drucken', tabscan: '30 Sekunden' },
                  { feature: 'Live-Analyse', paper: '❌', tabscan: '✅ Real-Time' },
                  { feature: 'Bestellungen', paper: '❌', tabscan: '✅ Sofort sichtbar' },
                  { feature: 'Umwelt-Impact', paper: '♻️ Hoch', tabscan: '🌱 Null' },
                  { feature: 'Mehrsprachig', paper: '❌ Teuer', tabscan: '✅ 10+ Sprachen' }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors duration-300">
                    <td className="py-4 px-4 font-bold text-white">{row.feature}</td>
                    <td className="text-center py-4 px-4 text-slate-400">{row.paper}</td>
                    <td className="text-center py-4 px-4 text-red-400 font-bold">{row.tabscan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="preise" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2 sm:mb-4 text-center">
          Transparente <span className="gradient-text">Preise</span>
        </h2>
        <p className="text-center text-slate-600 mb-8 sm:mb-16 text-sm sm:text-base">
          Wähle den Plan, der zu dir passt. Upgrade jederzeit ohne Stress.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Basic */}
          <div className="border-2 border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover-lift group bg-white">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">Basic</h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 group-hover:text-red-600 transition">Zum Start</p>
            <div className="mb-6">
              <span className="text-4xl sm:text-5xl font-black text-red-600">CHF 49</span>
              <span className="text-slate-600 text-xs sm:text-sm">/Monat</span>
            </div>
            <ul className="space-y-2 sm:space-y-3 mb-8 text-xs sm:text-sm">
              {['Digitale Speisekarte', 'Bis 10 Tische', 'QR-Codes', 'Email Support'].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900 transition">
                  <Check size={16} className="text-red-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={openModal}
              className="w-full border-2 border-slate-300 text-slate-900 py-3 rounded-lg font-bold hover:border-red-600 hover:text-red-600 transition-all duration-300"
            >
              Starten
            </button>
          </div>

          {/* Pro - FEATURED */}
          <div className="border-2 border-red-600 rounded-2xl p-6 bg-gradient-to-br from-red-50 to-white relative hover:shadow-2xl transition-all duration-300 hover-lift group transform md:scale-105 z-10">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1 rounded-full text-xs font-black uppercase">🏆 BELIEBT</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 mt-6">Pro</h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 group-hover:text-red-600 transition">Für wachsende Restaurants</p>
            <div className="mb-6">
              <span className="text-4xl sm:text-5xl font-black text-red-600">CHF 99</span>
              <span className="text-slate-600 text-xs sm:text-sm">/Monat</span>
            </div>
            <ul className="space-y-2 sm:space-y-3 mb-8 text-xs sm:text-sm">
              {['Alles von Basic +', 'Bestellsystem', 'Bis 25 Tische', 'Kitchen Display'].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={openModal}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-105"
            >
              Starten →
            </button>
          </div>

          {/* Business */}
          <div className="border-2 border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover-lift group bg-white">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">Business</h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 group-hover:text-red-600 transition">Analytics & Zahlung</p>
            <div className="mb-6">
              <span className="text-4xl sm:text-5xl font-black text-red-600">CHF 199</span>
              <span className="text-slate-600 text-xs sm:text-sm">/Monat</span>
            </div>
            <ul className="space-y-2 sm:space-y-3 mb-8 text-xs sm:text-sm">
              {['Alles von Pro +', 'Analytics Dashboard', 'Zahlungsintegration', 'Custom Branding'].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900 transition">
                  <Check size={16} className="text-red-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={openModal}
              className="w-full border-2 border-slate-300 text-slate-900 py-3 rounded-lg font-bold hover:border-red-600 hover:text-red-600 transition-all duration-300"
            >
              Starten
            </button>
          </div>

          {/* Enterprise */}
          <div className="border-2 border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover-lift group bg-white">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">Enterprise</h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-6 group-hover:text-red-600 transition">Alles + Support</p>
            <div className="mb-6">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">Auf Anfrage</span>
            </div>
            <ul className="space-y-2 sm:space-y-3 mb-8 text-xs sm:text-sm">
              {['Alles miteinander', 'Account Manager', 'Custom Development', 'SLA Garantie'].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900 transition">
                  <Check size={16} className="text-red-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={openModal}
              className="w-full border-2 border-red-600 text-red-600 py-3 rounded-lg font-bold hover:bg-red-50 transition-all duration-300"
            >
              Kontaktieren
            </button>
          </div>
        </div>

        <p className="text-center text-slate-600 mt-8 sm:mt-12 text-xs sm:text-sm">
          ✅ Alle Preise ohne MWST • 14 Tage kostenlos testen • Keine Kreditkarte erforderlich • Jederzeit kündbar
        </p>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gradient-to-br from-slate-50 to-red-50 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2 sm:mb-4 text-center">
            Häufig gestellte <span className="gradient-text">Fragen</span>
          </h2>
          <p className="text-center text-slate-600 mb-8 sm:mb-12 text-sm sm:text-base">
            Alles, was du über TabScan wissen solltest
          </p>

          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((item, index) => (
              <FAQItemComponent key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white py-16 sm:py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
            Bereit für die Zukunft?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-10 sm:mb-12">
            Starte noch heute. 14 Tage kostenlos. Keine Kreditkarte nötig.
          </p>
          <button 
            onClick={openModal}
            className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-10 sm:px-14 py-5 sm:py-6 rounded-2xl font-black text-lg sm:text-xl hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 transform hover:scale-110 inline-flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <Rocket size={24} />
            Kostenlos testen
            <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 sm:py-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Produkt</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-red-500 transition">Features</a></li>
                <li><a href="#" className="hover:text-red-500 transition">Preise</a></li>
                <li><a href="#" className="hover:text-red-500 transition">Sicherheit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Unternehmen</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-red-500 transition">Blog</a></li>
                <li><a href="#" className="hover:text-red-500 transition">Kontakt</a></li>
                <li><a href="#" className="hover:text-red-500 transition">Über uns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-red-500 transition">Datenschutz</a></li>
                <li><a href="#" className="hover:text-red-500 transition">Bedingungen</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-red-500 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-red-500 transition">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-left">
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
                  Fülle das Formular aus. Keine Kreditkarte nötig.
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
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2 uppercase">Restaurant (Optional)</label>
                    <input
                      type="text"
                      name="restaurant"
                      value={formData.restaurant}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition"
                      placeholder="Dein Restaurant"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2 uppercase">Nachricht (Optional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/50 transition h-24 resize-none"
                      placeholder="Wie können wir dir helfen?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 text-sm sm:text-base transform hover:scale-105"
                  >
                    Kostenlos starten → 
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