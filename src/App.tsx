import React, { useState, useEffect, useRef } from 'react';
import {
  Phone, Mail, MapPin, Share2,
  ChevronDown, Menu, X, Star, Award, Users, Clock,
  Sparkles, Zap, Heart, Shield, ArrowRight, CheckCircle
} from 'lucide-react';

// ─── DATA ───────────────────────────────────────────────────────────────────

const treatments = [
  {
    id: 'face',
    icon: '✨',
    title: 'Face Treatments',
    items: ['Chemical Peels', 'Derma Roll/Pen', 'Melasma', 'Hyper Pigmentation',
      'Acne/Pimple Scars', 'Medifacials', 'IPL (Photofacial)', 'Hydrafacial',
      'Microblading', 'Mole Treatment', 'Skin Tag Treatment', 'HIFU'],
  },
  {
    id: 'laser',
    icon: '⚡',
    title: 'Laser Treatments',
    items: ['Laser Hair Reduction', 'Photofacial', 'Anti Aging Laser', 'MNRF',
      'Q-Switch Laser', 'Pigmentation Laser', 'Tattoo Removal', 'Fractional CO2'],
  },
  {
    id: 'hair',
    icon: '💆',
    title: 'Hair Growth',
    items: ['PRP', 'Exosomes', 'Hair Drips', 'Mesotherapy',
      'Laser Helmet Therapy', 'GFC', 'QR678'],
  },
  {
    id: 'injectable',
    icon: '💉',
    title: 'Cosmetic Injectables',
    items: ['Dermal Fillers', 'Botox', 'Threads', 'Brow Lift',
      'Mesotherapy', 'Skin Boosters', 'Wrinkles', 'Face Lift',
      'Lip Beautification', 'Face Slimming', 'Double Chin'],
  },
  {
    id: 'body',
    icon: '🌿',
    title: 'Body Treatments',
    items: ['Body Polishing', 'Chemical Peels', 'Stretch Marks',
      'HIFU', 'Skin Lightening', 'Body Contouring'],
  },
  {
    id: 'iv',
    icon: '💧',
    title: 'IV Nutrition',
    items: ['IV Glutathione Therapy', 'IV Weight Loss Therapy', 'IV Nutrition Therapy'],
  },
];

const conditions = [
  { name: 'Acne/Pimples', icon: '🔴' },
  { name: 'Hyper Pigmentation', icon: '🟤' },
  { name: 'Melasma', icon: '🌙' },
  { name: 'Wrinkles', icon: '〰️' },
  { name: 'Ageing', icon: '⏳' },
  { name: 'Aesthetic Enhancement', icon: '💎' },
  { name: 'Dermatological', icon: '🩺' },
  { name: 'Hair Fall/Loss', icon: '💇' },
  { name: 'Excessive Hair Growth', icon: '✂️' },
];

const stats = [
  { value: '1000+', label: 'Happy Patients', icon: Heart },
  { value: '50+', label: 'Services', icon: Sparkles },
  { value: '5+', label: 'Team Members', icon: Users },
  { value: '11+', label: 'Years Experience', icon: Award },
];

const whyChooseUs = [
  {
    icon: Zap,
    title: 'In-depth Expertise',
    desc: 'Get expert skincare advice and treatments from leading dermatologists. We offer insights and solutions that bring out the best in your skin.',
  },
  {
    icon: Heart,
    title: 'Personal Touch',
    desc: 'Every skin is unique, and so is our care. We provide empathetic, personalized skincare tailored to meet your individual needs.',
  },
  {
    icon: Shield,
    title: 'Innovative Techniques',
    desc: 'Experience the future of skincare with our cutting-edge techniques and state-of-the-art technology.',
  },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop',
];

const testimonials = [
  {
    name: 'Priya S.',
    rating: 5,
    text: 'Dr. Navodita is absolutely amazing! My skin has transformed completely after the chemical peel sessions. Highly recommend!',
    treatment: 'Chemical Peel',
  },
  {
    name: 'Rahul M.',
    rating: 5,
    text: 'Best dermatologist in Bhopal! The laser hair reduction treatment was painless and very effective.',
    treatment: 'Laser Hair Reduction',
  },
  {
    name: 'Sneha K.',
    rating: 5,
    text: 'The PRP treatment for hair loss gave me visible results within 3 months. The clinic is very hygienic and professional.',
    treatment: 'PRP Hair Treatment',
  },
  {
    name: 'Amit T.',
    rating: 5,
    text: 'Got Botox done here and the results look so natural. Dr. Navodita has an excellent eye for aesthetics.',
    treatment: 'Botox',
  },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const NavDropdown: React.FC<{ title: string; items: string[] | { name: string; submenu?: string[] }[] }> = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="flex items-center gap-1 text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 py-2"
        onClick={() => setOpen(!open)}
      >
        {title} <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 min-w-[200px] max-h-[70vh] overflow-y-auto">
          {items.map((item, i) => (
            <a
              key={i}
              href="#"
              className="block px-4 py-2 text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-700 transition-colors"
            >
              {typeof item === 'string' ? item : item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const TreatmentDropdownItems = treatments.map(t => ({ name: t.title }));
const ConditionItems = conditions.map(c => c.name);

// ─── NAVBAR ─────────────────────────────────────────────────────────────────

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-3'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-teal-700 leading-tight text-sm md:text-base">theskinnovo</div>
            <div className="font-bold text-gray-800 leading-tight text-sm md:text-base">Dr. Navodita Gupta</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="#home" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Home</a>
          <a href="#about" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">About Us</a>
          <NavDropdown title="Treatments" items={TreatmentDropdownItems} />
          <NavDropdown title="Conditions" items={ConditionItems} />
          <a href="#contact" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Contact Us</a>
          <a href="#appointment" className="btn-primary text-sm">Book Appointment</a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {['Home', 'About Us', 'Contact Us'].map(item => (
              <a key={item} href="#" className="text-gray-700 font-medium py-2 border-b border-gray-100" onClick={() => setMobileOpen(false)}>{item}</a>
            ))}
            <div className="py-2 border-b border-gray-100">
              <div className="font-semibold text-gray-700 mb-2">Treatments</div>
              {treatments.map(t => (
                <a key={t.id} href="#" className="block pl-4 py-1.5 text-sm text-gray-600 hover:text-teal-600">{t.title}</a>
              ))}
            </div>
            <div className="py-2 border-b border-gray-100">
              <div className="font-semibold text-gray-700 mb-2">Conditions</div>
              {conditions.map(c => (
                <a key={c.name} href="#" className="block pl-4 py-1.5 text-sm text-gray-600 hover:text-teal-600">{c.name}</a>
              ))}
            </div>
            <a href="#appointment" className="btn-primary text-center mt-2" onClick={() => setMobileOpen(false)}>Book Appointment</a>
          </div>
        </div>
      )}
    </nav>
  );
};

// ─── HERO ────────────────────────────────────────────────────────────────────

const Hero: React.FC = () => (
  <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-teal-50 via-white to-teal-50 pt-20">
    {/* Decorative circles */}
    <div className="absolute top-20 right-10 w-64 h-64 bg-teal-100 rounded-full opacity-40 blur-3xl" />
    <div className="absolute bottom-20 left-10 w-80 h-80 bg-teal-200 rounded-full opacity-30 blur-3xl" />

    <div className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="z-10">
          <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <Sparkles size={14} /> Best Dermatologist in Bhopal
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Innovative Treatments,{' '}
            <span className="text-teal-600">Beautiful Results</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-4 font-light italic">
            Experience the theskinnovo Difference
          </p>
          <p className="text-gray-600 mb-8 max-w-lg leading-relaxed">
            At theskinnovo | Dr. Navodita Gupta, we combine cutting-edge dermatology with personalized care to reveal your skin's true potential. Celebrating 11+ years of excellence in Bhopal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#appointment" className="btn-primary inline-flex items-center justify-center gap-2">
              Book an Appointment <ArrowRight size={18} />
            </a>
            <a href="#services" className="btn-outline inline-flex items-center justify-center gap-2">
              Our Treatments <ChevronDown size={18} />
            </a>
          </div>
          {/* Quick trust badges */}
          <div className="mt-10 flex flex-wrap gap-6">
            {[{ label: '1000+', sub: 'Happy Patients' }, { label: '11+', sub: 'Years Exp.' }, { label: '50+', sub: 'Services' }].map(b => (
              <div key={b.label} className="text-center">
                <div className="text-2xl font-bold text-teal-700">{b.label}</div>
                <div className="text-xs text-gray-500">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Image */}
        <div className="relative z-10">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=700&fit=crop"
              alt="Divine Skin Clinic"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
          </div>
          {/* Floating card */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <Award className="text-teal-600" size={24} />
            </div>
            <div>
              <div className="font-bold text-gray-800">Certified Expert</div>
              <div className="text-xs text-gray-500">Dermatologist & Cosmetologist</div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-teal-600 text-white rounded-2xl shadow-xl p-4">
            <div className="text-2xl font-bold">11+</div>
            <div className="text-xs opacity-90">Years of<br/>Excellence</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── ABOUT ───────────────────────────────────────────────────────────────────

const About: React.FC = () => (
  <section id="about" className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=650&fit=crop"
            alt="About Divine Skin Clinic"
            className="rounded-3xl shadow-xl w-full h-[500px] object-cover"
          />
          <div className="absolute -bottom-6 -right-6 bg-teal-600 text-white rounded-2xl p-5 shadow-xl">
            <div className="text-3xl font-bold">11+</div>
            <div className="text-sm opacity-90">Years of Skin<br/>Care Excellence</div>
          </div>
        </div>
        <div>
          <span className="section-badge">About Us</span>
          <h2 className="section-title mb-4">
            Best Dermatologist in Bhopal:<br />
            <span className="text-teal-600">theskinnovo | Dr. Navodita Gupta</span>
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Experience unmatched skincare expertise at theskinnovo | Dr. Navodita Gupta in Bhopal. Our spacious clinic is equipped with the latest LASER and aesthetic technology. Our skilled dermatologist offers personalized, safe, and effective treatments that rejuvenate and highlight your natural beauty.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {whyChooseUs.map(w => (
              <div key={w.title} className="bg-teal-50 rounded-xl p-4">
                <w.icon className="text-teal-600 mb-2" size={24} />
                <div className="font-semibold text-gray-800 text-sm mb-1">{w.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{w.desc}</div>
              </div>
            ))}
          </div>
          <a href="#appointment" className="btn-primary inline-flex items-center gap-2">
            Book a Consultation <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

// ─── SERVICES ────────────────────────────────────────────────────────────────

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState('face');

  const active = treatments.find(t => t.id === activeTab) || treatments[0];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="section-badge">Treatments & Conditions</span>
          <h2 className="section-title">Discover Our Services</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            We offer a comprehensive range of dermatology and aesthetic treatments tailored to your unique skin needs.
          </p>
        </div>

        {/* Treatment Cards */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
            <Sparkles className="text-teal-600" size={20} /> Our Treatments
          </h3>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {treatments.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === t.id
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-teal-50 border border-gray-200'
                }`}
              >
                {t.icon} {t.title}
              </button>
            ))}
          </div>

          {/* Active treatment items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h4 className="text-xl font-bold text-teal-700 mb-6">{active.icon} {active.title}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {active.items.map(item => (
                <a
                  key={item}
                  href="#appointment"
                  className="flex items-center gap-2 p-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-sm font-medium transition-colors group"
                >
                  <CheckCircle size={14} className="text-teal-500 flex-shrink-0" />
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Conditions We Treat */}
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
            <Shield className="text-teal-600" size={20} /> Conditions We Treat
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {conditions.map(c => (
              <a
                key={c.name}
                href="#appointment"
                className="bg-white border border-gray-100 hover:border-teal-300 hover:shadow-md rounded-2xl p-4 text-center transition-all duration-200 group"
              >
                <div className="text-3xl mb-2">{c.icon}</div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-teal-600">{c.name}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── STATS ───────────────────────────────────────────────────────────────────

const Stats: React.FC = () => (
  <section className="py-16 bg-teal-600">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(s => (
          <div key={s.label} className="text-center text-white">
            <s.icon size={40} className="mx-auto mb-3 opacity-80" />
            <div className="text-4xl font-bold mb-1">{s.value}</div>
            <div className="text-teal-100 font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── SPECIALIST ──────────────────────────────────────────────────────────────

const Specialist: React.FC = () => (
  <section id="specialist" className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="section-badge">Our Specialist</span>
        <h2 className="section-title">Meet Your Skin Expert</h2>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-teal-50 to-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=600&fit=crop"
                alt="Dr. Navodita Gupta"
                className="w-full h-full min-h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-900/80 to-transparent p-6">
                <div className="text-white font-bold text-xl">Dr. Navodita Gupta</div>
                <div className="text-teal-200 text-sm">Dermatologist, Cosmetologist & Trichologist</div>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Dr. Navodita Gupta</h3>
              <p className="text-teal-600 font-semibold mb-4">Dermatologist, Cosmetologist & Trichologist</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                With over 11 years of expertise in dermatology and aesthetics, Dr. Navodita Gupta has shaped theskinnovo into a haven of top-tier care and innovation. Her deep understanding of skin science combined with an artistic eye for aesthetics ensures every patient gets truly personalized care.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {['MBBS, MD (Dermatology)', 'Cosmetology Specialist', 'Trichology Expert', '1000+ Patients Treated'].map(c => (
                  <div key={c} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-teal-600 flex-shrink-0" />
                    {c}
                  </div>
                ))}
              </div>
              <a href="#appointment" className="btn-primary inline-flex items-center gap-2 w-fit">
                Book Consultation <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── GALLERY ─────────────────────────────────────────────────────────────────

const Gallery: React.FC = () => (
  <section id="gallery" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="section-badge">Our Gallery</span>
        <h2 className="section-title">Explore Us</h2>
        <p className="text-gray-500 mt-3">A glimpse of our state-of-the-art facility and treatments</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((img, i) => (
          <div key={i} className="relative group overflow-hidden rounded-2xl shadow-md aspect-square">
            <img
              src={img}
              alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-teal-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-semibold">Skin Treatment</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

const Testimonials: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="section-badge">Testimonials</span>
        <h2 className="section-title">What Our Clients Say</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-6 shadow-sm border border-teal-100 hover:shadow-md transition-shadow">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, s) => (
                <Star key={s} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
            <div className="border-t border-teal-100 pt-3">
              <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
              <div className="text-teal-600 text-xs">{t.treatment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── APPOINTMENT ──────────────────────────────────────────────────────────────

const Appointment: React.FC = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/send-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', phone: '', email: '', service: '', message: '' });
      } else {
        setError(data.message || 'Failed to send appointment request. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="appointment" className="py-20 bg-gradient-to-br from-teal-700 to-teal-900">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="inline-block bg-white/20 text-white rounded-full px-4 py-1 text-sm font-semibold mb-4">Book an Appointment</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your<br/>Skin Transformation?</h2>
            <p className="text-teal-100 leading-relaxed mb-8">
              Take the first step towards radiant skin. Our expert team is ready to provide personalized treatment plans just for you.
            </p>
            <div className="space-y-4">
              {[
                { icon: Phone, label: '+91 70171 27471' },
                { icon: Mail, label: 'info@theskinnovo.com' },
                { icon: MapPin, label: 'Bhopal, Madhya Pradesh, India' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-teal-100">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={60} className="text-teal-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Appointment Requested!</h3>
                <p className="text-gray-500">We'll contact you shortly to confirm your appointment.</p>
                <button onClick={() => setSubmitted(false)} className="btn-primary mt-6">Book Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Book an Appointment</h3>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                {[
                  { key: 'name', placeholder: 'Your Full Name', type: 'text' },
                  { key: 'phone', placeholder: 'Phone Number', type: 'tel' },
                  { key: 'email', placeholder: 'Email Address', type: 'email' },
                ].map(f => (
                  <input
                    key={f.key}
                    type={f.type}
                    placeholder={f.placeholder}
                    required={f.key !== 'email'}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    disabled={loading}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                ))}
                <select
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  disabled={loading}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Treatment</option>
                  {treatments.map(t => (
                    <option key={t.id} value={t.title}>{t.title}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Any specific concerns or message..."
                  rows={3}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  disabled={loading}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    'Request Appointment'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ──────────────────────────────────────────────────────────────────

const Footer: React.FC = () => (
  <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-teal-400 text-sm">theskinnovo</div>
              <div className="font-bold text-white text-sm">Dr. Navodita Gupta</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Bhopal's premier dermatology and aesthetics clinic, dedicated to transforming your skin with science-backed treatments.
          </p>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/drishitasdivineskinclinic/" target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/drishitadivineskinclinic/" target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {['Home', 'About Us', 'Our Treatments', 'Conditions', 'Contact Us'].map(link => (
              <li key={link}>
                <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors flex items-center gap-1">
                  <ArrowRight size={12} /> {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Treatments */}
        <div>
          <h4 className="font-bold text-white mb-4">Our Treatments</h4>
          <ul className="space-y-2">
            {treatments.map(t => (
              <li key={t.id}>
                <a href="#services" className="text-gray-400 hover:text-teal-400 text-sm transition-colors flex items-center gap-1">
                  <ArrowRight size={12} /> {t.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white mb-4">Contact Us</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-400 text-sm">theskinnovo | Dr. Navodita Gupta, Bhopal, Madhya Pradesh, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-teal-400 flex-shrink-0" />
              <a href="tel:+917017127471" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">+91 70171 27471</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-teal-400 flex-shrink-0" />
              <span className="text-gray-400 text-sm">info@divineskinclinicagra.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-teal-400 flex-shrink-0" />
              <div className="text-gray-400 text-sm">
                <div>Mon - Sat: 10 AM - 7 PM</div>
                <div>Sunday: By Appointment</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 text-center">
        <p className="text-gray-500 text-sm">
          © 2024 theskinnovo | Dr. Navodita Gupta. All rights reserved. | Designed with ❤️ for beautiful skin.
        </p>
      </div>
    </div>
  </footer>
);

// ─── MOBILE STICKY BAR ────────────────────────────────────────────────────────

const MobileSticky: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-2xl">
    <div className="grid grid-cols-3">
      <a href="#home" className="flex flex-col items-center gap-1 py-3 text-gray-600 hover:text-teal-600 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-[10px] font-medium">Home</span>
      </a>
      <a href="tel:+917017127471" className="flex flex-col items-center gap-1 py-3 bg-teal-600 text-white">
        <Phone size={20} />
        <span className="text-[10px] font-medium">Call Now</span>
      </a>
      <a href="#appointment" className="flex flex-col items-center gap-1 py-3 bg-gray-800 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="text-[10px] font-medium">Book Appt.</span>
      </a>
    </div>
  </div>
);

// ─── APP ─────────────────────────────────────────────────────────────────────

const App: React.FC = () => (
  <div className="font-sans">
    <Navbar />
    <Hero />
    <About />
    <Services />
    <Stats />
    <Specialist />
    <Gallery />
    <Testimonials />
    <Appointment />
    <Footer />
    <MobileSticky />
  </div>
);

export default App;
