'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, Menu, Smartphone, TrendingUp, Users, Calendar, MapPin, X, MenuIcon, ChevronDown } from 'lucide-react';

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
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center overflow-hidden">
      <style jsx>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            pointer-events: none;
          }
        }

        .parallax-splash {
          animation: fadeOut 0.8s ease-out forwards;
          animation-delay: 3.5s;
        }
      `}</style>

      <div className="parallax-splash absolute inset-0 bg-white"></div>

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
        <div className="w-80 h-80">
          <img 
            src="/tabscan-logo.png" 
            alt="TabScan" 
            className="w-full h-full object-contain"
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
        <p className="text-slate-600 text-sm font-semibold">TabScan wird geladen...</p>
        <div className="mt-4 w-48 h-1 bg-slate-200 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-red-600 transition-all duration-100"
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
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-slate-50 transition text-left"
      >
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 pr-4">
          {item.question}
        </h3>
        <ChevronDown 
          size={20} 
          className={`flex-shrink-0 text-red-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-slate-200 bg-slate-50">
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
      {/* Navigation */}
      <nav className="sticky top-0 bg-white border-b border-slate-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
          <img 
            src="/tabscan-logo.png" 
            alt="TabScan Logo" 
            className="h-20 sm:h-32 w-auto"
          />
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 sm:gap-8 items-center">
            <button 
              onClick={() => scrollToSection('vergleich')}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium transition"
            >
              Vorteile
            </button>
            <button 
              onClick={() => scrollToSection('preise')}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium transition"
            >
              Preise
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium transition"
            >
              FAQ
            </button>
            <button 
              onClick={openModal}
              className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
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
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3">
            <button 
              onClick={() => scrollToSection('vergleich')}
              className="block w-full text-left text-sm text-slate-600 hover:text-slate-900 font-medium py-2"
            >
              Vorteile
            </button>
            <button 
              onClick={() => scrollToSection('preise')}
              className="block w-full text-left text-sm text-slate-600 hover:text-slate-900 font-medium py-2"
            >
              Preise
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left text-sm text-slate-600 hover:text-slate-900 font-medium py-2"
            >
              FAQ
            </button>
            <button 
              onClick={openModal}
              className="w-full bg-red-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
            >
              Kostenlos starten
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 animate-in fade-in slide-in-from-bottom duration-1000">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <p className="text-red-600 text-xs sm:text-sm font-bold uppercase tracking-wide mb-4">
              Digitale Lösungen für Gastronomie
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Vergiss gedruckte Menüs.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed">
              Deine Gäste scannen. Sie sehen das Menü. Sie bestellen. Du siehst alles in Echtzeit. Keine Komplexität. Keine Druckkosten. Nur elegante Effizienz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12">
              <button 
                onClick={openModal}
                className="bg-red-600 text-white px-6 sm:px-7 py-3 sm:py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                14 Tage kostenlos testen
                <ChevronRight size={18} />
              </button>
              <button className="border-2 border-slate-300 text-slate-900 px-6 sm:px-7 py-3 sm:py-3 rounded-lg font-semibold hover:bg-slate-50 transition w-full sm:w-auto">
                Video ansehen
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-12">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">20+</div>
                <p className="text-xs sm:text-sm text-slate-600">Restaurants aktiv</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">5 Min</div>
                <p className="text-xs sm:text-sm text-slate-600">Bis live gehen</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-red-600">CHF 0</div>
                <p className="text-xs sm:text-sm text-slate-600">Setup-Kosten</p>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center">
            <div className="bg-slate-100 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-lg w-64 sm:w-80 h-80 sm:h-96 flex flex-col">
              <div className="bg-white rounded-xl sm:rounded-2xl flex-1 flex flex-col overflow-hidden">
                <div className="bg-slate-900 text-white px-3 sm:px-4 py-2 sm:py-3">
                  <p className="text-xs sm:text-sm font-semibold">Royal Restaurant</p>
                  <p className="text-xs text-slate-400">Heute geöffnet bis 23:00</p>
                </div>
                
                <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-2 sm:space-y-3">
                  <div className="border border-slate-200 rounded-lg p-2 sm:p-3">
                    <p className="font-semibold text-xs sm:text-sm text-slate-900">Ribeye Steak</p>
                    <p className="text-xs text-slate-600">Mit Kartoffeln & Sauce</p>
                    <p className="text-red-600 font-bold text-xs sm:text-sm mt-1 sm:mt-2">CHF 45.90</p>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-2 sm:p-3">
                    <p className="font-semibold text-xs sm:text-sm text-slate-900">Fisch del Día</p>
                    <p className="text-xs text-slate-600">Saisonale Spezialität</p>
                    <p className="text-red-600 font-bold text-xs sm:text-sm mt-1 sm:mt-2">CHF 38.50</p>
                  </div>
                </div>

                <div className="bg-red-600 text-white px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">
                  Zum Bestellen scannen
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section - Kunden */}
      <section className="bg-slate-50 py-12 sm:py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-slate-600 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-8">
            Trusted by restaurants in Switzerland
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-12 items-center justify-center">
            <div className="flex items-center justify-center h-16 sm:h-20">
              <div className="text-center">
                <p className="font-bold text-base sm:text-lg text-slate-900">Royal</p>
                <p className="text-xs text-slate-600">Premium Dining</p>
              </div>
            </div>
            <div className="flex items-center justify-center h-16 sm:h-20">
              <div className="text-center">
                <p className="font-bold text-base sm:text-lg text-slate-900">KULT</p>
                <p className="text-xs text-slate-600">Shisha Bar</p>
              </div>
            </div>
            <div className="flex items-center justify-center h-16 sm:h-20">
              <div className="text-center">
                <p className="font-bold text-base sm:text-lg text-slate-900">Golden Club</p>
                <p className="text-xs text-slate-600">Lounge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="vergleich" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-4 text-center">Papiermenü vs. TabScan</h2>
        <p className="text-center text-slate-600 mb-8 sm:mb-12 text-sm sm:text-base">
          Ein klarer Vergleich zweier Welten
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-4 px-4 font-bold text-slate-900">Feature</th>
                <th className="text-center py-4 px-4 font-bold text-slate-600">Papier</th>
                <th className="text-center py-4 px-4 font-bold text-slate-900">TabScan</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Startkosten', paper: 'CHF 200+', tabscan: 'CHF 0' },
                { feature: 'Menü updaten', paper: 'Neue Karten drucken', tabscan: '30 Sekunden' },
                { feature: 'Gericht ausverkauft', paper: 'Geschlossene Speisekarte', tabscan: 'Sofort weg' },
                { feature: 'Multilingual', paper: '✗', tabscan: '✓ 10+ Sprachen' },
                { feature: 'Gast-Daten', paper: '✗', tabscan: '✓ Analytics & Insights' },
                { feature: 'Bestellungen', paper: '✗', tabscan: '✓ Live Dashboard' },
                { feature: 'Druckkosten', paper: 'Regelmäßig', tabscan: 'Null' },
                { feature: 'Umwelt-Impact', paper: '♻️ Hoch', tabscan: '🌱 Minimal' }
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-4 font-semibold text-slate-900">{row.feature}</td>
                  <td className="text-center py-4 px-4 text-slate-600">{row.paper}</td>
                  <td className="text-center py-4 px-4 text-slate-900 font-semibold">{row.tabscan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing */}
      <section id="preise" className="bg-slate-50 py-12 sm:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-4 text-center">Transparente Preise</h2>
          <p className="text-center text-slate-600 mb-8 sm:mb-16 text-sm sm:text-base">Wähle den Plan, der zu dir passt. Upgrade jederzeit.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Basic */}
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Basic</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6">Zum Start</p>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-slate-900">CHF 49</span>
                <span className="text-slate-600 text-xs sm:text-sm">/Monat</span>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-8 text-xs sm:text-sm">
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Digitale Speisekarte
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Bis 10 Tische
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  QR-Codes
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Email Support
                </li>
              </ul>
              <button 
                onClick={openModal}
                className="w-full border-2 border-slate-300 text-slate-900 py-2 sm:py-3 rounded-lg font-semibold hover:bg-slate-50 transition text-sm sm:text-base"
              >
                Starten
              </button>
            </div>

            {/* Pro - FEATURED */}
            <div className="border-2 border-red-600 rounded-lg p-6 bg-red-50 relative md:col-span-1 lg:col-span-1">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">BELIEBT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 mt-4">Pro</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6">Für wachsende Restaurants</p>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-red-600">CHF 99</span>
                <span className="text-slate-600 text-xs sm:text-sm">/Monat</span>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-8 text-xs sm:text-sm">
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Alles von Basic +
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Bestellsystem
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Bis 25 Tische
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Kitchen Display
                </li>
              </ul>
              <button 
                onClick={openModal}
                className="w-full bg-red-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-red-700 transition text-sm sm:text-base"
              >
                Starten
              </button>
            </div>

            {/* Business */}
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Business</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6">Analytics & Zahlung</p>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-slate-900">CHF 199</span>
                <span className="text-slate-600 text-xs sm:text-sm">/Monat</span>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-8 text-xs sm:text-sm">
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Alles von Pro +
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Analytics
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Zahlungsintegration
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Custom Branding
                </li>
              </ul>
              <button 
                onClick={openModal}
                className="w-full border-2 border-slate-300 text-slate-900 py-2 sm:py-3 rounded-lg font-semibold hover:bg-slate-50 transition text-sm sm:text-base"
              >
                Starten
              </button>
            </div>

            {/* Enterprise */}
            <div className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6">Alles + Support</p>
              <div className="mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">Auf Anfrage</span>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-8 text-xs sm:text-sm">
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Alles miteinander
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Account Manager
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  Custom Development
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Check size={16} className="text-red-600" />
                  SLA Garantie
                </li>
              </ul>
              <button 
                onClick={openModal}
                className="w-full border-2 border-red-600 text-red-600 py-2 sm:py-3 rounded-lg font-semibold hover:bg-red-50 transition text-sm sm:text-base"
              >
                Kontaktieren
              </button>
            </div>
          </div>

          <p className="text-center text-slate-600 mt-8 sm:mt-12 text-xs sm:text-sm">
            Alle Preise ohne MWST. 14 Tage kostenlos testen, keine Kreditkarte erforderlich. Jederzeit kündbar.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-4 text-center">Häufig gestellte Fragen</h2>
        <p className="text-center text-slate-600 mb-8 sm:mb-12 text-sm sm:text-base">
          Alles, was du über TabScan wissen solltest
        </p>

        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <FAQItemComponent key={index} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 text-white py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Bereit für digitale Lösungen?</h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8">
            Starte noch heute. 14 Tage kostenlos. Keine Kreditkarte nötig.
          </p>
          <button 
            onClick={openModal}
            className="bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-red-700 transition inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            Kostenlos testen
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Produkt</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition">Features</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Preise</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Sicherheit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Unternehmen</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition">Blog</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Kontakt</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Über uns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition">Datenschutz</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Bedingungen</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-xs sm:text-sm">© 2024 TabScan. Alle Rechte vorbehalten.</p>
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src="/tabscan-icon.png" 
                alt="TabScan Logo" 
                className="h-8 sm:h-10 w-auto"
              />
              <p className="text-slate-600 text-xs sm:text-sm">
                Made with ❤️ in Switzerland
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-4xl sm:text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Vielen Dank!</h2>
                <p className="text-slate-600 text-sm sm:text-base">Wir kontaktieren dich in Kürze.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Kostenlos starten</h2>
                <p className="text-slate-600 mb-6 text-sm sm:text-base">
                  Füllen Sie das Formular aus und wir kontaktieren Sie in Kürze.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      placeholder="Dein Name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      placeholder="deine@email.ch"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                      Restaurant/Betrieb (Optional)
                    </label>
                    <input
                      type="text"
                      name="restaurant"
                      value={formData.restaurant}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      placeholder="Dein Restaurant"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                      Nachricht (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 h-20 resize-none"
                      placeholder="Wie können wir dir helfen?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition text-sm sm:text-base"
                  >
                    Kostenlos starten
                  </button>
                </form>

                <p className="text-xs text-slate-500 text-center mt-4">
                  Wir werden dich in Kürze kontaktieren. Kein Spam, versprochen! 🎯
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}