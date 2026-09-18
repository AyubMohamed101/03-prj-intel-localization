const cards = [...document.querySelectorAll('.timeline-card')];
const range = document.querySelector('#timeline-scroll');
const position = document.querySelector('#timeline-position');
const status = document.querySelector('#timeline-status');
const previous = document.querySelector('#previous-card');
const next = document.querySelector('#next-card');
let activeIndex = 0;

function moveTo(index, shouldFocus = false) {
  activeIndex = Math.max(0, Math.min(index, cards.length - 1));
  const card = cards[activeIndex];
  range.value = activeIndex;
  position.textContent = String(activeIndex + 1).padStart(2, '0');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  status.textContent = `المحطة ${activeIndex + 1}: ${card.dataset.year}`;
  if (shouldFocus) card.focus({ preventScroll: true });
}

range.addEventListener('input', (event) => moveTo(Number(event.target.value)));
previous.addEventListener('click', () => moveTo(activeIndex - 1, true));
next.addEventListener('click', () => moveTo(activeIndex + 1, true));

cards.forEach((card, index) => {
  card.addEventListener('focus', () => moveTo(index));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveTo(activeIndex + (event.key === 'ArrowLeft' ? 1 : -1), true);
    }
  });
});

document.querySelector('#subscribe-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email');
  const feedback = document.querySelector('#form-feedback');

  if (!email.checkValidity()) {
    feedback.textContent = currentLanguage === 'en' ? 'Enter a valid email address.' : 'أدخل بريداً إلكترونياً صحيحاً.';
    email.focus();
    return;
  }

  feedback.textContent = currentLanguage === 'en' ? 'You are subscribed. See you soon.' : 'تم التسجيل. نراك قريباً.';
  event.target.reset();
});

const languageToggle = document.querySelector('#language-toggle');
const translatableElements = [...document.querySelectorAll('[data-i18n]')];
const arabicValues = new Map(translatableElements.map((element) => [element.dataset.i18n, element.innerHTML]));
const englishValues = {
  timelineNav: 'Timeline', newsletterNav: 'Newsletter', eyebrow: 'Silicon memory',
  heroTitle: 'From a tiny chip<br><span>to a global impact.</span>',
  heroLede: "Intel's journey from a Santa Clara startup to one of the world's most influential technology companies.",
  heroCta: 'Explore the journey <span aria-hidden="true">→</span>', years: 'years of innovation', milestones: 'key milestones', future: 'the future ahead',
  timelineEyebrow: '01 / Timeline', timelineTitle: 'Every leap begins<br><em>with an idea.</em>',
  timelineNote: "Explore the moments that reshaped computing, from the first microprocessor to Intel's bet on the future.",
  insightsEyebrow: '02 / Inside the journey', insightsTitle: 'Ideas that made<br><em>the difference.</em>',
  insightsNote: 'Three themes that show how Intel grew from a chip company into a global technology force.',
  insight1Title: 'Engineering first', insight1Text: 'Every major leap began as a small idea that could be built and tested.',
  insight2Title: 'A wider impact', insight2Text: 'Real innovation measures its impact on people and the planet, not speed alone.',
  insight3Title: 'The future is open', insight3Text: 'Every new chapter gives Intel a chance to redefine what comes next.',
  card1Title: 'Intel is founded', card1Text: 'Robert Noyce and Gordon Moore leave Fairchild to start a new company; Andy Grove joins soon after.',
  card2Title: 'The first microprocessor', card2Text: 'The 4004 packs 2,300 transistors and launches the microprocessor era.', card3Title: 'x86 is born', card3Text: 'The 8086 design becomes the foundation of personal computing for decades.',
  card4Title: 'Pentium arrives', card4Text: 'The “Intel Inside” campaign turns a chip into a household name.', card5Title: 'The multi-core era', card5Text: 'Intel shifts from the clock-speed race to the power of multiple cores on one chip.',
  card6Title: 'RISE 2030 launches', card6Text: 'Ambitious water, energy, and waste goals chart a more sustainable course.', card7Title: 'The IDM 2.0 bet', card7Text: "Pat Gelsinger puts Intel's future on a path to manufacture chips for others.",
  card8Title: 'The Ohio fab', card8Text: 'A $20 billion factory complex breaks ground as manufacturing returns to center stage.', card9Title: 'Gelsinger exits', card9Text: 'After a falling stock and stalled turnaround, the board pushes the CEO out.',
  card10Title: 'Betting on a comeback', card10Text: 'New investment and newer chips give Intel a chance to prove its relevance again.',
  subscribeEyebrow: '03 / Stay in the loop', subscribeTitle: 'The future waits for no one.', subscribeText: 'Get the technology and innovation stories worth your time, once a month.',
  emailLabel: 'Your email address', subscribeButton: 'Subscribe now <span aria-hidden="true">→</span>', footerText: 'Designed for Arabic and English.'
};
let currentLanguage = 'ar';

function detectLanguage() {
  const browserLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  return browserLanguage.toLowerCase().startsWith('ar') ? 'ar' : 'en';
}

function syncBrowserTranslationDirection() {
  const root = document.documentElement;
  const rootClass = String(root.className);
  const bodyClass = document.body ? String(document.body.className) : '';
  const translatedToArabic = /translated-rtl/i.test(`${rootClass} ${bodyClass}`);
  const translatedToEnglish = /translated-ltr/i.test(`${rootClass} ${bodyClass}`);
  const language = (root.getAttribute('lang') || '').toLowerCase();
  const direction = translatedToArabic || (!translatedToEnglish && language.startsWith('ar')) ? 'rtl' : 'ltr';

  if (root.dir !== direction) root.dir = direction;
  if (document.body && document.body.dir !== direction) document.body.dir = direction;
}

function setLanguage(language) {
  currentLanguage = language;
  const isEnglish = language === 'en';
  document.documentElement.lang = language;
  document.documentElement.dir = isEnglish ? 'ltr' : 'rtl';
  document.title = isEnglish ? 'Intel Journey | 1968–2026' : 'رحلة إنتل | 1968–2026';
  languageToggle.textContent = isEnglish ? 'عربي' : 'EN';
  languageToggle.setAttribute('aria-label', isEnglish ? 'التبديل إلى العربية' : 'Switch to English');
  document.querySelector('nav').setAttribute('aria-label', isEnglish ? 'Main navigation' : 'التنقل الرئيسي');
  document.querySelector('.hero-stats').setAttribute('aria-label', isEnglish ? 'Quick facts' : 'حقائق سريعة');
  document.querySelector('.timeline-scroller').setAttribute('aria-label', isEnglish ? 'Intel historical milestones' : 'محطات إنتل التاريخية');
  document.querySelector('#previous-card').setAttribute('aria-label', isEnglish ? 'Previous milestone' : 'المحطة السابقة');
  document.querySelector('#next-card').setAttribute('aria-label', isEnglish ? 'Next milestone' : 'المحطة التالية');
  document.querySelector('#timeline-scroll').setAttribute('aria-label', isEnglish ? 'Navigate milestones' : 'التنقل بين المحطات');
  translatableElements.forEach((element) => {
    element.innerHTML = isEnglish ? englishValues[element.dataset.i18n] : arabicValues.get(element.dataset.i18n);
  });
  status.textContent = `${isEnglish ? 'Milestone' : 'المحطة'} ${activeIndex + 1}: ${cards[activeIndex].dataset.year}`;
}

const translationObserver = new MutationObserver(syncBrowserTranslationDirection);
translationObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class', 'dir', 'lang']
});
if (document.body) {
  translationObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['class', 'dir', 'lang']
  });
}

languageToggle.addEventListener('click', () => setLanguage(currentLanguage === 'ar' ? 'en' : 'ar'));
setLanguage(detectLanguage());
syncBrowserTranslationDirection();
moveTo(0);

