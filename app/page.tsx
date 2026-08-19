'use client';

import React, { useState } from 'react';
import { ChevronRight, Check, Menu, Smartphone, TrendingUp, Users, Calendar, MapPin, X } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  restaurant: string;
  message: string;
}

export default function QROrderLanding() {
  const [showModal, setShowModal] = useState<boolean>(false);
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
    }
  };

  const openModal = () => {
    setShowModal(true);
    setSubmitted(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setFormData({ name: '', email: '', restaurant: '', message: '' });
  };

  return (
    <div className="bg-white text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white border-b border-slate-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <img 
            src="/logo-primary.png" 
            alt="QR Order Logo" 
            className="h-10 w-auto"
          />
          <div className="flex gap-8 items-center">
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-red-600 text-sm font-bold uppercase tracking-wide mb-4">
              Digitale Speisekarte für Schweizer Restaurants
            </p>
            <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Dein Menü,<br />digital. Einfach.
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              QR Order ist die digitale Speisekarte, die sich deinem Restaurant anpasst. Nicht umgekehrt. Egal, ob du nur ein Menü brauchst oder vollständige Bestellfunktion—wir bauen, was du brauchst.
            </p>
            
            <div className="flex gap-4 mb-12">
              <button 
                onClick={openModal}
                className="bg-red-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
              >
                Jetzt starten
                <ChevronRight size={18} />
              </button>
              <button className="border-2 border-slate-300 text-slate-900 px-7 py-3 rounded-lg font-semibold hover:bg-slate-50 transition">
                Live Demo
              </button>
            </div>

            <div className="flex gap-12">
              <div>
                <div className="text-2xl font-bold text-slate-900">20+</div>
                <p className="text-sm text-slate-600">Restaurants aktiv</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">CHF 49</div>
                <p className="text-sm text-slate-600">Ab dieser Gebühr</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">5 Min</div>
                <p className="text-sm text-slate-600">Bis live gehen</p>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center">
            <div className="bg-slate-100 rounded-3xl p-4 shadow-lg w-80 h-96 flex flex-col">
              <div className="bg-white rounded-2xl flex-1 flex flex-col overflow-hidden">
                <div className="bg-slate-900 text-white px-4 py-3">
                  <p className="text-sm font-semibold">Royal Restaurant</p>
                  <p className="text-xs text-slate-400">Heute geöffnet bis 23:00</p>
                </div>
                
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  <div className="border border-slate-200 rounded-lg p-3">
                    <p className="font-semibold text-sm text-slate-900">Ribeye Steak</p>
                    <p className="text-xs text-slate-600">Mit Kartoffeln & Sauce</p>
                    <p className="text-red-600 font-bold text-sm mt-2">CHF 45.90</p>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-3">
                    <p className="font-semibold text-sm text-slate-900">Fisch del Día</p>
                    <p className="text-xs text-slate-600">Saisonale Spezialität</p>
                    <p className="text-red-600 font-bold text-sm mt-2">CHF 38.50</p>
                  </div>
                </div>

                <div className="bg-red-600 text-white px-4 py-3 text-center text-sm font-semibold">
                  Zum Bestellen scannen
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="funktioniert" className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Wie es funktioniert</h2>
          <p className="text-center text-slate-600 mb-16 text-lg">In 3 einfachen Schritten zum digitalen Menü</p>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Menü hochladen</h3>
              <p className="text-slate-600 leading-relaxed">
                Gib dein Menü ein oder importiere es. Kategorien, Preise, Allergene—alles in einem Schritt. Mit KI-Support geht's noch schneller.
              </p>
            </div>

            <div>
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">QR-Codes drucken</h3>
              <p className="text-slate-600 leading-relaxed">
                QR-Codes für deine Tische generieren. Wir geben dir druckfertige Vorlagen. Einmal druckt, immer gültig.
              </p>
            </div>

            <div>
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Gäste scannen</h3>
              <p className="text-slate-600 leading-relaxed">
                Deine Gäste scannen, sehen das Menü. Das wars. Wenn du Ordering willst: Sie bestellen direkt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">Was QR Order anders macht</h2>

        <div className="grid grid-cols-2 gap-12">
          <div className="flex gap-4">
            <Menu className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dein Menü, deine Regeln</h3>
              <p className="text-slate-600">Du entscheidest, wie dein Menü aussieht. Farben, Kategorien, Beschreibungen—alles anpassbar. Keine Vorlagen, die nicht passen.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Smartphone className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Mehrsprachig von Tag eins</h3>
              <p className="text-slate-600">Deutsch, Englisch, Arabisch, Chinesisch—alle Sprachen gleichzeitig. Deine Gäste wechseln mit einem Tap.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <TrendingUp className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Wachsen, ohne Schmerzen</h3>
              <p className="text-slate-600">Start mit einem Basic-Plan. Wenn du wachsen willst, upgrade zu Pro oder Business. Keine unnötigen Features am Anfang.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Users className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Support von echten Menschen</h3>
              <p className="text-slate-600">Nicht von Bots. Echte Schweizer, die Restaurants verstehen. Du erreichst uns per Email, Chat oder Telefon.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Calendar className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Schnelle Updates</h3>
              <p className="text-slate-600">Tagesmenü? Update in 30 Sekunden. Gericht ausverkauft? Weg damit. Keine Druckkosten für neue Karten.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <MapPin className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Schweizer Standard</h3>
              <p className="text-slate-600">Deine Daten bleiben in der Schweiz. DSGVO-konform, CHF-Preise, Schweizer Support—alles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="restaurants" className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">Restaurants vertrauen QR Order</h2>

          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Royal</h3>
                <p className="text-slate-600 text-sm">Premium Fine Dining, Zürich</p>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed italic">
                "Unsere Gäste lieben die digitale Erfahrung. Wir sehen 3x mehr Bestellungen über QR Order. Das Menü sieht eleganter aus als auf Papier."
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Mehmed Özaer</p>
                  <p className="text-xs text-slate-600">Geschäftsführer</p>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">KULT Shisha Bar</h3>
                <p className="text-slate-600 text-sm">Modern Lounge, Basel</p>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed italic">
                "Der Setup war super einfach. Nach 30 Minuten waren wir live. Unsere Gäste bestellen jetzt direkt ihre Getränke—viel schneller Service."
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Info Team</p>
                  <p className="text-xs text-slate-600">KULT Bar</p>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Golden Club Lounge</h3>
                <p className="text-slate-600 text-sm">Elegante Lounge, Zürich</p>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed italic">
                "Das Design passt perfekt zu unserer Marke. Unsere Premium-Gäste fühlen sich wertgeschätzt. Großartig gelöst!"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Altin K.</p>
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
      <section id="preise" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Transparente Preise</h2>
        <p className="text-center text-slate-600 mb-16 text-lg">Wähle den Plan, der zu dir passt. Upgrade jederzeit.</p>

        <div className="grid grid-cols-4 gap-6">
          {/* Basic */}
          <div className="border border-slate-200 rounded-lg p-8 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic</h3>
            <p className="text-slate-600 text-sm mb-6">Zum Start</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900">CHF 49</span>
              <span className="text-slate-600 text-sm">/Monat</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
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
              className="w-full border-2 border-slate-300 text-slate-900 py-2 rounded-lg font-semibold hover:bg-slate-50 transition"
            >
              Starten
            </button>
          </div>

          {/* Pro - FEATURED */}
          <div className="border-2 border-red-600 rounded-lg p-8 bg-red-50 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">BELIEBT</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 mt-2">Pro</h3>
            <p className="text-slate-600 text-sm mb-6">Für wachsende Restaurants</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-red-600">CHF 99</span>
              <span className="text-slate-600 text-sm">/Monat</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
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
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Starten
            </button>
          </div>

          {/* Business */}
          <div className="border border-slate-200 rounded-lg p-8 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Business</h3>
            <p className="text-slate-600 text-sm mb-6">Analytics & Zahlung</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900">CHF 199</span>
              <span className="text-slate-600 text-sm">/Monat</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
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
              className="w-full border-2 border-slate-300 text-slate-900 py-2 rounded-lg font-semibold hover:bg-slate-50 transition"
            >
              Starten
            </button>
          </div>

          {/* Enterprise */}
          <div className="border border-slate-200 rounded-lg p-8 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
            <p className="text-slate-600 text-sm mb-6">Alles + Support</p>
            <div className="mb-6">
              <span className="text-2xl font-bold text-slate-900">Auf Anfrage</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
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
              className="w-full border-2 border-red-600 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
            >
              Kontaktieren
            </button>
          </div>
        </div>

        <p className="text-center text-slate-600 mt-12 text-sm">
          Alle Preise ohne MWST. 14 Tage kostenlos testen, keine Kreditkarte erforderlich. Jederzeit kündbar.
        </p>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Bereit für digitale Speisekarten?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Starte noch heute. 14 Tage kostenlos. Keine Kreditkarte nötig.
          </p>
          <button 
            onClick={openModal}
            className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition inline-flex items-center gap-2"
          >
            Kostenlos testen
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Produkt</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition">Features</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Preise</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Sicherheit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition">Blog</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Kontakt</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Über uns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition">Datenschutz</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Bedingungen</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-slate-900 transition">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex justify-between items-center">
            <p className="text-slate-600 text-sm">© 2024 QR Order. Alle Rechte vorbehalten.</p>
            <div className="flex items-center gap-4">
              <img 
                src="/logo-primary.png" 
                alt="QR Order Logo" 
                className="h-8 w-auto"
              />
              <p className="text-slate-600 text-sm">
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
          <div className="bg-white rounded-lg max-w-md w-full p-8 relative animate-in">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Vielen Dank!</h2>
                <p className="text-slate-600">Wir kontaktieren dich in Kürze.</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Kostenlos starten</h2>
                <p className="text-slate-600 mb-6">
                  Füllen Sie das Formular aus und wir kontaktieren Sie in Kürze.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      placeholder="Dein Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      placeholder="deine@email.ch"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Restaurant/Betrieb (Optional)
                    </label>
                    <input
                      type="text"
                      name="restaurant"
                      value={formData.restaurant}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      placeholder="Dein Restaurant"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Nachricht (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 h-20 resize-none"
                      placeholder="Wie können wir dir helfen?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
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