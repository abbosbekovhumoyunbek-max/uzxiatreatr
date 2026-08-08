import React, { useState, useEffect } from 'react';
import { navLinks } from '../../data/navigationData';
import { Menu, X, Cpu, Sparkles, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ activeSection, setActiveSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, id) => {
    if (setActiveSection) {
      setActiveSection(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        {/* Brand Logo */}
        <a href="#home" className="brand-logo" onClick={() => handleNavClick('#home', 'home')}>
          <div className="logo-icon-wrapper">
            <Cpu className="logo-icon" />
          </div>
          <div className="logo-text">
            <span className="logo-title">UZXIAtreatr</span>
            <span className="logo-subtitle">AI ACADEMY</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Asosiy navigatsiya">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(link.href, link.id)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA Button */}
        <div className="header-actions">
          <a
            href="#interactive"
            className="btn btn-primary btn-header-cta"
            onClick={() => handleNavClick('#interactive', 'interactive')}
          >
            <Sparkles size={16} />
            <span>Viktorina</span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-drawer-inner">
          <nav aria-label="Mobil navigatsiya">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(link.href, link.id)}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={18} className="mobile-nav-arrow" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mobile-drawer-footer">
            <a
              href="#interactive"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => handleNavClick('#interactive', 'interactive')}
            >
              <Sparkles size={18} />
              <span>Interaktiv Viktorinani Boshlash</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
