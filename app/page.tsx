'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, Menu, Smartphone, TrendingUp, Users, Calendar, MapPin, X, Menu as MenuIcon } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  restaurant: string;
  message: string;
}

// Parallax Splash Screen Component
function ParallaxSplash({ onComplete }: { onComplete: () => void }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate scroll animation
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

  const logoScale = 1 - scrollProgress * 0.004; // Gradually shrinks
  const logoX = scrollProgress * 1.5; // Moves left
  const contentY = scrollProgress * 0.5; // Moves up slowly
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

      {/* Logo - Parallax movimento */}
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
        <div className="w-96 h-96">
          <img 
            src="/logo-primary.png" 
            alt="QR Order" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Content - Slides up */}
      <div 
        className="absolute bottom-20 text-center z-10 transition-all duration-100 ease-out"
        style={{
          transform: `translateY(${contentY * 2}px)`,
          opacity: Math.max(0, 1 - scrollProgress * 0.01),
        }}
      >
        <p className="text-slate-600 text-sm font-semibold">QR Order lädt...</p>
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

export default function QROrderLanding() {
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
            src="/logo-primary.png" 
            alt="QR Order Logo" 
            className="h-30 sm:h-45 w-auto"
          />
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 sm:gap-8 items-center">
            <button 
              onClick={() => scrollToSection('funktioniert')}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium transition"
            >
              Wie es funktioniert
            </button>
            <button 
              onClick={() => scrollToSection('preise')}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium transition"
            >
              Preise
            </button>
            <button 
              onClick={() => scrollToSection('restaurants')}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium transition"
            >
              Restaurants
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
              onClick={() => scrollToSection('funktioniert')}
              className="block w-full text-left text-sm text-slate-600 hover:text-slate-900 font-medium py-2"
            >
              Wie es funktioniert
            </button>
            <button 
              onClick={() => scrollToSection('preise')}
              className="block w-full text-left text-sm text-slate-600 hover:text-slate-900 font-medium py-2"
            >
              Preise
            </button>
            <button 
              onClick={() => scrollToSection('restaurants')}
              className="block w-full text-left text-sm text-slate-600 hover:text-slate-900 font-medium py-2"
            >
              Restaurants
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
              Digitale Speisekarte für Schweizer Restaurants
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Dein Menü,<br />digital. Einfach.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed">
              QR Order ist die digitale Speisekarte, die sich deinem Restaurant anpasst. Nicht umgekehrt. Egal, ob du nur ein Menü brauchst oder vollständige Bestellfunktion—wir bauen, was du brauchst.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12">
              <button 
                onClick={openModal}
                className="bg-red-600 text-white px-6 sm:px-7 py-3 sm:py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Jetzt starten
                <ChevronRight size={18} />
              </button>
              <button className="border-2 border-slate-300 text-slate-900 px-6 sm:px-7 py-3 sm:py-3 rounded-lg font-semibold hover:bg-slate-50 transition w-full sm:w-auto">
                Live Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-12">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">20+</div>
                <p className="text-xs sm:text-sm text-slate-600">Restaurants aktiv</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">CHF 49</div>
                <p className="text-xs sm:text-sm text-slate-600">Ab dieser Gebühr</p>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">5 Min</div>
                <p className="text-xs sm:text-sm text-slate-600">Bis live gehen</p>
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

      {/* How It Works */}
      <section id="funktioniert" className="bg-slate-50 py-12 sm:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-4 text-center">Wie es funktioniert</h2>
          <p className="text-center text-slate-600 mb-8 sm:mb-16 text-sm sm:text-lg">In 3 einfachen Schritten zum digitalen Menü</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="bg-red-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">1</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Menü hochladen</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Gib dein Menü ein oder importiere es. Kategorien, Preise, Allergene—alles in einem Schritt. Mit KI-Support geht's noch schneller.
              </p>
            </div>

            <div>
              <div className="bg-red-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">2</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">QR-Codes drucken</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                QR-Codes für deine Tische generieren. Wir geben dir druckfertige Vorlagen. Einmal druckt, immer gültig.
              </p>
            </div>

            <div>
              <div className="bg-red-600 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">3</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Gäste scannen</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Deine Gäste scannen, sehen das Menü. Das wars. Wenn du Ordering willst: Sie bestellen direkt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-8 sm:mb-16 text-center">Was QR Order anders macht</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
          <div className="flex gap-4">
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Dein Menü, deine Regeln</h3>
              <p className="text-sm sm:text-base text-slate-600">Du entscheidest, wie dein Menü aussieht. Farben, Kategorien, Beschreibungen—alles anpassbar. Keine Vorlagen, die nicht passen.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Mehrsprachig von Tag eins</h3>
              <p className="text-sm sm:text-base text-slate-600">Deutsch, Englisch, Arabisch, Chinesisch—alle Sprachen gleichzeitig. Deine Gäste wechseln mit einem Tap.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Wachsen, ohne Schmerzen</h3>
              <p className="text-sm sm:text-base text-slate-600">Start mit einem Basic-Plan. Wenn du wachsen willst, upgrade zu Pro oder Business. Keine unnötigen Features am Anfang.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Support von echten Menschen</h3>
              <p className="text-sm sm:text-base text-slate-600">Nicht von Bots. Echte Schweizer, die Restaurants verstehen. Du erreichst uns per Email, Chat oder Telefon.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Schnelle Updates</h3>
              <p className="text-sm sm:text-base text-slate-600">Tagesmenü? Update in 30 Sekunden. Gericht ausverkauft? Weg damit. Keine Druckkosten für neue Karten.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Schweizer Standard</h3>
              <p className="text-sm sm:text-base text-slate-600">Deine Daten bleiben in der Schweiz. DSGVO-konform, CHF-Preise, Schweizer Support—alles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="restaurants" className="bg-slate-50 py-12 sm:py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-8 sm:mb-16 text-center">Restaurants vertrauen QR Order</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900">Royal</h3>
                <p className="text-slate-600 text-xs sm:text-sm">Premium Fine Dining, Zürich</p>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed italic text-sm sm:text-base">
                "Unsere Gäste lieben die digitale Erfahrung. Wir sehen 3x mehr Bestellungen über QR Order. Das Menü sieht eleganter aus als auf Papier."
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 text-xs sm:text-sm">Mehmed Özaer</p>
                  <p className="text-xs text-slate-600">Geschäftsführer</p>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900">KULT Shisha Bar</h3>
                <p className="text-slate-600 text-xs sm:text-sm">Modern Lounge, Basel</p>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed italic text-sm sm:text-base">
                "Der Setup war super einfach. Nach 30 Minuten waren wir live. Unsere Gäste bestellen jetzt direkt ihre Getränke—viel schneller Service."
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 text-xs sm:text-sm">Info Team</p>
                  <p className="text-xs text-slate-600">KULT Bar</p>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900">Golden Club Lounge</h3>
                <p className="text-slate-600 text-xs sm:text-sm">Elegante Lounge, Zürich</p>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed italic text-sm sm:text-base">
                "Das Design passt perfekt zu unserer Marke. Unsere Premium-Gäste fühlen sich wertgeschätzt. Großartig gelöst!"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 text-xs sm:text-sm">Altin K.</p>
                  <p className="text-xs text-slate-600">Management</p>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="preise" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-4 text-center">Transparente Preise</h2>
        <p className="text-center text-slate-600 mb-8 sm:mb-16 text-sm sm:text-lg">Wähle den Plan, der zu dir passt. Upgrade jederzeit.</p>

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
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 text-white py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Bereit für digitale Speisekarten?</h2>
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
            <p className="text-slate-600 text-xs sm:text-sm">© 2024 QR Order. Alle Rechte vorbehalten.</p>
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src="/logo-primary.png" 
                alt="QR Order Logo" 
                className="h-10 sm:h-14 w-auto"
              />
              <p className="text-slate-600 text-xs sm:text-sm">
                Ein Produkt von{' '}
                <a 
                  href="https://ozbi.ch" 
                  className="text-red-600 font-semibold hover:underline"
                >
                  Ozbi Gruppe
                </a>
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