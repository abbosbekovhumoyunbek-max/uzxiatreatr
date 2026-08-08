import { aiService } from '../../services/aiService.js';
import { createButton } from '../common/Button.js';
import './AIAssistant.css';

export function renderAIAssistant() {
  const wrapper = document.createElement('div');
  wrapper.className = 'ai-assistant-wrapper';

  let isOpen = false;
  let isThinking = false;
  let messages = [
    { sender: 'ai', text: 'Assalomu alaykum! Men UZXIAtreatr AI Mentoriman. AI, dasturlash va texnologiyalar bo\'yicha savollaringizga javob berishga tayyorman.' }
  ];

  // Floating Trigger Button
  const triggerBtn = document.createElement('button');
  triggerBtn.className = 'ai-assistant-trigger-btn';
  triggerBtn.setAttribute('aria-label', 'AI Mentorni ochish');
  triggerBtn.innerHTML = `
    <div class="trigger-icon-pulse">
      <i data-lucide="bot" size="24"></i>
    </div>
    <span class="trigger-label">AI Mentor</span>
  `;

  // Assistant Panel Container
  const panel = document.createElement('div');
  panel.className = 'ai-assistant-panel glass-card';
  panel.setAttribute('aria-hidden', 'true');

  function renderPanelContent() {
    panel.innerHTML = `
      <div class="ai-panel-header">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="ai-avatar">
            <i data-lucide="bot" size="20"></i>
          </div>
          <div>
            <div class="ai-header-title">UZXIAtreatr AI Mentor</div>
            <div class="ai-header-subtitle">Ta'lim va texnologiya bo'yicha yordamchi</div>
          </div>
        </div>
        <button class="ai-panel-close-btn" id="aiPanelCloseBtn" aria-label="Yopish">
          <i data-lucide="x" size="18"></i>
        </button>
      </div>

      <!-- Quick Suggested Prompts -->
      <div class="ai-prompts-bar">
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.4rem;">Tavsiya etilgan savollar:</span>
        <div style="display: flex; gap: 0.4rem; overflow-x: auto; padding-bottom: 0.4rem;" id="suggestedPromptsSlot">
          <button class="prompt-chip" data-prompt="AI nima?">AI nima?</button>
          <button class="prompt-chip" data-prompt="Pythonni qanday boshlash mumkin?">Python o'rganish</button>
          <button class="prompt-chip" data-prompt="Prompt Engineering nima?">Prompt Engineering</button>
          <button class="prompt-chip" data-prompt="Bugun nima o'rganay?">Bugun nima o'rganay?</button>
        </div>
      </div>

      <!-- Conversation Chat Area -->
      <div class="ai-chat-body" id="aiChatBody">
        ${messages.map(msg => `
          <div class="chat-bubble bubble-${msg.sender}">
            <div class="bubble-content">${msg.text}</div>
          </div>
        `).join('')}
        ${isThinking ? `
          <div class="chat-bubble bubble-ai">
            <div class="bubble-content" style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="btn-spinner" style="width: 0.9rem; height: 0.9rem; border-width: 2px;"></span>
              <span>Javob tayyorlanmoqda...</span>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Input Form Bar -->
      <form class="ai-chat-input-bar" id="aiChatForm">
        <input
          type="text"
          id="aiInputText"
          placeholder="Savolingizni yozing..."
          autocomplete="off"
        />
        <button type="submit" class="ai-send-btn" aria-label="Yuborish" ${isThinking ? 'disabled' : ''}>
          <i data-lucide="send" size="16"></i>
        </button>
      </form>
    `;

    const chatBody = panel.querySelector('#aiChatBody');
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;

    const closeBtn = panel.querySelector('#aiPanelCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', togglePanel);

    const form = panel.querySelector('#aiChatForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('#aiInputText');
        const text = input.value.trim();
        if (text && !isThinking) {
          handleSendUserMessage(text);
          input.value = '';
        }
      });
    }

    const promptChips = panel.querySelectorAll('.prompt-chip');
    promptChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const pText = chip.getAttribute('data-prompt');
        if (pText && !isThinking) {
          handleSendUserMessage(pText);
        }
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  async function handleSendUserMessage(userText) {
    messages.push({ sender: 'user', text: userText });
    isThinking = true;
    renderPanelContent();

    try {
      const reply = await aiService.sendMessage(userText);
      messages.push({ sender: 'ai', text: reply });
    } catch (err) {
      messages.push({ sender: 'ai', text: 'Kechirasiz, javob olishda xatolik yuz berdi.' });
    } finally {
      isThinking = false;
      renderPanelContent();
    }
  }

  function togglePanel() {
    isOpen = !isOpen;
    if (isOpen) {
      panel.classList.add('active');
      panel.setAttribute('aria-hidden', 'false');
      triggerBtn.classList.add('open');
      renderPanelContent();
      const input = panel.querySelector('#aiInputText');
      if (input) setTimeout(() => input.focus(), 100);
    } else {
      panel.classList.remove('active');
      panel.setAttribute('aria-hidden', 'true');
      triggerBtn.classList.remove('open');
    }
  }

  triggerBtn.addEventListener('click', togglePanel);

  wrapper.appendChild(triggerBtn);
  wrapper.appendChild(panel);

  return wrapper;
}
