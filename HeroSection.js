import { createButton } from '../common/Button.js';
import './HeroSection.css';

export function renderHeroSection(onNavigate) {
  const section = document.createElement('section');
  section.className = 'hero-section';
  section.id = 'hero';

  section.innerHTML = `
    <div class="container hero-inner">
      <!-- Left Column: Copy & Actions -->
      <div class="hero-content">
        <div class="badge badge-cyan hero-eyebrow">
          <i data-lucide="sparkles" size="14"></i>
          <span>UZXIATREATR • AI ACADEMY</span>
        </div>

        <h1 class="hero-title text-gradient">
          KELAJAK TEXNOLOGIYALARI VA BILIMLAR MAKONI
        </h1>

        <p class="hero-description">
          UZXIAtreatr — Sun'iy intellekt, zamonaviy dasturlash, multimedia va ta'lim ekotizimini birlashtirgan innovatsion raqamli platforma. Bilimlarni amalda qo'llang va kelajak kasblarini egallang.
        </p>

        <div class="hero-actions">
          <div id="heroPrimaryCtaSlot"></div>
          <div id="heroSecondaryCtaSlot"></div>
        </div>

        <!-- Hero Highlights / Key Pillars -->
        <div class="hero-pillars">
          <div class="pillar-item">
            <i data-lucide="cpu" class="pillar-icon"></i>
            <span>Sun'iy Intellekt</span>
          </div>
          <div class="pillar-item">
            <i data-lucide="book-open" class="pillar-icon"></i>
            <span>Interaktiv Ta'lim</span>
          </div>
          <div class="pillar-item">
            <i data-lucide="video" class="pillar-icon"></i>
            <span>Multimedia Center</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Sophisticated AI Neural Visual -->
      <div class="hero-visual-wrapper">
        <div class="ai-visual-card">
          <!-- Orbital Rings -->
          <div class="ai-orbit ring-1"></div>
          <div class="ai-orbit ring-2"></div>
          <div class="ai-orbit ring-3"></div>

          <!-- Glowing Central Core -->
          <div class="ai-core">
            <i data-lucide="brain-circuit" size="48" class="core-icon"></i>
          </div>

          <!-- Floating Neural Nodes -->
          <div class="ai-node node-1">
            <i data-lucide="sparkles" size="16"></i>
            <span>Generativ AI</span>
          </div>

          <div class="ai-node node-2">
            <i data-lucide="code" size="16"></i>
            <span>Python & Data</span>
          </div>

          <div class="ai-node node-3">
            <i data-lucide="terminal" size="16"></i>
            <span>Prompt Engineering</span>
          </div>

          <div class="ai-node node-4">
            <i data-lucide="shield-check" size="16"></i>
            <span>AI Ethics</span>
          </div>

          <!-- Abstract Tech Grid Lines Overlay -->
          <div class="ai-grid-overlay"></div>
        </div>
      </div>
    </div>
  `;

  // Attach CTAs using Button component
  const primarySlot = section.querySelector('#heroPrimaryCtaSlot');
  const secondarySlot = section.querySelector('#heroSecondaryCtaSlot');

  const primaryBtn = createButton({
    variant: 'primary',
    size: 'lg',
    label: 'AI Academy',
    icon: 'sparkles',
    onClick: () => onNavigate && onNavigate('academy'),
  });

  const secondaryBtn = createButton({
    variant: 'secondary',
    size: 'lg',
    label: 'Interaktiv zona',
    icon: 'gamepad-2',
    onClick: () => onNavigate && onNavigate('interactive'),
  });

  primarySlot.appendChild(primaryBtn);
  secondarySlot.appendChild(secondaryBtn);

  return section;
}
