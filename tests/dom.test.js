import test from 'node:test';
import assert from 'node:assert/strict';
import { appendChatMessage } from '../dom.js';

class FakeNode {
  constructor(tag) {
    this.tag = tag;
    this.children = [];
    this.attributes = {};
  }
  setAttribute(name, value) { this.attributes[name] = value; }
  append(...children) { this.children.push(...children); }
  set textContent(value) { this.children = [{ text: value }]; }
  set innerHTML(_) { throw new Error('Dynamic HTML must not be used'); }
}

test('chat renders untrusted questions as text, never as HTML', () => {
  const previous = globalThis.document;
  globalThis.document = {
    createElement: (tag) => new FakeNode(tag),
    createTextNode: (text) => ({ text }),
  };
  try {
    const container = new FakeNode('div');
    const payload = '<img src=x onerror="globalThis.hacked=true"><script>alert(1)</script>';
    const message = appendChatMessage(container, 'user', '', payload);
    assert.equal(container.children[0], message);
    assert.equal(message.children[1].children[0].text, payload);
    assert.equal(message.children[1].tag, 'p');
    assert.ok(!message.children.some((node) => node.tag === 'script' || node.tag === 'img'));
  } finally {
    globalThis.document = previous;
  }
});
