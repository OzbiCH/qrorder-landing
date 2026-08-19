'use client';

import React, { useState } from 'react';
import { ChevronRight, Check, Menu, Smartphone, TrendingUp, Users, Calendar, MapPin } from 'lucide-react';

export default function QROrderProfessional() {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white border-b border-slate-200 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-slate-900">QR Order</div>
          <div className="flex gap-8 items-center">
            <a href="#funktioniert" className="text-sm text-slate-600 hover:text-slate-900 font-medium">Wie es funktioniert</a>
            <a href="#preise" className="text-sm text-slate-600 hover:text-slate-900 font-medium">Preise</a>
            <a href="#restaurants" className="text-sm text-slate-600 hover:text-slate-900 font-medium">Restaurants</a>
            <button className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition">
              Kostenlos starten
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-red-600 text-sm font-bold uppercase tracking-wide mb-4">Digitale Speisekarte für Schweizer Restaurants</p>
            <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Dein Menü,<br />
              digital. Einfach.
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              QR Order ist die digitale Speisekarte, die sich deinem Restaurant anpasst. Nicht umgekehrt. Egal, ob du nur ein Menü brauchst oder vollständige Bestellfunktion—wir bauen, was du brauchst.
            </p>
            
            <div className="flex gap-4 mb-12">
              <button className="bg-red-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2">
                Jetzt starten
                <ChevronRight size={18} />
              </button>
              <button className="border-2 border-slate-300 text-slate-900 px-7 py-3 rounded-lg font-semibold hover:bg-slate-50 transition">
                Live Demo
              </button>
            </div>

            {/* Stats */}
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

          {/* Right - Simple Phone Mockup */}
          <div className="flex justify-center">
            <div className="bg-slate-100 rounded-3xl p-4 shadow-lg w-80 h-96 flex flex-col">
              {/* Phone Screen */}
              <div className="bg-white rounded-2xl flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-slate-900 text-white px-4 py-3">
                  <p className="text-sm font-semibold">Royal Restaurant</p>
                  <p className="text-xs text-slate-400">Heute geöffnet bis 23:00</p>
                </div>
                
                {/* Menu Items */}
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

                {/* Footer */}
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
            {/* Step 1 */}
            <div>
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Menü hochladen</h3>
              <p className="text-slate-600 leading-relaxed">
                Gib dein Menü ein oder importiere es. Kategorien, Preise, Allergene—alles in einem Schritt. Mit KI-Support geht's noch schneller.
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4">2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">QR-Codes drucken</h3>
              <p className="text-slate-600 leading-relaxed">
                QR-Codes für deine Tische generieren. Wir geben dir druckfertige Vorlagen. Einmal druckt, immer gültig.
              </p>
            </div>

            {/* Step 3 */}
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
          {/* Feature 1 */}
          <div className="flex gap-4">
            <Menu className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dein Menü, deine Regeln</h3>
              <p className="text-slate-600">Du entscheidest, wie dein Menü aussieht. Farben, Kategorien, Beschreibungen—alles anpassbar. Keine Vorlagen, die nicht passen.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-4">
            <Smartphone className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Mehrsprachig von Tag eins</h3>
              <p className="text-slate-600">Deutsch, Englisch, Arabisch, Chinesisch—alle Sprachen gleichzeitig. Deine Gäste wechseln mit einem Tap.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex gap-4">
            <TrendingUp className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Wachsen, ohne Schmerzen</h3>
              <p className="text-slate-600">Start mit einem Basic-Plan. Wenn du wachsen willst, upgrade zu Pro oder Business. Keine unnötigen Features am Anfang.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex gap-4">
            <Users className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Support von echten Menschen</h3>
              <p className="text-slate-600">Nicht von Bots. Echte Schweizer, die Restaurants verstehen. Du erreichst uns per Email, Chat oder Telefon.</p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="flex gap-4">
            <Calendar className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Schnelle Updates</h3>
              <p className="text-slate-600">Tagesmenü? Update in 30 Sekunden. Gericht ausverkauft? Weg damit. Keine Druckkosten für neue Karten.</p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="flex gap-4">
            <MapPin className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Schweizer Standard</h3>
              <p className="text-slate-600">Deine Daten bleiben in der Schweiz. DSGVO-konform, CHF-Preise, Schweizer Support—alles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Restaurants */}
      <section id="restaurants" className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">Restaurants vertrauen QR Order</h2>

          <div className="grid grid-cols-3 gap-8">
            {/* Royal */}
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Royal</h3>
                <p className="text-slate-600 text-sm">Premium Fine Dining, Zürich</p>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                "Unsere Gäste lieben die digitale Erfahrung. Wir sehen 3x mehr Bestellungen über QR Order im Vergleich zu früher. Das Menü sieht eleganter aus als auf Papier."
              </p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Mehmed Özaer</p>
                  <p className="text-xs text-slate-600">Geschäftsführer</p>
                </div>
                <div className="flex gap-0.5 ml-auto">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 flex gap-4 text-xs">
                <div>
                  <p className="text-slate-600">Plan</p>
                  <p className="font-bold text-slate-900">Business</p>
                </div>
                <div>
                  <p className="text-slate-600">Tische</p>
                  <p className="font-bold text-slate-900">35+</p>
                </div>
              </div>
            </div>

            {/* KULT */}
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">KULT Shisha Bar</h3>
                <p className="text-slate-600 text-sm">Modern Lounge, Basel</p>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                "Der Setup war super einfach. Nach 30 Minuten waren wir live. Unsere Gäste bestellen jetzt direkt ihre Getränke übers Handy—viel schneller Service."
              </p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Info Team</p>
                  <p className="text-xs text-slate-600">KULT Bar</p>
                </div>
                <div className="flex gap-0.5 ml-auto">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 flex gap-4 text-xs">
                <div>
                  <p className="text-slate-600">Plan</p>
                  <p className="font-bold text-slate-900">Basic</p>
                </div>
                <div>
                  <p className="text-slate-600">Tische</p>
                  <p className="font-bold text-slate-900">12</p>
                </div>
              </div>
            </div>

            {/* Golden Club */}
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Golden Club Lounge</h3>
                <p className="text-slate-600 text-sm">Elegante Lounge, Zürich</p>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                "Das Design passt perfekt zu unserer Marke. Unsere Premium-Gäste fühlen sich wertgeschätzt, wenn sie die elegante digitale Karte sehen. Großartig gelöst."
              </p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Altin K.</p>
                  <p className="text-xs text-slate-600">Management</p>
                </div>
                <div className="flex gap-0.5 ml-auto">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 flex gap-4 text-xs">
                <div>
                  <p className="text-slate-600">Plan</p>
                  <p className="font-bold text-slate-900">Basic</p>
                </div>
                <div>
                  <p className="text-slate-600">Tische</p>
                  <p className="font-bold text-slate-900">20+</p>
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
          <div 
            className="border border-slate-200 rounded-lg p-8 hover:border-slate-300 transition"
            onMouseEnter={() => setHoveredPlan('basic')}
            onMouseLeave={() => setHoveredPlan(null)}
          >
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

            <button className="w-full border-2 border-slate-300 text-slate-900 py-2 rounded-lg font-semibold hover:bg-slate-50 transition">
              Starten
            </button>
          </div>

          {/* Pro - Featured */}
          <div 
            className="border-2 border-red-600 rounded-lg p-8 bg-slate-50 relative"
            onMouseEnter={() => setHoveredPlan('pro')}
            onMouseLeave={() => setHoveredPlan(null)}
          >
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
              <li className="flex items-center gap-2 text-slate-700">
                <Check size={16} className="text-red-600" />
                Priorität Support
              </li>
            </ul>

            <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition">
              Starten
            </button>
          </div>

          {/* Business */}
          <div 
            className="border border-slate-200 rounded-lg p-8 hover:border-slate-300 transition"
            onMouseEnter={() => setHoveredPlan('business')}
            onMouseLeave={() => setHoveredPlan(null)}
          >
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

            <button className="w-full border-2 border-slate-300 text-slate-900 py-2 rounded-lg font-semibold hover:bg-slate-50 transition">
              Starten
            </button>
          </div>

          {/* Enterprise */}
          <div 
            className="border border-slate-200 rounded-lg p-8 hover:border-slate-300 transition"
            onMouseEnter={() => setHoveredPlan('enterprise')}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
            <p className="text-slate-600 text-sm mb-6">Individuelle Lösung</p>
            
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

            <button className="w-full border-2 border-red-600 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-50 transition">
              Kontaktieren
            </button>
          </div>
        </div>

        <p className="text-center text-slate-600 mt-12 text-sm">
          Alle Preise ohne MWST. 14 Tage kostenlos testen, keine Kreditkarte erforderlich. Jederzeit kündbar.
        </p>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Bereit für digitale Speisekarten?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Starte noch heute. 14 Tage kostenlos. Keine Kreditkarte nötig.
          </p>
          <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition inline-flex items-center gap-2">
            Kostenlos testen
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Häufige Fragen</h2>

        <div className="space-y-6">
          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Wie schnell kann ich starten?</h3>
            <p className="text-slate-600">Du brauchst etwa 5-10 Minuten, um dein Menü hochzuladen. Dann generierst du die QR-Codes und druckst sie. Nach 20 Minuten bist du live.</p>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Kann ich mein Menü später ändern?</h3>
            <p className="text-slate-600">Ja, jederzeit. Die QR-Codes bleiben gültig. Wenn du Preise änderst oder ein Gericht entfernst, sehen deine Gäste sofort die neuen Infos.</p>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Brauche ich eine App zu installieren?</h3>
            <p className="text-slate-600">Nein. Deine Gäste scannen den QR-Code, und die Speisekarte öffnet sich direkt im Browser. Kein Download nötig.</p>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Kostet ein Upgrade sofort mehr?</h3>
            <p className="text-slate-600">Nein. Du entscheidest, wann du upgraden möchtest. Basic reicht für viele Restaurants völlig aus.</p>
          </div>

          <div className="border border-slate-200 rounded-lg p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Wie ist es mit Datenschutz?</h3>
            <p className="text-slate-600">Deine Daten bleiben in der Schweiz. DSGVO-konform. Wir geben nichts an Dritte weiter.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Produkt</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Features</a></li>
                <li><a href="#" className="hover:text-slate-900">Preise</a></li>
                <li><a href="#" className="hover:text-slate-900">Sicherheit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Blog</a></li>
                <li><a href="#" className="hover:text-slate-900">Kontakt</a></li>
                <li><a href="#" className="hover:text-slate-900">Über uns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Datenschutz</a></li>
                <li><a href="#" className="hover:text-slate-900">Bedingungen</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Help Center</a></li>
                <li><a href="#" className="hover:text-slate-900">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex justify-between items-center">
            <p className="text-slate-600 text-sm">© 2024 QR Order. Alle Rechte vorbehalten.</p>
            <p className="text-slate-600 text-sm">
              Ein Produkt von{' '}
              <a href="https://ozbi.ch" className="text-red-600 font-semibold hover:underline">
                Ozbi Gruppe
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}