import { createPageHero } from '../components/common/PageHero.js';
import { renderDailyFact } from '../components/interactive/DailyFact.js';
import { quizQuestionsData } from '../data/quizQuestions.js';
import { createCard } from '../components/common/Card.js';
import { createButton } from '../components/common/Button.js';
import { createSectionHeader } from '../components/common/SectionHeader.js';
import { showToast } from '../components/common/Toast.js';

export function renderInteractivePage(onNavigate) {
  const page = document.createElement('div');
  page.className = 'interactive-page';

  // Hero
  const hero = createPageHero({
    eyebrow: 'INTERAKTIV ZONA',
    title: 'Interaktiv AI va Texnologik Viktorina',
    description: 'Bilimlaringizni sinang, kunlik AI faktlarini o\'rganing va mini-viktorinada natijangizni baholang.',
    breadcrumb: 'Interaktiv Zona',
    badgeVariant: 'cyan',
  });
  page.appendChild(hero);

  // 1. Daily AI Fact Section
  page.appendChild(renderDailyFact());

  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '4rem 1.5rem 5rem 1.5rem';

  // 2. Mini Quiz Section Header
  const quizHeader = createSectionHeader({
    eyebrow: 'MINI VIKTORINA',
    title: 'AI va Dasturlash Bo\'yicha O\'quv Viktorinasi',
    description: 'Kategoriya va qiyinchilik darajasini tanlang va bilimlaringizni sinang.',
    align: 'center',
    gradientTitle: true,
  });
  container.appendChild(quizHeader);

  const quizCard = createCard({
    variant: 'glass',
    padding: 'lg',
  });
  quizCard.style.maxWidth = '800px';
  quizCard.style.margin = '0 auto';

  // Quiz State
  let quizStage = 'setup'; // 'setup' | 'quiz' | 'results'
  let selectedCategory = 'Barchasi';
  let selectedDifficulty = 'Barchasi';
  let activeQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let isAnswered = false;

  function renderQuizSetupScreen() {
    quizCard.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <h3 style="font-size: 1.3rem; font-weight: 700; color: var(--text-primary);">Viktorina Sozlamalari</h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary);">Mavzu va qiyinchilik darajasini tanlang:</p>

        <!-- Category Select -->
        <div>
          <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">Mavzu / Kategoriya:</label>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="qCatBtns">
            ${['Barchasi', 'AI', 'Programming', 'Cybersecurity', 'Technology'].map(cat => `
              <button class="btn btn-sm ${cat === selectedCategory ? 'btn-primary' : 'btn-secondary'}" data-qcat="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Difficulty Select -->
        <div>
          <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">Qiyinchilik Darajasi:</label>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="qLvlBtns">
            ${['Barchasi', 'Boshlang\'ich', 'O\'rta', 'Yuqori'].map(lvl => `
              <button class="btn btn-sm ${lvl === selectedDifficulty ? 'btn-primary' : 'btn-ghost'}" data-qlvl="${lvl}">
                ${lvl}
              </button>
            `).join('')}
          </div>
        </div>

        <div id="startQuizBtnSlot" style="margin-top: 1rem; align-self: flex-start;"></div>
      </div>
    `;

    const catBtns = quizCard.querySelectorAll('#qCatBtns button');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.className = 'btn btn-sm btn-secondary');
        btn.className = 'btn btn-sm btn-primary';
        selectedCategory = btn.getAttribute('data-qcat');
      });
    });

    const lvlBtns = quizCard.querySelectorAll('#qLvlBtns button');
    lvlBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        lvlBtns.forEach(b => b.className = 'btn btn-sm btn-ghost');
        btn.className = 'btn btn-sm btn-primary';
        selectedDifficulty = btn.getAttribute('data-qlvl');
      });
    });

    const startSlot = quizCard.querySelector('#startQuizBtnSlot');
    const startBtn = createButton({
      variant: 'primary',
      size: 'lg',
      label: 'Viktorinani Boshlash',
      icon: 'play',
      onClick: () => {
        activeQuestions = quizQuestionsData.filter(q => {
          const matchCat = selectedCategory === 'Barchasi' || q.category === selectedCategory;
          const matchLvl = selectedDifficulty === 'Barchasi' || q.difficulty === selectedDifficulty;
          return matchCat && matchLvl;
        });

        if (activeQuestions.length === 0) {
          showToast('Tanlangan filtrlar bo\'yicha savollar topilmadi. Boshqa filtr tanlang.', 'warning');
          return;
        }

        currentQuestionIndex = 0;
        score = 0;
        isAnswered = false;
        quizStage = 'quiz';
        renderQuizQuestion();
      },
    });
    startSlot.appendChild(startBtn);
  }

  function renderQuizQuestion() {
    if (currentQuestionIndex >= activeQuestions.length) {
      renderQuizResults();
      return;
    }

    const q = activeQuestions[currentQuestionIndex];
    const progressPercent = Math.round(((currentQuestionIndex + 1) / activeQuestions.length) * 100);

    quizCard.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; font-size: 0.85rem;">
            <div style="display: flex; gap: 0.5rem;">
              <span class="badge badge-cyan">${q.category}</span>
              <span class="badge badge-violet">${q.difficulty}</span>
            </div>
            <span style="color: var(--text-secondary); font-family: var(--font-mono);">
              Savol ${currentQuestionIndex + 1} / ${activeQuestions.length}
            </span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.08); border-radius: var(--radius-full); overflow: hidden;">
            <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-blue) 100%); transition: width var(--transition-normal);"></div>
          </div>
        </div>

        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); line-height: 1.4;">
          ${q.question}
        </h3>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${q.options.map((opt, idx) => `
            <button
              class="quiz-option-btn"
              data-opt-index="${idx}"
              style="
                padding: 1rem 1.25rem;
                border-radius: var(--radius-md);
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
                font-size: 0.95rem;
                text-align: left;
                cursor: pointer;
                transition: all var(--transition-fast);
                display: flex;
                align-items: center;
                gap: 0.75rem;
              "
            >
              <span style="
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: rgba(255,255,255,0.08);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.85rem;
                font-weight: 600;
                color: var(--accent-cyan);
                flex-shrink: 0;
              ">${String.fromCharCode(65 + idx)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>

        <div id="quizFeedbackArea" style="display: none;"></div>
        <div id="quizActionSlot" style="display: flex; justify-content: flex-end;"></div>
      </div>
    `;

    const optionBtns = quizCard.querySelectorAll('.quiz-option-btn');
    const feedbackArea = quizCard.querySelector('#quizFeedbackArea');
    const actionSlot = quizCard.querySelector('#quizActionSlot');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (isAnswered) return;
        isAnswered = true;

        const chosenIdx = parseInt(btn.getAttribute('data-opt-index'), 10);
        const isCorrect = chosenIdx === q.correctIndex;
        if (isCorrect) score += 1;

        optionBtns.forEach((b, idx) => {
          b.disabled = true;
          if (idx === q.correctIndex) {
            b.style.borderColor = 'var(--accent-emerald)';
            b.style.background = 'rgba(16, 185, 129, 0.15)';
          } else if (idx === chosenIdx && !isCorrect) {
            b.style.borderColor = 'var(--accent-rose)';
            b.style.background = 'rgba(244, 63, 94, 0.15)';
          }
        });

        feedbackArea.style.display = 'block';
        feedbackArea.className = 'glass-card';
        feedbackArea.style.padding = '1rem';
        feedbackArea.style.marginTop = '0.5rem';
        feedbackArea.style.background = isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)';
        feedbackArea.innerHTML = `
          <div style="font-weight: 700; color: ${isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; margin-bottom: 0.3rem;">
            ${isCorrect ? '✅ To\'g\'ri javob!' : '❌ Noto\'g\'ri javob.'}
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">${q.explanation}</p>
        `;

        const nextBtn = createButton({
          variant: 'primary',
          size: 'md',
          label: currentQuestionIndex === activeQuestions.length - 1 ? 'Natijani ko\'rish' : 'Keyingi savol',
          icon: 'arrow-right',
          iconPosition: 'right',
          onClick: () => {
            currentQuestionIndex += 1;
            isAnswered = false;
            renderQuizQuestion();
          },
        });

        actionSlot.appendChild(nextBtn);
        if (window.lucide) window.lucide.createIcons();
      });
    });
  }

  function renderQuizResults() {
    const total = activeQuestions.length;
    const percentage = Math.round((score / total) * 100);

    let feedbackMsg = 'Juda yaxshi natija! Sun\'iy intellekt va dasturlash sohasidagi bilimlaringiz juda yuqori.';
    if (percentage < 50) {
      feedbackMsg = 'Boshlash uchun yaxshi qadam. AI Academy modullarini ko\'rib chiqib, qayta urinib ko\'ring.';
    } else if (percentage < 70) {
      feedbackMsg = 'Yana bir oz mashq qiling. Bilimlaringizni yanada mustahkamlashingiz mumkin.';
    } else if (percentage < 90) {
      feedbackMsg = 'Yaxshi natija! Barakalla, amaliyotda davom eting.';
    }

    showToast(`Viktorina yakunlandi! Natijangiz: ${percentage}%`, percentage >= 70 ? 'success' : 'info');

    quizCard.innerHTML = `
      <div style="text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; padding: 1rem 0;">
        <div style="
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(0, 240, 255, 0.1);
          border: 2px solid var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-cyan);
          box-shadow: var(--shadow-neon);
        ">
          <i data-lucide="award" size="40"></i>
        </div>

        <h3 style="font-size: 1.6rem; font-weight: 700;" class="text-gradient">Viktorina Natijangiz</h3>

        <div style="font-size: 3rem; font-family: var(--font-display); font-weight: 800; color: var(--text-primary); line-height: 1;">
          ${score} <span style="font-size: 1.5rem; color: var(--text-muted);">/ ${total}</span>
        </div>

        <div class="badge badge-cyan" style="font-size: 0.9rem;">To'g'ri ko'rsatkich: ${percentage}%</div>

        <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 500px; line-height: 1.6;">
          ${feedbackMsg}
        </p>

        <div id="restartQuizSlot" style="margin-top: 1rem; display: flex; gap: 1rem;"></div>
      </div>
    `;

    const restartSlot = quizCard.querySelector('#restartQuizSlot');
    const restartBtn = createButton({
      variant: 'primary',
      size: 'md',
      label: 'Qayta o\'ynash',
      icon: 'rotate-cw',
      onClick: () => {
        quizStage = 'setup';
        renderQuizSetupScreen();
      },
    });
    restartSlot.appendChild(restartBtn);
    if (window.lucide) window.lucide.createIcons();
  }

  renderQuizSetupScreen();
  container.appendChild(quizCard);
  page.appendChild(container);
  return page;
}
