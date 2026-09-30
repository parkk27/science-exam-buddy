export function element(tag, attributes = {}, ...children) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attributes)) {
    if (value === null || value === undefined || value === false) continue;
    if (name === 'className') node.className = value;
    else if (name === 'text') node.textContent = value;
    else if (name === 'disabled' || name === 'hidden') node[name] = Boolean(value);
    else node.setAttribute(name, String(value));
  }
  for (const child of children.flat()) {
    if (child === null || child === undefined) continue;
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

export function icon(name, className = 'topic-icon') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('viewBox', '0 0 48 48');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#icon-${name}`);
  svg.append(use);
  return svg;
}

export function appendChatMessage(container, speaker, title, text, sources = [], choices = []) {
  const article = element('article', { className: `message message-${speaker}`, 'aria-label': speaker === 'user' ? 'Your question' : 'Buddy’s answer' });
  article.append(element('p', { className: 'message-label', text: speaker === 'user' ? 'You asked' : 'Buddy' }));
  if (title) article.append(element('h4', { text: title }));
  for (const paragraph of text.split('\n\n')) article.append(element('p', { className: 'message-text', text: paragraph }));
  if (speaker === 'buddy') {
    article.append(element('div', { className: 'message-sources' }, sources.map((source) =>
      element('span', { className: 'source-label', text: source }))));
    if (choices.length) {
      const list = element('div', { className: 'message-choices', 'aria-label': 'Suggested questions' });
      for (const choice of choices) {
        list.append(element('button', { type: 'button', className: 'question-chip', text: choice.label, 'data-question': choice.question }));
      }
      article.append(list);
    }
  }
  container.append(article);
  return article;
}
