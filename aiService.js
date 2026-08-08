import { api } from './api.js';

export const aiService = {
  async sendMessage(prompt) {
    try {
      const response = await api.post('/ai/chat', { prompt });
      return response.reply;
    } catch (e) {
      console.warn('[aiService.sendMessage] API offline. Generating intelligent fallback response:', e.message);
      return generateOfflineAIResponse(prompt);
    }
  },
};

function generateOfflineAIResponse(input) {
  const text = input.toLowerCase();

  if (text.includes('ai') && text.includes('nima')) {
    return "Sun'iy intellekt (AI) — bu kompyuter yoki neyron tarmoqlarning inson intellektiga xos bo'lgan mantiqiy fikrlash, o'rganish va xulosa chiqarish qobiliyatidir. U mashinali o'rgatish (Machine Learning) hamda chuqur o'rgatish (Deep Learning) orqali rivojlanadi.";
  }

  if (text.includes('python')) {
    return "Python — sun'iy intellekt va ma'lumotlar tahlilidagi eng mashhur til. Uni o'rganish uchun: 1) Sintaksis va o'zgaruvchilarni, 2) Funksiyalar va OOP tamoyillarini, 3) NumPy, Pandas va PyTorch kutubxonalarini o'rganishni tavsiya etaman.";
  }

  if (text.includes('prompt')) {
    return "Prompt Engineering — AI modellariga (ChatGPT, Claude, Gemini) to'g'ri, aniq va kontekstga ega ko'rsatma berish san'atidir. Yaxshi prompt yozish uchun: Rol (Role), Kontekst (Context), Topshiriq (Task) va Format (Format)ni ko'rsatish lozim.";
  }

  if (text.includes('bugun') || text.includes('nima') || text.includes('tavsiya')) {
    return "Bugungi kun uchun tavsiyam: AI Akademiya bo'limidagi 'AI va Neyron Tarmoqlar Asoslari' modulini o'rganing hamda Interaktiv Zonadagi Mini-Viktorinada bilimingizni sinab ko'ring!";
  }

  return `Tashakkur! "${input}" savolingiz bo'yicha tavsiya: UZXIAtreatr AI Akademiyasida ushbu yo'nalishga oid maxsus o'quv modullari va interaktiv darsliklar mavjud. Qo'shimcha ma'lumot uchun Kurslar katalogiga o'tishingiz mumkin.`;
}
