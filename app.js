import { chapters, glossary, knowledge } from './content.js';
import { appendChatMessage, element, icon } from './dom.js';
import { getReply, MAX_QUESTION_LENGTH, searchGlossary, validateQuestion } from './tutor.js';

const byId = (id) => document.getElementById(id);
const MAX_CHAT_MESSAGES = 24;
const tabs = ['summary', 'glossary', 'practice', 'chat'];
const state = {
  chapterId: chapters[0].id,
  tab: 'summary',
  questionIndex: Object.fromEntries(chapters.map((chapter) => [chapter.id, 0])),
  quizAnswers: new Map(),
  context: null,
};

function currentChapter() {
  return chapters.find((chapter) => chapter.id === state.chapterId);
}

function chapterLabel(chapterId) {
  return chapters.find((chapter) => chapter.id === chapterId)?.fullTitle || 'Six-topic revision guide';
}

function lastTopicLabel() {
  const collection = state.context?.type === 'lesson' ? knowledge : glossary;
  return chapterLabel(collection.find((item) => item.id === state.context?.id)?.chapterId);
}

function starterChoices(chapter) {
  return chapter.starters.map((id) => knowledge.find((item) => item.id === id)).map((item) => ({
    label: item.title,
    question: item.questions[0],
  }));
}

function questionButtons(choices) {
  return choices.map((choice) => element('button', {
    type: 'button', className: 'question-chip', text: choice.label, 'data-question': choice.question,
  }));
}

function renderPicker() {
  const nav = byId('chapter-list');
  const select = byId('chapter-select');
  for (const [index, chapter] of chapters.entries()) {
    const number = String(index + 1).padStart(2, '0');
    const image = element('span', { className: 'icon-wrap', 'data-colour': chapter.colour }, icon(chapter.icon));
    const text = element('span', { className: 'chapter-text' }, element('small', { text: `TOPIC ${number}` }), chapter.title);
    const button = element('button', {
      type: 'button', className: 'chapter-button', 'data-chapter': chapter.id,
      'aria-pressed': chapter.id === state.chapterId ? 'true' : 'false',
    }, image, text);
    button.addEventListener('click', () => setChapter(chapter.id));
    nav.append(button);
    select.append(element('option', { value: chapter.id, text: `${number} · ${chapter.title}` }));
  }
  select.addEventListener('change', () => setChapter(select.value));
}

function setChapter(chapterId) {
  if (!chapters.some((chapter) => chapter.id === chapterId)) return;
  state.chapterId = chapterId;
  const chapter = currentChapter();
  byId('chapter-select').value = chapterId;
  for (const button of document.querySelectorAll('[data-chapter]')) button.setAttribute('aria-pressed', String(button.dataset.chapter === chapterId));
  byId('chapter-number').textContent = `Topic ${String(chapters.indexOf(chapter) + 1).padStart(2, '0')} of 06`;
  byId('chapter-title').textContent = chapter.title;
  byId('chapter-intro').textContent = chapter.intro;
  byId('chapter-art').setAttribute('data-colour', chapter.colour);
  byId('chapter-art').replaceChildren(icon(chapter.icon));
  const wordCount = glossary.filter((word) => word.chapterId === chapterId).length;
  byId('glossary-scope').options[0].textContent = `This topic (${wordCount} cards)`;
  byId('glossary-scope').options[1].textContent = 'All six topics (80 cards)';
  renderSummary();
  renderGlossary();
  renderPractice();
  renderStarters();
}

function showTab(tab, focusInput = false) {
  if (!tabs.includes(tab)) return;
  state.tab = tab;
  for (const name of tabs) {
    byId(`panel-${name}`).hidden = name !== tab;
    byId(`tab-${name}`).setAttribute('aria-selected', String(name === tab));
    byId(`tab-${name}`).tabIndex = name === tab ? 0 : -1;
  }
  const tabBar = byId('revision-tabs');
  if (tabBar.getBoundingClientRect().top < 0) tabBar.scrollIntoView({ block: 'start' });
  if (focusInput) byId('chat-input').focus({ preventScroll: false });
}

function renderSummary() {
  const chapter = currentChapter();
  const root = byId('summary-content');
  const heading = element('div', { className: 'section-heading' },
    element('div', {}, element('p', { className: 'eyebrow', text: 'The big ideas, in small steps' }), element('h3', { text: 'In a nutshell' })),
    element('span', { className: 'soft-badge', text: 'Quick guide' }));
  const summary = element('ol', { className: 'summary-list' }, chapter.summary.map((text) => element('li', {}, element('span', { text }))));
  const diagram = element('figure', { className: 'diagram' },
    element('h4', { text: chapter.diagram.title }),
    element('ol', { className: 'diagram-steps', 'aria-label': chapter.diagram.title },
      chapter.diagram.steps.map((text) => element('li', {}, element('span', { text })))),
    element('figcaption', { className: 'diagram-note', text: chapter.diagram.note }));
  const memory = element('div', { className: 'memory-note' },
    element('strong', { text: 'One thing to remember' }), chapter.memory);
  const checklist = element('ul', { className: 'checklist' }, chapter.checklist.map((text) => element('li', { text })));
  const examples = element('div', { className: 'examples-grid' }, chapter.examples.map((item) =>
    element('article', { className: 'example-card' }, element('h4', { text: item.title }), element('p', { text: item.text }))));
  const bottom = element('div', { className: 'summary-bottom' },
    element('h4', { text: 'A question to think about' }),
    element('div', { className: 'question-chips' }, questionButtons(starterChoices(chapter))),
    element('button', { type: 'button', className: 'button summary-practice', 'data-open-tab': 'practice', text: 'Ready? Try some practice →' }));
  root.replaceChildren(heading, summary, diagram, memory,
    element('h3', { className: 'subheading', text: 'My exam checklist' }), checklist,
    element('h3', { className: 'subheading', text: 'Science in everyday life' }), examples, bottom);
}

function renderGlossary() {
  const query = byId('glossary-search').value;
  const allTopics = byId('glossary-scope').value === 'all';
  const chapter = currentChapter();
  const matches = searchGlossary(query, allTopics ? null : chapter.id);
  const scope = allTopics ? 'all six topics' : chapter.title;
  byId('glossary-status').textContent = `${matches.length} ${matches.length === 1 ? 'word card' : 'word cards'} ${query.trim() ? 'matching your search' : 'shown'} · Scope: ${scope}.`;
  const results = byId('glossary-results');
  results.scrollTop = 0;
  if (!matches.length) {
    const empty = element('div', { className: 'empty-state' },
      element('h4', { text: 'No word cards here yet' }),
      element('p', { text: allTopics ? 'Try another spelling, a shorter word, or clear your search. This guide covers only the six topics listed.' : 'Try another spelling, clear the search, or look across all six topics.' }));
    if (!allTopics) {
      const button = element('button', { type: 'button', className: 'button', text: 'Search all six topics' });
      button.addEventListener('click', () => { byId('glossary-scope').value = 'all'; renderGlossary(); });
      empty.append(button);
    }
    results.replaceChildren(empty);
    return;
  }
  results.replaceChildren(...matches.map((word) => element('article', { className: 'word-card', 'data-word-id': word.id },
    element('div', { className: 'word-card-heading' },
      element('h4', { text: word.term }), element('span', { className: 'source-label', text: chapterLabel(word.chapterId) })),
    element('p', { className: 'word-definition', text: word.definition }),
    element('p', { className: 'word-example', text: `Everyday connection: ${word.example}` }),
    element('button', { type: 'button', className: 'button button-quiet', text: word.parts.length ? 'Ask Buddy about these words ↗' : 'Ask Buddy about this word ↗', 'data-question': `Explain ${word.term}` }))));
}

function renderPractice() {
  const chapter = currentChapter();
  const index = state.questionIndex[chapter.id];
  const question = chapter.mcqs[index];
  const saved = state.quizAnswers.get(question.id);
  const tried = chapter.mcqs.filter((item) => state.quizAnswers.get(item.id)?.tried).length;
  byId('practice-progress').textContent = `${tried} of ${chapter.mcqs.length} tried`;
  const form = element('form', { id: 'mcq-form', novalidate: '' });
  const fieldset = element('fieldset', { className: 'quiz-fieldset' }, element('legend', { text: question.question }));
  const options = element('div', { className: 'answer-options' });
  for (const [optionIndex, text] of question.options.entries()) {
    const input = element('input', { type: 'radio', name: 'answer', value: optionIndex, id: `${question.id}-option-${optionIndex}` });
    if (saved?.selected === optionIndex) input.checked = true;
    input.addEventListener('change', () => {
      state.quizAnswers.set(question.id, { selected: optionIndex, checked: false, tried: state.quizAnswers.get(question.id)?.tried || false });
      feedback.hidden = true;
      status.textContent = '';
    });
    options.append(element('label', { className: 'answer-option', for: input.id }, input, element('span', { text })));
  }
  fieldset.append(options);
  const status = element('p', { className: 'form-feedback', id: 'quiz-status', role: 'status', 'aria-live': 'polite' });
  const feedback = element('div', { id: 'quiz-feedback', className: 'quiz-feedback', role: 'status', 'aria-live': 'polite', hidden: true });
  const actions = element('div', { className: 'quiz-actions' }, element('button', { type: 'submit', className: 'button button-primary', text: 'Check answer' }));
  const move = element('div', { className: 'quiz-move' });
  for (const [direction, label] of [[-1, '← Back'], [1, index === chapter.mcqs.length - 1 ? 'Start again ↻' : 'Next →']]) {
    const button = element('button', { type: 'button', className: 'button', text: label, disabled: direction === -1 && index === 0 });
    button.addEventListener('click', () => {
      state.questionIndex[chapter.id] = (index + direction + chapter.mcqs.length) % chapter.mcqs.length;
      renderPractice();
      byId('mcq-form').querySelector('input').focus({ preventScroll: true });
    });
    move.append(button);
  }
  actions.append(move);
  form.append(fieldset, actions, status, feedback);
  function showFeedback(selection) {
    const correct = selection === question.correct;
    feedback.setAttribute('data-correct', String(correct));
    feedback.replaceChildren(element('strong', { text: correct ? 'That’s right. Here’s why:' : `Good try. The answer is “${question.options[question.correct]}”.` }),
      element('p', { text: question.explanation }));
    feedback.hidden = false;
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const chosen = form.querySelector('input:checked');
    if (!chosen) {
      status.textContent = 'Choose one answer first, then we can check it together.';
      form.querySelector('input').focus({ preventScroll: true });
      return;
    }
    const selected = Number(chosen.value);
    state.quizAnswers.set(question.id, { selected, checked: true, tried: true });
    status.textContent = '';
    showFeedback(selected);
    byId('practice-progress').textContent = `${chapter.mcqs.filter((item) => state.quizAnswers.get(item.id)?.tried).length} of ${chapter.mcqs.length} tried`;
  });
  byId('mcq-area').replaceChildren(element('p', { className: 'question-number', text: `Question ${index + 1} of ${chapter.mcqs.length}` }), form);
  if (saved?.checked) showFeedback(saved.selected);
  byId('short-answer-list').replaceChildren(...chapter.shortAnswers.map((item, answerIndex) =>
    element('article', { className: 'short-answer' },
      element('h4', { text: `${answerIndex + 1}. ${item.question}` }),
      element('details', {}, element('summary', { text: 'Show a model answer' }), element('p', { className: 'model-answer', text: item.answer })))));
}

function renderStarters() {
  const chapter = currentChapter();
  byId('starter-topic').textContent = chapter.title;
  byId('chat-starters').replaceChildren(...questionButtons(starterChoices(chapter)));
}

function trimChat() {
  const log = byId('chat-log');
  while (log.children.length > MAX_CHAT_MESSAGES) log.firstElementChild.remove();
  log.scrollTop = log.scrollHeight;
}

function sendQuestion(question) {
  const validation = validateQuestion(question);
  const input = byId('chat-input');
  if (!validation.valid) {
    byId('chat-error').textContent = validation.message;
    input.setAttribute('aria-invalid', 'true');
    input.focus({ preventScroll: true });
    return;
  }
  byId('chat-error').textContent = '';
  input.removeAttribute('aria-invalid');
  appendChatMessage(byId('chat-log'), 'user', '', validation.value);
  const reply = getReply(validation.value, state.context, state.chapterId);
  state.context = reply.context;
  const sources = reply.chapterIds.length ? reply.chapterIds.map(chapterLabel)
    : [reply.kind === 'safety' ? 'Safety first · ask a trusted adult' : 'Six-topic revision guide'];
  appendChatMessage(byId('chat-log'), 'buddy', reply.title, reply.text, sources, reply.choices);
  trimChat();
  byId('chat-context').textContent = state.context
    ? `Follow up on the last explained topic · ${lastTopicLabel()}:`
    : 'Pick a topic first, then try a follow-up:';
  input.value = '';
  byId('chat-char-count').textContent = `0 / ${MAX_QUESTION_LENGTH}`;
}

function clearChat(announce = false) {
  state.context = null;
  byId('chat-log').replaceChildren();
  appendChatMessage(byId('chat-log'), 'buddy', 'Hello! Let’s make revision feel smaller.',
    'Choose a starter question, or ask a science word from this guide. I can explain a topic, give an example, or help with a difference. If I am not sure, I will say so.',
    ['Six-topic revision guide']);
  byId('chat-input').value = '';
  byId('chat-input').removeAttribute('aria-invalid');
  byId('chat-error').textContent = '';
  byId('chat-context').textContent = 'After choosing a topic, you can ask:';
  byId('chat-char-count').textContent = `0 / ${MAX_QUESTION_LENGTH}`;
  if (announce) {
    byId('chat-status').textContent = 'Chat cleared. No questions have been saved.';
    byId('chat-input').focus({ preventScroll: true });
  }
}

renderPicker();
setChapter(state.chapterId);
clearChat();

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const ask = event.target.closest('[data-question]');
  if (ask) {
    showTab('chat');
    sendQuestion(ask.dataset.question);
    byId('chat-input').focus({ preventScroll: true });
    return;
  }
  const open = event.target.closest('[data-open-tab]');
  if (open) showTab(open.dataset.openTab, open.dataset.openTab === 'chat');
});

for (const tab of tabs) byId(`tab-${tab}`).addEventListener('click', () => showTab(tab));
byId('revision-tabs').addEventListener('keydown', (event) => {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const focusedTab = event.target instanceof Element ? event.target.closest('[data-tab]')?.dataset.tab : null;
  let index = tabs.indexOf(focusedTab || state.tab);
  if (event.key === 'Home') index = 0;
  else if (event.key === 'End') index = tabs.length - 1;
  else index = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  showTab(tabs[index]);
  byId(`tab-${tabs[index]}`).focus({ preventScroll: true });
});
byId('glossary-search').addEventListener('input', renderGlossary);
byId('glossary-scope').addEventListener('change', renderGlossary);
byId('chat-form').addEventListener('submit', (event) => { event.preventDefault(); sendQuestion(byId('chat-input').value); });
byId('chat-input').addEventListener('input', () => {
  byId('chat-char-count').textContent = `${byId('chat-input').value.length} / ${MAX_QUESTION_LENGTH}`;
  byId('chat-error').textContent = '';
  byId('chat-input').removeAttribute('aria-invalid');
});
byId('chat-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    sendQuestion(byId('chat-input').value);
  }
});
byId('clear-chat').addEventListener('click', () => clearChat(true));
