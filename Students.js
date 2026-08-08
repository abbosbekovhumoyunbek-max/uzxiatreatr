import { createPageHero } from '../components/common/PageHero.js';
import { resourcesData } from '../data/resources.js';
import { studyTipsData } from '../data/studyTips.js';
import { createCard } from '../components/common/Card.js';
import { createButton } from '../components/common/Button.js';
import { createSectionHeader } from '../components/common/SectionHeader.js';
import { storage } from '../utils/storage.js';
import { showToast } from '../components/common/Toast.js';

export function renderStudentsPage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'students-page';

  // Hero
  const hero = createPageHero({
    eyebrow: 'TALABALAR HUBI',
    title: 'Talabalar uchun Bilim va Resurslar',
    description: 'Dasturlash, AI tools, kitoblar, ingliz tili hamda samarali o\'qish metodologiyalari bir joyda.',
    breadcrumb: 'Talabalar',
    badgeVariant: 'cyan',
  });
  page.appendChild(hero);

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '3.5rem 1.5rem 5rem 1.5rem';

  // 1. Study Toolkit Section (Pomodoro Timer + Study Goal Tracker)
  const toolHeader = createSectionHeader({
    eyebrow: 'STUDY TOOLKIT',
    title: 'Talabalar uchun Samaradorlik Vositalari',
    description: 'Pomodoro taymer va shaxsiy kunlik o\'quv maqsadlarini kuzatuvchi lokal vosita.',
    align: 'left',
    gradientTitle: true,
  });
  container.appendChild(toolHeader);

  const toolkitGrid = document.createElement('div');
  toolkitGrid.style.display = 'grid';
  toolkitGrid.style.gridTemplateColumns = '1fr';
  toolkitGrid.style.gap = '2rem';
  toolkitGrid.style.marginBottom = '4rem';

  const mediaMatch = window.matchMedia('(min-width: 1024px)');
  if (mediaMatch.matches) {
    toolkitGrid.style.gridTemplateColumns = '1fr 1fr';
  }

  // Toolkit Component A: Pomodoro Timer
  const pomodoroCard = createCard({
    variant: 'glass',
    padding: 'lg',
  });

  let timerMode = 'work'; // 'work' | 'break'
  let workDuration = 25 * 60; // 25 min
  let breakDuration = 5 * 60; // 5 min
  let timeLeft = workDuration;
  let timerInterval = null;
  let isRunning = false;

  function formatTimer(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function renderPomodoroUI() {
    pomodoroCard.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem; text-align: center;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="badge badge-cyan">⏱️ Pomodoro Taymeri</span>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn btn-sm ${workDuration === 25 * 60 ? 'btn-primary' : 'btn-ghost'}" id="preset25">25 / 5 min</button>
            <button class="btn btn-sm ${workDuration === 50 * 60 ? 'btn-primary' : 'btn-ghost'}" id="preset50">50 / 10 min</button>
          </div>
        </div>

        <div style="font-size: 3.5rem; font-family: var(--font-mono); font-weight: 800; color: var(--text-primary); margin: 0.5rem 0;" id="pomoDisplay">
          ${formatTimer(timeLeft)}
        </div>

        <div style="font-size: 0.88rem; color: ${timerMode === 'work' ? 'var(--accent-cyan)' : 'var(--accent-emerald)'}; font-weight: 600;">
          ${timerMode === 'work' ? '🧠 Diqqatni jamlash vaqti (Work)' : '☕ Qisqa tanaffus (Break)'}
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center;" id="pomoControlsSlot"></div>
      </div>
    `;

    const controlsSlot = pomodoroCard.querySelector('#pomoControlsSlot');
    const displayEl = pomodoroCard.querySelector('#pomoDisplay');

    const startBtn = createButton({
      variant: isRunning ? 'secondary' : 'primary',
      size: 'md',
      label: isRunning ? 'Pauza' : 'Boshlash',
      icon: isRunning ? 'pause' : 'play',
      onClick: () => {
        if (isRunning) {
          clearInterval(timerInterval);
          isRunning = false;
          renderPomodoroUI();
        } else {
          isRunning = true;
          timerInterval = setInterval(() => {
            if (timeLeft > 0) {
              timeLeft -= 1;
              if (displayEl) displayEl.textContent = formatTimer(timeLeft);
            } else {
              clearInterval(timerInterval);
              isRunning = false;
              if (timerMode === 'work') {
                showToast('Ish vaqti tugadi! Endi tanaffus qiling ☕', 'success');
                timerMode = 'break';
                timeLeft = breakDuration;
              } else {
                showToast('Tanaffus tugadi! Diqqatni jamlang 🧠', 'info');
                timerMode = 'work';
                timeLeft = workDuration;
              }
              renderPomodoroUI();
            }
          }, 1000);
          renderPomodoroUI();
        }
      },
    });

    const resetBtn = createButton({
      variant: 'ghost',
      size: 'md',
      label: 'Qayta o\'rnatish',
      icon: 'rotate-cw',
      onClick: () => {
        clearInterval(timerInterval);
        isRunning = false;
        timerMode = 'work';
        timeLeft = workDuration;
        renderPomodoroUI();
      },
    });

    controlsSlot.appendChild(startBtn);
    controlsSlot.appendChild(resetBtn);

    const btn25 = pomodoroCard.querySelector('#preset25');
    const btn50 = pomodoroCard.querySelector('#preset50');

    if (btn25) {
      btn25.addEventListener('click', () => {
        clearInterval(timerInterval);
        isRunning = false;
        workDuration = 25 * 60;
        breakDuration = 5 * 60;
        timeLeft = workDuration;
        timerMode = 'work';
        renderPomodoroUI();
      });
    }

    if (btn50) {
      btn50.addEventListener('click', () => {
        clearInterval(timerInterval);
        isRunning = false;
        workDuration = 50 * 60;
        breakDuration = 10 * 60;
        timeLeft = workDuration;
        timerMode = 'work';
        renderPomodoroUI();
      });
    }
  }

  renderPomodoroUI();

  // Toolkit Component B: Study Goal Tracker
  const goalCard = createCard({
    variant: 'glass',
    padding: 'lg',
  });

  let savedGoal = storage.get('study_goal', { text: 'Bugun 2 soat Python o\'rganaman', minutes: 120, progress: 0 });

  function renderGoalUI() {
    const percent = Math.round((savedGoal.progress / savedGoal.minutes) * 100);

    goalCard.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="badge badge-cyan">🎯 Kunlik O'quv Maqsadi</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">* Lokal brauzer xotirasi</span>
        </div>

        <div>
          <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">Maqsadingiz:</label>
          <input
            type="text"
            id="goalTextInput"
            value="${savedGoal.text}"
            style="
              width: 100%;
              padding: 0.75rem 0.9rem;
              border-radius: var(--radius-sm);
              background: rgba(255,255,255,0.04);
              border: 1px solid var(--border-color);
              color: #fff;
              font-size: 0.95rem;
              outline: none;
            "
          />
        </div>

        <div style="display: flex; gap: 1rem; align-items: center;">
          <div style="flex: 1;">
            <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">Bajarildi (daqiqa):</label>
            <input
              type="number"
              id="goalProgInput"
              value="${savedGoal.progress}"
              style="
                width: 100%;
                padding: 0.75rem 0.9rem;
                border-radius: var(--radius-sm);
                background: rgba(255,255,255,0.04);
                border: 1px solid var(--border-color);
                color: #fff;
                font-size: 0.95rem;
                outline: none;
              "
            />
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">Maqsad (daqiqa):</label>
            <input
              type="number"
              id="goalTargetInput"
              value="${savedGoal.minutes}"
              style="
                width: 100%;
                padding: 0.75rem 0.9rem;
                border-radius: var(--radius-sm);
                background: rgba(255,255,255,0.04);
                border: 1px solid var(--border-color);
                color: #fff;
                font-size: 0.95rem;
                outline: none;
              "
            />
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.4rem;">
            <span>Bajarilish darajasi:</span>
            <span style="font-weight: 700; color: var(--accent-cyan);">${percent}%</span>
          </div>
          <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.08); border-radius: var(--radius-full); overflow: hidden;">
            <div style="width: ${Math.min(100, percent)}%; height: 100%; background: linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-emerald) 100%); transition: width var(--transition-normal);"></div>
          </div>
        </div>

        <div id="goalSaveBtnSlot" style="margin-top: 0.5rem; align-self: flex-end;"></div>
      </div>
    `;

    const saveSlot = goalCard.querySelector('#goalSaveBtnSlot');
    const saveBtn = createButton({
      variant: 'primary',
      size: 'sm',
      label: 'Maqsadni saqlash',
      icon: 'save',
      onClick: () => {
        const text = goalCard.querySelector('#goalTextInput').value.trim();
        const prog = parseInt(goalCard.querySelector('#goalProgInput').value, 10) || 0;
        const target = parseInt(goalCard.querySelector('#goalTargetInput').value, 10) || 60;

        savedGoal = { text, minutes: target, progress: prog };
        storage.set('study_goal', savedGoal);
        showToast('Kunlik o\'quv maqsadingiz saqlandi!', 'success');
        renderGoalUI();
      },
    });

    saveSlot.appendChild(saveBtn);
  }

  renderGoalUI();

  toolkitGrid.appendChild(pomodoroCard);
  toolkitGrid.appendChild(goalCard);
  container.appendChild(toolkitGrid);

  // 2. Rotating Study Tip Box
  let tipIndex = 0;
  const tipCard = createCard({
    variant: 'featured',
    padding: 'lg',
  });
  tipCard.style.marginBottom = '4rem';

  function renderTip(index) {
    const tip = studyTipsData[index];
    tipCard.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem;" id="tipInnerCard">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <span class="badge badge-cyan">💡 Kun Maslahati • ${tip.category}</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Maslahat #${tip.id} / ${studyTipsData.length}</span>
        </div>
        <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary);">${tip.title}</h3>
        <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6;">${tip.tip}</p>
        <div id="nextTipBtnSlot" style="align-self: flex-start; margin-top: 0.5rem;"></div>
      </div>
    `;

    const slot = tipCard.querySelector('#nextTipBtnSlot');
    const nextBtn = createButton({
      variant: 'secondary',
      size: 'sm',
      label: 'Yangi maslahat',
      icon: 'rotate-cw',
      onClick: () => {
        tipIndex = (tipIndex + 1) % studyTipsData.length;
        renderTip(tipIndex);
        if (window.lucide) window.lucide.createIcons();
      },
    });
    slot.appendChild(nextBtn);
  }

  renderTip(tipIndex);
  container.appendChild(tipCard);

  // 3. Resource Grid
  const resHeader = createSectionHeader({
    eyebrow: 'RESURSLAR KATALOGI',
    title: 'O\'quv Materiallari va Vositalar',
    description: 'Har bir yo\'nalish bo\'yicha saralangan elektron manbalar va tavsiyalar.',
    align: 'left',
    gradientTitle: true,
  });
  container.appendChild(resHeader);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  grid.style.gap = '1.75rem';

  resourcesData.forEach(res => {
    const card = createCard({
      variant: 'glass',
      padding: 'md',
      children: `
        <div style="display: flex; flex-direction: column; gap: 1rem; height: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="badge badge-cyan">${res.category}</span>
            <i data-lucide="${res.icon}" style="color: var(--accent-cyan);"></i>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${res.title}</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; flex: 1;">${res.description}</p>
          <div style="padding-top: 0.8rem; border-top: 1px solid var(--border-color);">
            <a href="#students" class="btn btn-sm btn-ghost" style="padding-left: 0;">
              ${res.linkText} <i data-lucide="external-link" size="14"></i>
            </a>
          </div>
        </div>
      `,
    });
    grid.appendChild(card);
  });

  container.appendChild(grid);
  page.appendChild(container);
  return page;
}
