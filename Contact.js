import { createPageHero } from '../components/common/PageHero.js';
import { createCard } from '../components/common/Card.js';
import { createButton } from '../components/common/Button.js';
import { footerData } from '../data/navigationData.js';

export function renderContactPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'contact-page';

  // Hero
  const hero = createPageHero({
    eyebrow: 'BOG\'LANISH',
    title: 'Biz Bilan Bog\'laning',
    description: 'Savollaringiz, takliflaringiz yoki hamkorlik masalalari bo\'yicha akademiya ma\'muriyatiga murojaat qiling.',
    breadcrumb: 'Aloqa',
    badgeVariant: 'cyan',
  });
  page.appendChild(hero);

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '4rem 1.5rem 5rem 1.5rem';

  const layout = document.createElement('div');
  layout.style.display = 'grid';
  layout.style.gridTemplateColumns = '1fr';
  layout.style.gap = '2.5rem';

  const queryMatch = window.matchMedia('(min-width: 1024px)');
  if (queryMatch.matches) {
    layout.style.gridTemplateColumns = '1fr 1.4fr';
  }

  // Left Column: Contact Info Card
  const infoCard = createCard({
    variant: 'glass',
    padding: 'lg',
    children: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <span class="badge badge-cyan" style="margin-bottom: 0.8rem;">MA'LUMOTLAR</span>
          <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary);">Akademiya Aloqa Tarmog'i</h3>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.6;">
            Savol va takliflaringizni elektron forma orqali yuborishingiz yoki rasmiy manzillarimizga bog'lanishingiz mumkin.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <div style="
              width: 40px;
              height: 40px;
              border-radius: var(--radius-sm);
              background: rgba(0, 240, 255, 0.1);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accent-cyan);
              flex-shrink: 0;
            ">
              <i data-lucide="map-pin"></i>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Rasmiy Manzil:</div>
              <div style="font-size: 0.95rem; color: var(--text-primary); font-weight: 600;">${footerData.contact.address}</div>
            </div>
          </div>

          <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <div style="
              width: 40px;
              height: 40px;
              border-radius: var(--radius-sm);
              background: rgba(0, 240, 255, 0.1);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accent-cyan);
              flex-shrink: 0;
            ">
              <i data-lucide="mail"></i>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Elektron Pochta:</div>
              <a href="mailto:${footerData.contact.email}" style="font-size: 0.95rem; color: var(--accent-cyan); font-weight: 600;">${footerData.contact.email}</a>
            </div>
          </div>

          <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <div style="
              width: 40px;
              height: 40px;
              border-radius: var(--radius-sm);
              background: rgba(0, 240, 255, 0.1);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--accent-cyan);
              flex-shrink: 0;
            ">
              <i data-lucide="phone"></i>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Telefon Raqam:</div>
              <a href="tel:${footerData.contact.phone}" style="font-size: 0.95rem; color: var(--accent-cyan); font-weight: 600;">${footerData.contact.phone}</a>
            </div>
          </div>
        </div>

        <div style="padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.8rem;">Ijtimoiy Tarmoqlar:</div>
          <div style="display: flex; gap: 0.75rem;">
            ${footerData.socials.map(s => `
              <a href="${s.href}" class="social-btn" aria-label="${s.name}" target="_blank" rel="noopener noreferrer">
                <i data-lucide="${s.icon.toLowerCase()}"></i>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `,
  });

  // Right Column: Interactive Form Card
  const formCard = createCard({
    variant: 'featured',
    padding: 'lg',
  });

  formCard.innerHTML = `
    <form id="contactForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
      <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary);">Xabar Yuborish</h3>

      <div id="contactFormAlert" style="display: none;"></div>

      <div>
        <label style="display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;" for="cName">
          Ismingiz va Familiyangiz *
        </label>
        <input
          type="text"
          id="cName"
          placeholder="Masalan: Ali Valiyev"
          style="
            width: 100%;
            padding: 0.8rem 1rem;
            border-radius: var(--radius-sm);
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            font-size: 0.95rem;
            outline: none;
          "
        />
      </div>

      <div>
        <label style="display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;" for="cEmail">
          Elektron Pochta *
        </label>
        <input
          type="email"
          id="cEmail"
          placeholder="masalan: ali@domain.uz"
          style="
            width: 100%;
            padding: 0.8rem 1rem;
            border-radius: var(--radius-sm);
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            font-size: 0.95rem;
            outline: none;
          "
        />
      </div>

      <div>
        <label style="display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;" for="cSubject">
          Mavzu *
        </label>
        <input
          type="text"
          id="cSubject"
          placeholder="Masalan: Kurslar bo'yicha savol"
          style="
            width: 100%;
            padding: 0.8rem 1rem;
            border-radius: var(--radius-sm);
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            font-size: 0.95rem;
            outline: none;
          "
        />
      </div>

      <div>
        <label style="display: block; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;" for="cMessage">
          Xabaringiz *
        </label>
        <textarea
          id="cMessage"
          rows="4"
          placeholder="Batafsil xabaringizni yozing..."
          style="
            width: 100%;
            padding: 0.8rem 1rem;
            border-radius: var(--radius-sm);
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            font-size: 0.95rem;
            outline: none;
            resize: vertical;
          "
        ></textarea>
      </div>

      <div id="formSubmitBtnSlot" style="margin-top: 0.5rem;"></div>
    </form>
  `;

  const form = formCard.querySelector('#contactForm');
  const alertBox = formCard.querySelector('#contactFormAlert');
  const btnSlot = formCard.querySelector('#formSubmitBtnSlot');

  const submitBtn = createButton({
    variant: 'primary',
    size: 'lg',
    label: 'Xabarni Yuborish',
    icon: 'send',
    type: 'submit',
  });
  btnSlot.appendChild(submitBtn);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#cName').value.trim();
    const email = form.querySelector('#cEmail').value.trim();
    const subject = form.querySelector('#cSubject').value.trim();
    const message = form.querySelector('#cMessage').value.trim();

    // Input Validation
    if (!name || !email || !subject || !message) {
      alertBox.style.display = 'block';
      alertBox.className = 'glass-card';
      alertBox.style.padding = '0.8rem 1rem';
      alertBox.style.background = 'rgba(244, 63, 94, 0.15)';
      alertBox.style.borderColor = 'var(--accent-rose)';
      alertBox.innerHTML = '<span style="color: var(--accent-rose); font-size: 0.88rem; font-weight: 600;">⚠️ Iltimos, barcha majburiy maydonlarni to\'ldiring!</span>';
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alertBox.style.display = 'block';
      alertBox.className = 'glass-card';
      alertBox.style.padding = '0.8rem 1rem';
      alertBox.style.background = 'rgba(244, 63, 94, 0.15)';
      alertBox.style.borderColor = 'var(--accent-rose)';
      alertBox.innerHTML = '<span style="color: var(--accent-rose); font-size: 0.88rem; font-weight: 600;">⚠️ Noto\'g\'ri email formati kiritildi!</span>';
      return;
    }

    // Success Local Feedback
    alertBox.style.display = 'block';
    alertBox.className = 'glass-card';
    alertBox.style.padding = '1rem';
    alertBox.style.background = 'rgba(16, 185, 129, 0.15)';
    alertBox.style.borderColor = 'var(--accent-emerald)';
    alertBox.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.3rem;">
        <span style="color: var(--accent-emerald); font-weight: 700;">✅ Xabar yuborildi!</span>
        <span style="color: var(--text-secondary); font-size: 0.88rem;">Tashakkur, ${name}. Murojaatingiz qabul qilindi. Tez orada email orqali javob beramiz.</span>
      </div>
    `;

    form.reset();
  });

  layout.appendChild(infoCard);
  layout.appendChild(formCard);
  container.appendChild(layout);
  page.appendChild(container);
  return page;
}
