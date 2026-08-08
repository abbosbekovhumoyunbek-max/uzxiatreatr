import { navigationLinks } from '../../data/navigationData.js';
import { createButton } from '../common/Button.js';
import { authService } from '../../services/authService.js';

export function renderNavbar(activeSection, onNavigate) {
  const user = authService.getCurrentUser();
  const isLoggedIn = user && user.id && user.id !== 'guest';

  const header = document.createElement('header');
  header.className = 'navbar-header';
  header.id = 'main-navbar';

  const container = document.createElement('div');
  container.className = 'navbar-container container';

  // Logo
  const logoLink = document.createElement('a');
  logoLink.href = '#home';
  logoLink.className = 'navbar-logo';
  logoLink.innerHTML = `
    <div class="logo-icon-badge">
      <i data-lucide="cpu" class="logo-icon"></i>
    </div>
    <div class="logo-text-group">
      <span class="logo-title text-gradient">UZXIAtreatr</span>
      <span class="logo-subtitle">DIGITAL ACADEMY</span>
    </div>
  `;
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate('home');
  });

  // Desktop Navigation Menu
  const nav = document.createElement('nav');
  nav.className = 'navbar-nav desktop-nav';

  navigationLinks.forEach((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.className = `nav-link ${activeSection === link.id ? 'active' : ''}`;
    a.textContent = link.label;

    a.addEventListener('click', (e) => {
      e.preventDefault();
      if (onNavigate) onNavigate(link.id);
    });

    nav.appendChild(a);
  });

  // Actions slot
  const actionsSlot = document.createElement('div');
  actionsSlot.className = 'navbar-actions';

  if (isLoggedIn) {
    const dashBtn = createButton({
      variant: activeSection === 'dashboard' ? 'primary' : 'outline',
      size: 'sm',
      label: user.name ? user.name.split(' ')[0] : 'Kabinet',
      icon: 'user-check',
      onClick: () => {
        if (onNavigate) onNavigate('dashboard');
      },
    });
    actionsSlot.appendChild(dashBtn);
  } else {
    const loginBtn = createButton({
      variant: 'primary',
      size: 'sm',
      label: 'Kirish',
      icon: 'log-in',
      onClick: () => {
        if (onNavigate) onNavigate('login');
      },
    });
    actionsSlot.appendChild(loginBtn);
  }

  // Mobile Menu Toggle Button
  const mobileToggle = document.createElement('button');
  mobileToggle.className = 'mobile-menu-toggle';
  mobileToggle.setAttribute('aria-label', 'Menuni ochish');
  mobileToggle.innerHTML = `<i data-lucide="menu" size="24"></i>`;

  // Mobile Drawer Container
  const mobileDrawer = document.createElement('div');
  mobileDrawer.className = 'mobile-drawer';

  navigationLinks.forEach((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.className = `mobile-nav-link ${activeSection === link.id ? 'active' : ''}`;
    a.textContent = link.label;

    a.addEventListener('click', (e) => {
      e.preventDefault();
      mobileDrawer.classList.remove('open');
      if (onNavigate) onNavigate(link.id);
    });

    mobileDrawer.appendChild(a);
  });

  const mobileLoginLink = document.createElement('a');
  mobileLoginLink.href = isLoggedIn ? '#dashboard' : '#login';
  mobileLoginLink.className = 'mobile-nav-link active';
  mobileLoginLink.textContent = isLoggedIn ? 'Shaxsiy Kabinet' : 'Tizimga Kirish';
  mobileLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    mobileDrawer.classList.remove('open');
    if (onNavigate) onNavigate(isLoggedIn ? 'dashboard' : 'login');
  });
  mobileDrawer.appendChild(mobileLoginLink);

  mobileToggle.addEventListener('click', () => {
    mobileDrawer.classList.toggle('open');
    const isOpen = mobileDrawer.classList.contains('open');
    mobileToggle.innerHTML = isOpen
      ? `<i data-lucide="x" size="24"></i>`
      : `<i data-lucide="menu" size="24"></i>`;
    if (window.lucide) window.lucide.createIcons();
  });

  container.appendChild(logoLink);
  container.appendChild(nav);
  container.appendChild(actionsSlot);
  container.appendChild(mobileToggle);

  header.appendChild(container);
  header.appendChild(mobileDrawer);

  return header;
}
