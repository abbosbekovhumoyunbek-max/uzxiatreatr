import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageContainer from './components/layout/PageContainer';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers, Award } from 'lucide-react';
import './assets/styles/main.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="app-shell">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <PageContainer>
        {/* Phase 1 Verification Hero Teaser */}
        <section id="home" style={{ padding: '5rem 0 3rem 0' }}>
          <div className="container">
            <div className="glass-card" style={{ padding: '3.5rem 2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }} />
              
              <div className="badge badge-cyan" style={{ marginBottom: '1.5rem' }}>
                <Sparkles size={14} />
                <span>UZXIAtreatr — Phase 1 Infrastructure</span>
              </div>

              <h1 className="text-gradient" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '1.2rem' }}>
                Kelajak Texnologiyalari va Intellektual Bilimlar Makoni
              </h1>

              <p style={{ maxWidth: '750px', margin: '0 auto 2.5rem auto', fontSize: '1.15rem', color: 'var(--text-secondary)' }}>
                Sun'iy intellekt, zamonaviy dasturlash va ta'lim multimedia platformasi ekotizimining tayanch infratuzilmasi va dizayn tizimi muvaffaqiyatli ishga tushirildi.
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#interactive" className="btn btn-primary">
                  <span>Viktorina va Interaktiv Zona</span>
                  <ArrowRight size={18} />
                </a>
                <a href="#about" className="btn btn-secondary">
                  <span>Tizim Hujjatlari</span>
                </a>
              </div>

              {/* Core Infrastructure Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
                marginTop: '3.5rem',
                textAlign: 'left'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <ShieldCheck style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }} size={28} />
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Xavfsiz Infratuzilma</h3>
                  <p style={{ fontSize: '0.88rem' }}>Clean architecture va modulli data qatlami.</p>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <Zap style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }} size={28} />
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Tezkor Ishlash</h3>
                  <p style={{ fontSize: '0.88rem' }}>Vite ES-Build va minimal JS overhead.</p>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <Layers style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }} size={28} />
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Modern CSS Tokens</h3>
                  <p style={{ fontSize: '0.88rem' }}>Glassmorphism va moslashuvchan dizayn.</p>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <Award style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }} size={28} />
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>O'zbek Tilida UI</h3>
                  <p style={{ fontSize: '0.88rem' }}>Tabiiy o'zbek tilidagi mukammal interfeys.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>

      <Footer setActiveSection={setActiveSection} />
    </div>
  );
}
