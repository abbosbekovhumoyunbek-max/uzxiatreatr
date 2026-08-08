import React from 'react';
import { footerData } from '../../data/navigationData';
import { Cpu, Send, Youtube, Instagram, Github, MapPin, Mail, Phone, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer({ setActiveSection }) {
  const renderSocialIcon = (name) => {
    switch (name) {
      case 'Send': return <Send size={18} />;
      case 'Youtube': return <Youtube size={18} />;
      case 'Instagram': return <Instagram size={18} />;
      case 'Github': return <Github size={18} />;
      default: return <Send size={18} />;
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <a href="#home" className="brand-logo footer-logo" onClick={() => setActiveSection && setActiveSection('home')}>
              <div className="logo-icon-wrapper">
                <Cpu className="logo-icon" />
              </div>
              <div className="logo-text">
                <span className="logo-title">{footerData.brand}</span>
                <span className="logo-subtitle">AI ACADEMY</span>
              </div>
            </a>
            <p className="footer-tagline">{footerData.tagline}</p>
            <p className="footer-desc">{footerData.description}</p>
            
            {/* Contact Placeholders */}
            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin size={16} className="contact-icon" />
                <span>{footerData.contact.address}</span>
              </div>
              <div className="contact-item">
                <Mail size={16} className="contact-icon" />
                <a href={`mailto:${footerData.contact.email}`}>{footerData.contact.email}</a>
              </div>
              <div className="contact-item">
                <Phone size={16} className="contact-icon" />
                <a href={`tel:${footerData.contact.phone}`}>{footerData.contact.phone}</a>
              </div>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {footerData.sections.map((section, idx) => (
            <div key={idx} className="footer-links-col">
              <h3 className="footer-col-title">{section.title}</h3>
              <ul className="footer-links-list">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      onClick={() => {
                        const targetId = link.href.replace('#', '');
                        if (setActiveSection) setActiveSection(targetId);
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} UZXIAtreatr. Barcha huquqlar himoyalangan.
          </p>

          <div className="footer-socials">
            {footerData.socials.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                className="social-btn"
                aria-label={s.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {renderSocialIcon(s.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
