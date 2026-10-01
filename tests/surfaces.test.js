import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chapters, stats } from '../content.js';

test('all topic icons and dynamic count anchors exist, without stale scope copy', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const app = await readFile(new URL('../app.js', import.meta.url), 'utf8');
  for (const chapter of chapters) assert.ok(html.includes(`id="icon-${chapter.icon}"`), chapter.id);
  for (const id of ['topic-count', 'glossary-total', 'scope-footer', 'coverage-detail']) {
    assert.ok(html.includes(`id="${id}"`));
    assert.ok(app.includes(`byId('${id}')`));
  }
  assert.doesNotMatch(`${html}\n${app}`, /(?:six|Six)-?topic|[Aa]ll six topics|80 word cards|of 06/);
  assert.ok(app.includes('stats.topics'));
  assert.ok(app.includes('stats.glossaryCards'));
  assert.equal(stats.topics, 14);
  assert.match(html, /id="chapter-title">Food</);
  assert.match(html, /id="chapter-number"[^>]*>Topic 01 of 14</);
  assert.match(app, /chapterId: DEFAULT_CHAPTER_ID/);
  assert.match(html, /placeholder="Try: Why do we need food\?"/);
  assert.match(app, /byId\('chat-input'\)\.placeholder/);
});

test('browser modules have no question networking, persistent storage, or dynamic HTML', async () => {
  for (const file of ['app.js', 'dom.js', 'tutor.js', 'content.js', 'extra-content.js', 'food-content.js', 'content-helpers.js']) {
    const code = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.doesNotMatch(code, /\b(?:fetch|XMLHttpRequest|WebSocket|localStorage|sessionStorage|indexedDB)\b|document\.cookie|\.innerHTML/, file);
  }
  const tutor = await readFile(new URL('../tutor.js', import.meta.url), 'utf8');
  assert.doesNotMatch(tutor, /(?:phraseIndex|questionIndex|glossaryIndex)\.set\(\s*(?:query|value|validated\.value)/);
});

test('README totals and current scoped personal-copy authorization are explicit', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  for (const phrase of ['14 supplied topic guides', '198 unique glossary cards', '84 MCQs and 56 short-answer prompts', '105 curated explanations and 443 question phrasings']) {
    assert.ok(readme.includes(phrase), phrase);
  }
  assert.match(readme, /explicitly authorized one completed, validated 14-topic/);
  assert.match(readme, /does \*\*not\*\* authorize automatic future synchronization/);
  assert.match(readme, /publication coordinator owns the exact personal copy/);
  assert.match(readme, /must remain private/);
});

test('the supplied eight-line historical changelog is preserved without a new hosting claim', async () => {
  const changelog = await readFile(new URL('../CHANGELOG.md', import.meta.url), 'utf8');
  const expected = "# Changelog\n\n## 2026-09-30 \u2014 Science Buddy Replit edition\n\n- Added a Replit-hosted React/Vite presentation of Science Buddy with six Class 4 science guides, 80 glossary cards, practice questions, and a local deterministic tutor.\n- The Replit edition has no accounts, analytics, external AI requests, or saved chat/practice history; session state clears on reload.\n- This repository's standalone GitHub Pages app and hosting files are unchanged.\n- Replit publishing is pending; add the production URL once available.\n";
  assert.equal(changelog.replace(/\r\n/g, '\n'), expected);
});
