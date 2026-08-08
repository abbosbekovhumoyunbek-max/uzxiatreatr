import { createButton } from './Button.js';

/**
 * UZXIAtreatr StateViews System
 * LoadingState, EmptyState, ErrorState
 */

export function renderLoadingState(options = {}) {
  const {
    text = "Ma'lumotlar yuklanmoqda...",
    skeleton = false,
    count = 3,
  } = options;

  const wrapper = document.createElement('div');
  wrapper.className = 'state-view-wrapper';

  if (skeleton) {
    wrapper.style.maxWidth = '100%';
    wrapper.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; width: 100%;">
        ${Array.from({ length: count }).map(() => `
          <div class="glass-card" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <div class="skeleton" style="height: 160px; width: 100%;"></div>
            <div class="skeleton" style="height: 24px; width: 75%;"></div>
            <div class="skeleton" style="height: 16px; width: 90%;"></div>
            <div class="skeleton" style="height: 16px; width: 60%;"></div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    wrapper.innerHTML = `
      <div class="state-icon-box icon-loading">
        <span class="btn-spinner" style="width: 2rem; height: 2rem; border-width: 3px;"></span>
      </div>
      <h3 class="state-title">${text}</h3>
      <p class="state-description">Iltimos, kuting. Tizim javobi tayyorlanmoqda.</p>
    `;
  }

  return wrapper;
}

export function renderEmptyState(options = {}) {
  const {
    icon = 'inbox',
    title = "Ma'lumot topilmadi",
    description = 'Ushbu bo\'limda hozircha hechnarsa mavjud emas. Tez orada yangi kontent joylashtiriladi.',
    action = null, // { label, onClick, icon }
  } = options;

  const wrapper = document.createElement('div');
  wrapper.className = 'state-view-wrapper';

  wrapper.innerHTML = `
    <div class="state-icon-box icon-empty">
      <i data-lucide="${icon}" size="32"></i>
    </div>
    <h3 class="state-title">${title}</h3>
    <p class="state-description">${description}</p>
    <div class="state-action-slot"></div>
  `;

  if (action) {
    const actionSlot = wrapper.querySelector('.state-action-slot');
    const btn = createButton({
      variant: 'secondary',
      label: action.label || 'Bosh sahifaga qaytish',
      icon: action.icon || 'arrow-left',
      onClick: action.onClick,
    });
    actionSlot.appendChild(btn);
  }

  return wrapper;
}

export function renderErrorState(options = {}) {
  const {
    icon = 'alert-triangle',
    title = "Xatolik yuz berdi",
    description = 'Tizimda kutilmagan xatolik sodir bo\'ldi. Internet aloqasini tekshiring yoki qayta urinib ko\'ring.',
    onRetry = null,
    retryLabel = 'Qayta urinish',
  } = options;

  const wrapper = document.createElement('div');
  wrapper.className = 'state-view-wrapper';

  wrapper.innerHTML = `
    <div class="state-icon-box icon-error">
      <i data-lucide="${icon}" size="32"></i>
    </div>
    <h3 class="state-title">${title}</h3>
    <p class="state-description">${description}</p>
    <div class="state-action-slot"></div>
  `;

  if (onRetry) {
    const actionSlot = wrapper.querySelector('.state-action-slot');
    const retryBtn = createButton({
      variant: 'primary',
      label: retryLabel,
      icon: 'rotate-cw',
      onClick: onRetry,
    });
    actionSlot.appendChild(retryBtn);
  }

  return wrapper;
}
