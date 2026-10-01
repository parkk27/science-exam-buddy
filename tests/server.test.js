import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createAppServer } from '../server.js';

test('static app works at both root and Pages subpath without exposing other files', async () => {
  const server = createAppServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    for (const path of ['/', '/science-exam-buddy/']) {
      const response = await fetch(`${base}${path}`);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.match(html, /src="\.\/app\.js"/);
      assert.match(html, /href="\.\/styles\.css"/);
      assert.match(html, /connect-src 'none'/);
    }
    for (const path of ['/app.js', '/science-exam-buddy/content.js', '/science-exam-buddy/content-helpers.js', '/science-exam-buddy/extra-content.js', '/science-exam-buddy/food-content.js', '/science-exam-buddy/vocabulary.js', '/science-exam-buddy/word-requests.js', '/science-exam-buddy/assets/buddy.svg']) {
      const response = await fetch(`${base}${path}`);
      assert.equal(response.status, 200);
      assert.ok(response.headers.get('content-type').includes(path.endsWith('.svg') ? 'image/svg+xml' : 'javascript'));
    }
    for (const path of ['/.git/config', '/README.md', '/tests/tutor.test.js', '/science-exam-buddy/%2e%2e%5cREADME.md']) {
      assert.equal((await fetch(`${base}${path}`)).status, 404);
    }
    assert.equal((await fetch(`${base}/`, { method: 'POST' })).status, 405);
    const head = await fetch(`${base}/science-exam-buddy/`, { method: 'HEAD' });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), '');
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
