import { createPageHero } from '../components/common/PageHero.js';
import { createCard } from '../components/common/Card.js';
import { createButton } from '../components/common/Button.js';
import { authService } from '../services/authService.js';
import { showToast } from '../components/common/Toast.js';

export function renderLoginPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'login-page';

  const hero = createPageHero({
    eyebrow: 'TIZIMGA KIRISH',
    title: 'UZXIAtreatr Platformasiga Kirish',
    description: 'O\'quv jarayoningiz, kurslaringiz va statistikangizni davom ettirish uchun akkauntingizga kiring.',
    breadcrumb: 'Kirish',
    badgeVariant: 'cyan',
  });
  page.appendChild(hero);

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '3.5rem 1.5rem 5rem 1.5rem';

  const card = createCard({
    variant: 'glass',
    padding: 'lg',
  });
  card.style.maxWidth = '450px';
  card.style.margin = '0 auto';

  card.innerHTML = `
    <form id="loginForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
      <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary); text-align: center;">Tizimga Kirish</h3>
      
      <div>
        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">Email Manzil:</label>
        <input
          type="email"
          id="loginEmail"
          placeholder="student@uzxia.uz"
          required
          style="
            width: 100%;
            padding: 0.8rem 1rem;
            border-radius: var(--radius-sm);
            background: rgba(255,255,255,0.04);
            border: 1px solid var(--border-color);
            color: #fff;
            font-size: 0.95rem;
            outline: none;
          "
        />
      </div>

      <div>
        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">Parol:</label>
        <input
          type="password"
          id="loginPassword"
          placeholder="••••••••"
          required
          style="
            width: 100%;
            padding: 0.8rem 1rem;
            border-radius: var(--radius-sm);
            background: rgba(255,255,255,0.04);
            border: 1px solid var(--border-color);
            color: #fff;
            font-size: 0.95rem;
            outline: none;
          "
        />
      </div>

      <div id="loginBtnSlot" style="margin-top: 0.5rem;"></div>

      <div style="text-align: center; font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.5rem;">
        Akkauntingiz yo'qmi? 
        <a href="#register" id="toRegisterLink" style="color: var(--accent-cyan); font-weight: 600; text-decoration: none;">Ro'yxatdan o'ting</a>
      </div>
    </form>
  `;

  const form = card.querySelector('#loginForm');
  const btnSlot = card.querySelector('#loginBtnSlot');
  const toRegLink = card.querySelector('#toRegisterLink');

  if (toRegLink) {
    toRegLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (onNavigate) onNavigate('register');
    });
  }

  const submitBtn = createButton({
    variant: 'primary',
    size: 'lg',
    label: 'Tizimga kirish',
    icon: 'log-in',
    onClick: async (e) => {
      e.preventDefault();
      const email = card.querySelector('#loginEmail').value.trim();
      const password = card.querySelector('#loginPassword').value;

      if (!email || !password) {
        showToast('Email va parolni kiriting.', 'warning');
        return;
      }

      try {
        const res = await authService.login(email, password);
        if (res.success) {
          showToast(`Xush kelibsiz, ${res.user.name}!`, 'success');
          if (onNavigate) onNavigate('dashboard');
        } else {
          showToast(res.message || 'Kirishda xatolik yuz berdi.', 'error');
        }
      } catch (err) {
        showToast(err.message || 'Server bilan alaloqa xatosi.', 'error');
      }
    },
  });

  btnSlot.appendChild(submitBtn);
  container.appendChild(card);
  page.appendChild(container);
  return page;
}
