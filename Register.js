import { createPageHero } from '../components/common/PageHero.js';
import { createCard } from '../components/common/Card.js';
import { createButton } from '../components/common/Button.js';
import { authService } from '../services/authService.js';
import { showToast } from '../components/common/Toast.js';

export function renderRegisterPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'register-page';

  const hero = createPageHero({
    eyebrow: 'RO\'YXATDAN O\'TISH',
    title: 'Yangi Akkaunt Yaratish',
    description: 'UZXIAtreatr platformasiga a\'zo bo\'ling va AI hamda dasturlash kurslariga bepul kiring.',
    breadcrumb: 'Ro\'yxatdan o\'tish',
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
  card.style.maxWidth = '480px';
  card.style.margin = '0 auto';

  card.innerHTML = `
    <form id="regForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
      <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary); text-align: center;">Ro'yxatdan O'tish</h3>
      
      <div>
        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">To'liq Ismingiz:</label>
        <input
          type="text"
          id="regName"
          placeholder="Humoyun Mirzo"
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
        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">Email Manzil:</label>
        <input
          type="email"
          id="regEmail"
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
          id="regPassword"
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

      <div id="regBtnSlot" style="margin-top: 0.5rem;"></div>

      <div style="text-align: center; font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.5rem;">
        Akkauntingiz bormi? 
        <a href="#login" id="toLoginLink" style="color: var(--accent-cyan); font-weight: 600; text-decoration: none;">Tizimga kiring</a>
      </div>
    </form>
  `;

  const btnSlot = card.querySelector('#regBtnSlot');
  const toLoginLink = card.querySelector('#toLoginLink');

  if (toLoginLink) {
    toLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (onNavigate) onNavigate('login');
    });
  }

  const submitBtn = createButton({
    variant: 'primary',
    size: 'lg',
    label: 'Akkaunt Yaratish',
    icon: 'user-plus',
    onClick: async (e) => {
      e.preventDefault();
      const name = card.querySelector('#regName').value.trim();
      const email = card.querySelector('#regEmail').value.trim();
      const password = card.querySelector('#regPassword').value;

      if (!name || !email || !password) {
        showToast('Barcha maydonlarni to\'ldiring.', 'warning');
        return;
      }

      try {
        const res = await authService.register(name, email, password);
        if (res.success) {
          showToast('Akkaunt muvaffaqiyatli yaratildi!', 'success');
          if (onNavigate) onNavigate('dashboard');
        } else {
          showToast(res.message || 'Ro\'yxatdan o\'tishda xatolik.', 'error');
        }
      } catch (err) {
        showToast(err.message || 'Server xatosi.', 'error');
      }
    },
  });

  btnSlot.appendChild(submitBtn);
  container.appendChild(card);
  page.appendChild(container);
  return page;
}
