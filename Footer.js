import { footerData } from '../../data/navigationData.js';

export function renderFooter(onNavigate) {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  footer.innerHTML = `
    <div class="container">
      <!-- Main Footer Content -->
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="footer-brand-col">
          <a href="#home" class="brand-logo footer-logo" data-id="home">
            <div class="logo-icon-wrapper">
              <i data-lucide="cpu" class="logo-icon"></i>
            </div>
            <div class="logo-text">
              <span class="logo-title">${footerData.brand}</span>
              <span class="logo-subtitle">AI ACADEMY</span>
            </div>
          </a>
          <p class="footer-tagline">${footerData.tagline}</p>
          <p class="footer-desc">${footerData.description}</p>
          
          <!-- Contact Info -->
          <div class="footer-contact-info">
            <div class="contact-item">
              <i data-lucide="map-pin" class="contact-icon"></i>
              <span>${footerData.contact.address}</span>
            </div>
            <div class="contact-item">
              <i data-lucide="mail" class="contact-icon"></i>
              <a href="mailto:${footerData.contact.email}">${footerData.contact.email}</a>
            </div>
            <div class="contact-item">
              <i data-lucide="phone" class="contact-icon"></i>
              <a href="tel:${footerData.contact.phone}">${footerData.contact.phone}</a>
            </div>
          </div>
        </div>

        <!-- Dynamic Link Columns -->
        ${footerData.sections.map(section => `
          <div class="footer-links-col">
            <h3 class="footer-col-title">${section.title}</h3>
            <ul class="footer-links-list">
              ${section.links.map(link => {
                const targetId = link.href.replace('#', '');
                return `
                  <li>
                    <a href="${link.href}" data-id="${targetId}">
                      ${link.label}
                    </a>
                  </li>
                `;
              }).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <!-- Footer Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright-text">
          © ${new Date().getFullYear()} UZXIAtreatr. Barcha huquqlar himoyalangan.
        </p>

        <div class="footer-socials">
          ${footerData.socials.map(s => `
            <a href="${s.href}" class="social-btn" aria-label="${s.name}" target="_blank" rel="noopener noreferrer">
              <i data-lucide="${s.icon.toLowerCase()}"></i>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const links = footer.querySelectorAll('a[data-id]');
  links.forEach(link => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('data-id');
      if (onNavigate) onNavigate(id);
    });
  });

  return footer;
}
