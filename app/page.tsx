'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChefHat,
  ChevronDown,
  Clock3,
  Globe2,
  LayoutDashboard,
  Menu as MenuIcon,
  PackageCheck,
  QrCode,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  UtensilsCrossed,
  Wifi,
  X,
  Zap,
} from 'lucide-react';

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

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

function RotatingSlogan() {
  const slogans = [
    'Einfach digital.',
    'Modern im Betrieb.',
    'Effizienz in Echtzeit.',
    'Gäste begeistern.',
    'Prozesse vereinfachen.',
    'Zukunft gestalten.',
    'Digital im Kern.',
    'Schneller servieren.',
    'Mehr Umsatz.',
    'Weniger Stress.',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slogans.length);
        setNextIndex((prev) => (prev + 1) % slogans.length);
        setAnimate(false);
      }, 500);
    }, 4500);
    return () => clearInterval(timer);
  }, [slogans.length]);

  return (
    <span className={cx('transition-all duration-500', animate ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0')}>
      {slogans[currentIndex]}
    </span>
  );
}

function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cx(
        'transition-all duration-1000 ease-[cubic-bezier(.16,1,.3,1)]',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function MinimalSplash({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLeaving(true), 700);
    const completeTimer = window.setTimeout(onComplete, 1200);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={cx(
        'fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#09090b] transition-all duration-500',
        leaving ? 'pointer-events-none scale-105 opacity-0' : 'scale-100 opacity-100'
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,.22),transparent_45%)]" />
      <div className="relative flex flex-col items-center">
        <div className="absolute h-40 w-40 animate-ping rounded-full border border-rose-500/20" />
        <div className="relative rounded-[2rem] border border-white/10 bg-white/95 p-5 shadow-[0_30px_100px_rgba(225,29,72,.32)]">
          <img src="/tabscan-logo.png" alt="TabScan" className="h-20 w-auto" />
        </div>
        <div className="mt-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-zinc-400">
          <ScanLine className="h-4 w-4 animate-pulse text-rose-500" />
          TabScan
        </div>
      </div>
    </div>
  );
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStarted(true);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const totalFrames = 55;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setDisplay(Math.round(value * Math.min(progress, 1)));
      if (frame >= totalFrames) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, [started, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString('de-CH')}
      {suffix}
    </span>
  );
}

function RestaurantDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: 'QR-Code gescannt', subtitle: 'Tisch 12', icon: QrCode },
    { title: 'Bestellung erhalten', subtitle: '2 Positionen', icon: ShoppingBag },
    { title: 'In der Küche', subtitle: 'Zubereitung läuft', icon: ChefHat },
    { title: 'Umsatz aktualisiert', subtitle: '+ CHF 48.50', icon: TrendingUp },
  ];

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveStep((current) => (current + 1) % steps.length),
      2200
    );
    return () => window.clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="relative mx-auto w-full max-w-[590px] animate-float">
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-rose-500/20 via-orange-400/5 to-transparent blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-[0_40px_100px_-30px_rgba(15,23,42,.35)] backdrop-blur-2xl">
        <div className="overflow-hidden rounded-[1.55rem] border border-slate-200/70 bg-[#f8fafc]">
          <div className="flex h-12 items-center justify-between border-b border-slate-200/70 bg-white/90 px-5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <Wifi className="h-3.5 w-3.5 text-emerald-500" /> Live Dashboard
            </div>
          </div>

          <div className="grid min-h-[430px] grid-cols-[68px_1fr]">
            <aside className="flex flex-col items-center gap-5 border-r border-slate-200/70 bg-slate-950 py-6 text-slate-500">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-rose-600 text-white">
                <ScanLine className="h-5 w-5" />
              </div>
              {[LayoutDashboard, ShoppingBag, ChefHat, BarChart3].map((Icon, index) => (
                <div
                  key={index}
                  className={cx(
                    'grid h-9 w-9 place-items-center rounded-xl transition-all duration-500',
                    index === activeStep ? 'bg-white/10 text-white' : ''
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
              ))}
            </aside>

            <div className="p-5 sm:p-7">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-rose-600">Sonntag, Live</p>
                  <h3 className="mt-1 text-xl font-bold text-slate-950">Guten Abend, Zürich</h3>
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-xs font-bold text-white">TS</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  ['Umsatz', "CHF 4'820", '+12.4%'],
                  ['Bestellungen', '154', '+8.1%'],
                  ['Aktive Tische', '23', 'Live'],
                ].map(([label, number, delta]) => (
                  <div key={label} className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-4">
                    <p className="truncate text-[9px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                    <p className="mt-2 text-base font-extrabold text-slate-950 sm:text-lg">{number}</p>
                    <p className="mt-1 text-[9px] font-bold text-emerald-600">{delta}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1.25fr_.75fr]">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">Umsatz heute</p>
                    <span className="text-[9px] font-semibold text-slate-400">08:00 – 23:00</span>
                  </div>
                  <div className="flex h-28 items-end gap-2">
                    {[28, 38, 31, 52, 46, 70, 60, 88, 66, 94, 82, 100].map((height, index) => (
                      <div key={index} className="group relative flex h-full flex-1 items-end">
                        <div
                          className={cx(
                            'w-full rounded-full transition-all duration-700',
                            index > 8 ? 'bg-gradient-to-t from-rose-700 to-rose-400' : 'bg-slate-200 group-hover:bg-rose-300'
                          )}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-950 p-4 text-white shadow-lg">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">Live Event</p>
                  <div className="mt-5 grid h-11 w-11 place-items-center rounded-2xl bg-rose-600 shadow-[0_8px_24px_rgba(225,29,72,.35)]">
                    {React.createElement(steps[activeStep].icon, { className: 'h-5 w-5' })}
                  </div>
                  <p className="mt-4 text-sm font-bold">{steps[activeStep].title}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{steps[activeStep].subtitle}</p>
                  <div className="mt-5 flex gap-1.5">
                    {steps.map((_, index) => (
                      <span
                        key={index}
                        className={cx(
                          'h-1 rounded-full transition-all duration-500',
                          index === activeStep ? 'w-6 bg-rose-500' : 'w-2 bg-slate-700'
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-7 -left-4 hidden items-center gap-3 rounded-2xl border border-white bg-white/90 p-3 pr-5 shadow-xl backdrop-blur-xl sm:flex">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-semibold text-slate-400">Bestellung #1842</p>
          <p className="text-xs font-bold text-slate-950">Erfolgreich übermittelt</p>
        </div>
      </div>
    </div>
  );
}

function FAQRow({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200/80">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-5 py-6 text-left"
      >
        <span className="text-base font-bold text-slate-950 transition-colors group-hover:text-rose-600 sm:text-lg">
          {item.question}
        </span>
        <span className={cx('grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all', open ? 'rotate-180 bg-rose-600 text-white' : 'bg-slate-100 text-slate-500')}>
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div className={cx('grid transition-all duration-500', open ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <p className="max-w-2xl pr-10 text-sm leading-7 text-slate-600 sm:text-base">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function TabScanLanding() {
  const [showSplash, setShowSplash] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', restaurant: '', message: '' });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal || mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal, mobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowModal(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const features = [
    { icon: QrCode, title: 'Digitales Menü', description: 'Menüs zentral pflegen, sofort aktualisieren und mehrsprachig bereitstellen.', accent: 'from-rose-500 to-orange-400' },
    { icon: ShoppingBag, title: 'Smart Ordering', description: 'Gäste bestellen direkt am Tisch. Schnell, intuitiv und ohne Wartezeit.', accent: 'from-violet-500 to-fuchsia-500' },
    { icon: ChefHat, title: 'Kitchen Display', description: 'Bestellungen erscheinen strukturiert und in Echtzeit direkt in der Küche.', accent: 'from-amber-400 to-orange-500' },
    { icon: PackageCheck, title: 'Lagerverwaltung', description: 'Bestände überwachen und Engpässe frühzeitig sichtbar machen.', accent: 'from-cyan-500 to-blue-500' },
    { icon: Wifi, title: 'Live Monitoring', description: 'Status, Auslastung und Bestellfluss jederzeit vollständig im Blick.', accent: 'from-emerald-400 to-teal-500' },
    { icon: BarChart3, title: 'Analytics & Insights', description: 'Umsatz, Bestseller und operative Trends in einem klaren Dashboard.', accent: 'from-rose-600 to-pink-500' },
  ];

  const journey = [
    { icon: ScanLine, number: '01', title: 'Scannen', text: 'Der Gast scannt den QR-Code direkt am Tisch.' },
    { icon: UtensilsCrossed, number: '02', title: 'Auswählen', text: 'Das digitale Menü öffnet sich in der bevorzugten Sprache.' },
    { icon: ShoppingBag, number: '03', title: 'Bestellen', text: 'Die Bestellung wird sicher und ohne Umwege übertragen.' },
    { icon: ChefHat, number: '04', title: 'Zubereiten', text: 'Die Küche erhält alle Informationen strukturiert in Echtzeit.' },
  ];

  const plans = [
    { name: 'Starter', subtitle: 'Der einfache Einstieg', price: 'Auf Anfrage', features: ['Digitales Menü', 'QR-Code Generator', 'Basis-Analytics', 'Persönliches Setup'] },
    { name: 'Professional', subtitle: 'Für wachsende Betriebe', price: 'Auf Anfrage', popular: true, features: ['Alle Starter-Funktionen', 'Smart Ordering', 'Kitchen Display', 'Erweiterte Analytics', 'Mehrere Standorte'] },
    { name: 'Enterprise', subtitle: 'Für Gruppen und Ketten', price: 'Individuell', features: ['Alle Professional-Funktionen', 'Individuelle Integrationen', 'API-Zugriff', 'White Label', 'Dedicated Support'] },
  ];

  const faqs: FAQItem[] = [
    { question: 'Was ist TabScan?', answer: 'TabScan ist eine modulare Plattform für digitale Gastronomieprozesse. Digitales Menü, Bestellungen, Kitchen Display, Monitoring und Analytics lassen sich passend zu deinem Betrieb kombinieren.' },
    { question: 'Wie schnell kann ich starten?', answer: 'Ein digitales Basismenü lässt sich sehr schnell konfigurieren. Der konkrete Umfang für zusätzliche Module und Integrationen wird gemeinsam anhand deiner Anforderungen festgelegt.' },
    { question: 'Ist TabScan DSGVO-konform?', answer: 'Datenschutz und Sicherheit sind zentrale Bestandteile der Plattform. Die konkrete Hosting-, Datenschutz- und Vertragskonfiguration wird transparent für dein gewähltes Paket dokumentiert.' },
    { question: 'Kann ich mehrere Standorte verwalten?', answer: 'Ja. TabScan ist für mehrere Standorte konzipiert und ermöglicht eine zentrale Sicht sowie standortspezifische Konfigurationen.' },
    { question: 'Wie funktioniert die Preisgestaltung?', answer: 'Die Preisgestaltung richtet sich nach den gewünschten Modulen, der Anzahl Standorte und dem Integrationsumfang. Du erhältst ein transparentes Angebot passend zu deinem Betrieb.' },
    { question: 'Können bestehende Systeme integriert werden?', answer: 'Mögliche Integrationen werden anhand deiner vorhandenen Hardware und Systemlandschaft geprüft und anschließend passend geplant.' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const validateForm = () => {
    const errors: Partial<FormData> = {};
    
    if (!formData.name.trim()) errors.name = 'Name erforderlich';
    if (!formData.email.trim()) {
      errors.email = 'E-Mail erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Gültige E-Mail erforderlich';
    }
    if (!formData.message.trim()) errors.message = 'Nachricht erforderlich';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({ ...current, [name]: '' }));
    setError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof data.error === 'string' ? data.error : 'Die Anfrage konnte nicht versendet werden.');

      setSubmitted(true);
      setFormData({ name: '', email: '', restaurant: '', message: '' });
      setTimeout(() => closeModal(), 2500);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Fehler beim Versenden. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
    setFormErrors({});
    setError('');
  };

  if (showSplash) return <MinimalSplash onComplete={() => setShowSplash(false)} />;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950 selection:bg-rose-200 selection:text-rose-950">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes float { 0%,100% { transform: translateY(0) rotate(.001deg); } 50% { transform: translateY(-12px) rotate(.001deg); } }
        @keyframes blob { 0%,100% { transform: translate3d(0,0,0) scale(1); } 33% { transform: translate3d(35px,-25px,0) scale(1.08); } 66% { transform: translate3d(-20px,20px,0) scale(.94); } }
        @keyframes shine { 0% { transform: translateX(-150%) skewX(-24deg); } 55%,100% { transform: translateX(250%) skewX(-24deg); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-blob { animation: blob 12s ease-in-out infinite; }
        .animate-shine { animation: shine 4.5s ease-in-out infinite; }
        .animate-marquee { animation: marquee 22s linear infinite; }
        .text-balance { text-wrap: balance; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <nav className={cx('fixed inset-x-0 top-0 z-50 transition-all duration-500', scrolled ? 'border-b border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-2xl' : 'bg-transparent')}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <button type="button" onClick={() => scrollTo('home')} className="flex items-center" aria-label="Zur Startseite">
            <img src="/tabscan-logo.png" alt="TabScan" className="h-14 w-auto object-contain transition-all hover:scale-105 sm:h-16" />
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {[['Produkt', 'features'], ['Ablauf', 'journey'], ['Vorteile', 'benefits'], ['Preise', 'pricing'], ['FAQ', 'faq']].map(([label, id]) => (
              <button key={id} type="button" onClick={() => scrollTo(id)} className="text-sm font-semibold text-slate-600 transition hover:text-rose-600">{label}</button>
            ))}
            <Link href="/blog" className="text-sm font-semibold text-slate-600 transition hover:text-rose-600">Blog</Link>
            <button type="button" onClick={() => setShowModal(true)} className="group relative overflow-hidden rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
              <span className="absolute inset-y-0 -left-10 w-8 bg-white/20 blur-md animate-shine" />
              <span className="relative flex items-center gap-2">Demo anfordern <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </button>
          </div>

          <button type="button" onClick={() => setMobileMenuOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white/80 transition-all hover:bg-slate-100 lg:hidden" aria-label="Menü öffnen">
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <div className={cx('fixed inset-0 z-[70] transition lg:hidden', mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0')}>
        <button type="button" aria-label="Menü schließen" onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
        <div className={cx('absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white p-6 shadow-2xl transition-transform duration-500', mobileMenuOpen ? 'translate-x-0' : 'translate-x-full')}>
          <div className="flex items-center justify-between">
            <img src="/tabscan-logo.png" alt="TabScan" className="h-14 w-auto" />
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 transition-all hover:bg-slate-200"><X className="h-5 w-5" /></button>
          </div>
          <div className="mt-10 space-y-2">
            {[['Produkt', 'features'], ['Ablauf', 'journey'], ['Vorteile', 'benefits'], ['Preise', 'pricing'], ['FAQ', 'faq']].map(([label, id], index) => (
              <button key={id} type="button" onClick={() => scrollTo(id)} className="flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left text-lg font-bold transition hover:bg-slate-50 hover:text-rose-600"><span>{label}</span><span className="text-xs text-slate-300">0{index + 1}</span></button>
            ))}
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left text-lg font-bold transition hover:bg-slate-50 hover:text-rose-600"><span>Blog</span><span className="text-xs text-slate-300">06</span></Link>
          </div>
          <button type="button" onClick={() => { setMobileMenuOpen(false); setShowModal(true); }} className="absolute bottom-7 left-6 right-6 flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-6 py-4 font-bold text-white shadow-lg shadow-rose-600/20 transition hover:-translate-y-1 hover:shadow-xl">Kostenlose Demo <ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>

      <main>
        <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:pt-28">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.22] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="pointer-events-none absolute -left-40 top-8 h-[500px] w-[500px] rounded-full bg-rose-300/25 blur-[100px] animate-blob" />
          <div className="pointer-events-none absolute -right-40 top-40 h-[580px] w-[580px] rounded-full bg-orange-200/30 blur-[110px] animate-blob" style={{ animationDelay: '-4s' }} />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
            <div className="max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-xs font-bold text-rose-700 shadow-sm backdrop-blur-xl">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-rose-600" /></span>
                Swiss Restaurant Technology
              </div>

       <h1 className="text-balance text-5xl font-black leading-[.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[5.25rem]">
  Dein Restaurant.
  <span className="mt-2 block bg-gradient-to-r from-rose-700 via-rose-500 to-orange-500 bg-clip-text text-transparent">
    <RotatingSlogan />
  </span>
</h1>
              <p className="mt-7 max-w-xl text-balance text-lg leading-8 text-slate-600 sm:text-xl">
                Vom QR-Menü bis zum Live-Dashboard: TabScan verbindet Gäste, Service und Küche in einer klaren Plattform.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => setShowModal(true)} className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-rose-600 px-7 py-4 text-sm font-bold text-white shadow-[0_18px_45px_-15px_rgba(225,29,72,.75)] transition duration-300 hover:-translate-y-1 hover:bg-rose-700">
                  <span className="absolute inset-y-0 -left-12 w-10 bg-white/25 blur-lg animate-shine" />
                  <Sparkles className="h-4 w-4" /> Kostenlose Demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button type="button" onClick={() => scrollTo('journey')} className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/60 px-7 py-4 text-sm font-bold text-slate-800 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-slate-950 hover:bg-white">So funktioniert es <ChevronDown className="h-4 w-4" /></button>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Keine Installation für Gäste</span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Sicher & skalierbar</span>
                <span className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-emerald-500" /> Mehrsprachig</span>
              </div>
            </div>

            <RestaurantDemo />
          </div>
        </section>

        <section className="border-y border-slate-200/70 bg-white py-6">
          <div className="overflow-hidden">
            <div className="animate-marquee flex w-max items-center">
              {[...Array(2)].flatMap((_, duplicate) => ['DIGITALES MENÜ', 'SMART ORDERING', 'KITCHEN DISPLAY', 'LIVE ANALYTICS', 'MULTI-LOCATION'].map((item) => (
                <React.Fragment key={`${duplicate}-${item}`}><span className="px-8 text-xs font-black tracking-[0.2em] text-slate-400 sm:px-12">{item}</span><Sparkles className="h-4 w-4 text-rose-500" /></React.Fragment>
              )))}
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-20 bg-slate-950 px-5 py-28 text-white sm:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-rose-500">Eine Plattform. Alle Prozesse.</p>
              <h2 className="mt-5 text-balance text-4xl font-black tracking-[-0.04em] sm:text-6xl">Technologie, die im Hintergrund arbeitet.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">TabScan reduziert Komplexität und macht jeden Schritt im Restaurantbetrieb sichtbar, schnell und steuerbar.</p>
            </Reveal>

            <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Reveal key={feature.title} delay={index * 80}>
                    <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-7 transition duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.075]">
                      <div className={cx('absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30', feature.accent)} />
                      <div className={cx('relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-xl', feature.accent)}><Icon className="h-6 w-6" /></div>
                      <div className="relative mt-9 flex items-start justify-between gap-4"><h3 className="text-xl font-extrabold">{feature.title}</h3><span className="text-xs font-bold text-slate-700">0{index + 1}</span></div>
                      <p className="relative mt-3 text-sm leading-7 text-slate-400">{feature.description}</p>
                      <div className="relative mt-7 flex items-center gap-2 text-xs font-bold text-slate-500 transition group-hover:text-white">Mehr entdecken <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="journey" className="scroll-mt-20 relative overflow-hidden px-5 py-28 sm:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(244,63,94,.08),transparent_36%)]" />
          <div className="relative mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-rose-600">Die Customer Journey</p>
              <h2 className="mt-5 text-balance text-4xl font-black tracking-[-0.04em] sm:text-6xl">Vom Scan bis zur Küche. Nahtlos.</h2>
            </Reveal>

            <div className="relative mt-20 grid gap-8 md:grid-cols-4 md:gap-4">
              <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent md:block" />
              {journey.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 130} className="relative text-center">
                    <div className="relative z-10 mx-auto grid h-20 w-20 place-items-center rounded-[1.7rem] border border-rose-100 bg-white text-rose-600 shadow-[0_20px_50px_-20px_rgba(225,29,72,.5)] transition duration-500 hover:-translate-y-2 hover:rotate-3 hover:bg-rose-600 hover:text-white"><Icon className="h-8 w-8" /></div>
                    <p className="mt-7 text-[10px] font-black tracking-[.25em] text-rose-500">SCHRITT {item.number}</p>
                    <h3 className="mt-2 text-xl font-extrabold">{item.title}</h3>
                    <p className="mx-auto mt-3 max-w-[240px] text-sm leading-6 text-slate-500">{item.text}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="benefits" className="scroll-mt-20 px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-700 via-rose-600 to-orange-500 text-white shadow-[0_40px_100px_-30px_rgba(225,29,72,.6)] lg:grid-cols-[.95fr_1.05fr]">
            <Reveal className="p-8 sm:p-14 lg:p-16">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold backdrop-blur"><Zap className="h-4 w-4" /> Mehr Tempo. Weniger Reibung.</span>
              <h2 className="mt-7 text-balance text-4xl font-black tracking-[-0.04em] sm:text-5xl">Ein besseres Erlebnis für Gäste und Teams.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-rose-50/90">Klare Abläufe, aktuelle Informationen und ein zentraler Überblick schaffen die Grundlage für einen modernen Restaurantbetrieb.</p>
              <button type="button" onClick={() => setShowModal(true)} className="mt-9 flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-rose-700 shadow-xl transition hover:-translate-y-1">Restaurant digitalisieren <ArrowRight className="h-4 w-4" /></button>
            </Reveal>

            <div className="grid grid-cols-2 gap-px bg-white/15">
              {[
                [Clock3, 'Schneller', 'Digitale Abläufe ohne unnötige Zwischenschritte'],
                [Store, 'Skalierbar', 'Vom Einzelbetrieb bis zur Restaurantgruppe'],
                [ShieldCheck, 'Verlässlich', 'Klare Prozesse und sichere Datenflüsse'],
                [BarChart3, 'Messbar', 'Relevante Kennzahlen jederzeit im Blick'],
              ].map(([Icon, title, text], index) => {
                const IconComponent = Icon as React.ComponentType<{ className?: string }>;
                return <div key={title as string} className="bg-slate-950/20 p-6 backdrop-blur-sm transition hover:bg-slate-950/30 sm:p-10"><IconComponent className="h-7 w-7" /><p className="mt-7 text-lg font-extrabold">{title as string}</p><p className="mt-2 text-xs leading-6 text-rose-50/75 sm:text-sm">{text as string}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 md:grid-cols-4">
            {[
              [500, '+', 'aktive Nutzer'],
              [99, '%', 'digitale Prozesse'],
              [24, '/7', 'Systemzugriff'],
              [4, '', 'zentrale Module'],
            ].map(([value, suffix, label], index) => (
              <Reveal key={label as string} delay={index * 100} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
                <p className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl"><AnimatedNumber value={value as number} suffix={suffix as string} /></p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400 sm:text-xs">{label as string}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="pricing" className="scroll-mt-20 bg-slate-50 px-5 py-28 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-rose-600">Flexible Pakete</p>
              <h2 className="mt-5 text-balance text-4xl font-black tracking-[-0.04em] sm:text-6xl">So individuell wie dein Restaurant.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">Du bezahlst für die Funktionen, die dein Betrieb wirklich braucht.</p>
            </Reveal>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <Reveal key={plan.name} delay={index * 100} className="h-full">
                  <div className={cx('relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-8 transition duration-500 hover:-translate-y-2', plan.popular ? 'border-rose-500 bg-slate-950 text-white shadow-[0_30px_80px_-30px_rgba(225,29,72,.55)]' : 'border-slate-200 bg-white shadow-sm hover:shadow-xl')}>
                    {plan.popular && <div className="absolute right-0 top-0 rounded-bl-2xl bg-rose-600 px-5 py-2 text-[10px] font-black uppercase tracking-[.16em] text-white">Empfohlen</div>}
                    <p className={cx('text-xs font-black uppercase tracking-[.2em]', plan.popular ? 'text-rose-500' : 'text-slate-400')}>{plan.subtitle}</p>
                    <h3 className="mt-4 text-3xl font-black">{plan.name}</h3>
                    <p className={cx('mt-7 text-2xl font-black', plan.popular ? 'text-white' : 'text-slate-950')}>{plan.price}</p>
                    <div className={cx('my-7 h-px', plan.popular ? 'bg-white/10' : 'bg-slate-200')} />
                    <ul className="flex-1 space-y-4">
                      {plan.features.map((feature) => <li key={feature} className={cx('flex items-start gap-3 text-sm', plan.popular ? 'text-slate-300' : 'text-slate-600')}><span className={cx('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full', plan.popular ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-600')}><Check className="h-3 w-3" /></span>{feature}</li>)}
                    </ul>
                    <button type="button" onClick={() => setShowModal(true)} className={cx('mt-9 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-extrabold transition hover:-translate-y-0.5', plan.popular ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-slate-950 text-white hover:bg-rose-600')}>Paket anfragen <ArrowRight className="h-4 w-4" /></button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 px-5 py-28 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-rose-600">FAQ</p>
              <h2 className="mt-5 text-balance text-4xl font-black tracking-[-0.04em] sm:text-5xl">Noch Fragen?</h2>
              <p className="mt-5 max-w-sm text-base leading-7 text-slate-600">Hier findest du Antworten auf die wichtigsten Fragen rund um TabScan.</p>
              <button type="button" onClick={() => setShowModal(true)} className="mt-8 flex items-center gap-2 text-sm font-extrabold text-rose-600 transition hover:gap-3">Persönlich besprechen <ArrowRight className="h-4 w-4" /></button>
            </Reveal>
            <Reveal delay={100} className="rounded-[2rem] border border-slate-200 bg-white px-6 shadow-sm sm:px-9">
              {faqs.map((item) => <FAQRow key={item.question} item={item} />)}
            </Reveal>
          </div>
        </section>

        <section className="px-5 pb-20 pt-8 sm:px-8">
          <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.7rem] bg-slate-950 px-7 py-16 text-center text-white sm:px-14 sm:py-24">
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-600/30 blur-[100px]" />
            <div className="relative">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-600 shadow-[0_15px_40px_rgba(225,29,72,.4)]"><Sparkles className="h-6 w-6" /></div>
              <h2 className="mx-auto mt-8 max-w-4xl text-balance text-4xl font-black tracking-[-0.045em] sm:text-6xl">Bereit für den nächsten Schritt?</h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">Entdecke, wie TabScan zu deinen Abläufen, deinem Team und deinem Restaurant passt.</p>
              <button type="button" onClick={() => setShowModal(true)} className="group mt-9 inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-8 py-4 text-sm font-extrabold text-white shadow-xl transition hover:-translate-y-1 hover:bg-rose-500">Kostenlose Demo anfordern <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <img src="/tabscan-logo.png" alt="TabScan" className="h-16 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">Die digitale Plattform für moderne Restaurantprozesse. Entwickelt mit Fokus auf Klarheit, Tempo und Skalierbarkeit.</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-[10px] font-black uppercase tracking-[.16em] text-slate-600">🇨🇭 Made in Switzerland</div>
          </div>
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-slate-400">Produkt</p><div className="mt-5 space-y-3 text-sm font-semibold text-slate-600"><button onClick={() => scrollTo('features')} className="block hover:text-rose-600">Features</button><button onClick={() => scrollTo('pricing')} className="block hover:text-rose-600">Preise</button><button onClick={() => scrollTo('faq')} className="block hover:text-rose-600">FAQ</button></div></div>
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-slate-400">Unternehmen</p><div className="mt-5 space-y-3 text-sm font-semibold text-slate-600"><Link href="/blog" className="block hover:text-rose-600">Blog</Link><button onClick={() => setShowModal(true)} className="block hover:text-rose-600">Kontakt</button><span className="block">Zürich, Schweiz</span></div></div>
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-slate-400">Rechtliches</p><div className="mt-5 space-y-3 text-sm font-semibold text-slate-600"><Link href="/datenschutz" className="block hover:text-rose-600">Datenschutz</Link><Link href="/impressum" className="block hover:text-rose-600">Impressum</Link><Link href="/agb" className="block hover:text-rose-600">AGB</Link></div></div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-slate-200 pt-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} TabScan. Alle Rechte vorbehalten.</p><p>Restaurant technology, beautifully simple.</p></div>
      </footer>

      {showModal && (
        <div className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Demo anfordern">
          <button type="button" aria-label="Dialog schließen" onClick={closeModal} className="absolute inset-0" />
          <div className="relative my-6 w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/30 bg-white shadow-[0_40px_120px_rgba(0,0,0,.4)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-700 via-rose-500 to-orange-400" />
            <button type="button" onClick={closeModal} className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-950 hover:text-white"><X className="h-4 w-4" /></button>

            {submitted ? (
              <div className="px-8 py-20 text-center sm:px-12">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 className="h-10 w-10" /></div>
                <h2 className="mt-7 text-3xl font-black tracking-tight">Vielen Dank!</h2>
                <p className="mt-3 leading-7 text-slate-600">Deine Anfrage wurde erfolgreich gesendet. Wir melden uns über die angegebene E-Mail-Adresse.</p>
                <button type="button" onClick={closeModal} className="mt-8 rounded-2xl bg-slate-950 px-7 py-3.5 text-sm font-bold text-white">Schließen</button>
              </div>
            ) : (
              <div className="p-7 sm:p-10">
                <div className="pr-12">
                  <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] text-rose-600"><Sparkles className="h-3.5 w-3.5" /> Kostenlose Demo</span>
                  <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950">Lass uns dein Restaurant digitalisieren.</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-500">Erzähl uns kurz, welche Lösung du suchst.</p>
                </div>

                {error && <div role="alert" className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div>}

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[10px] font-black uppercase tracking-[.14em] text-slate-500">Name *</span>
                      <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        required 
                        disabled={isLoading} 
                        autoComplete="name" 
                        placeholder="Dein Name" 
                        className={cx("w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-rose-100", formErrors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-rose-500')}
                      />
                      {formErrors.name && <p className="mt-1 text-xs text-rose-600">{formErrors.name}</p>}
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[10px] font-black uppercase tracking-[.14em] text-slate-500">Restaurant</span>
                      <input 
                        name="restaurant" 
                        value={formData.restaurant} 
                        onChange={handleInputChange} 
                        disabled={isLoading} 
                        autoComplete="organization" 
                        placeholder="Betriebsname" 
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-100" 
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-black uppercase tracking-[.14em] text-slate-500">E-Mail *</span>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                      disabled={isLoading} 
                      autoComplete="email" 
                      placeholder="name@restaurant.ch" 
                      className={cx("w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-rose-100", formErrors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-rose-500')}
                    />
                    {formErrors.email && <p className="mt-1 text-xs text-rose-600">{formErrors.email}</p>}
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-black uppercase tracking-[.14em] text-slate-500">Wobei dürfen wir helfen? *</span>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      required 
                      disabled={isLoading} 
                      placeholder="Zum Beispiel: digitales Menü, Bestellungen, Kitchen Display ..." 
                      className={cx("h-28 w-full resize-none rounded-xl border bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-rose-100", formErrors.message ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 focus:border-rose-500')}
                    />
                    {formErrors.message && <p className="mt-1 text-xs text-rose-600">{formErrors.message}</p>}
                  </label>
                  <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-rose-600/20 transition hover:-translate-y-0.5 hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Wird gesendet ...</> : <>Demo anfordern <ArrowRight className="h-4 w-4" /></>}</button>
                  <p className="text-center text-[10px] leading-5 text-slate-400">Mit dem Absenden stimmst du der Verarbeitung deiner Angaben zur Bearbeitung der Anfrage zu.</p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}