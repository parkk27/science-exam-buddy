import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters, glossary, knowledge, stats, topicIdsFor } from '../content.js';
import { getReply, normalizeQuery, searchGlossary } from '../tutor.js';
import { childWordQuestions, expectedVocabulary } from './expected-vocabulary.js';

test('an independent 505-term source corpus covers all 14 topics and 5,814 child questions', () => {
  assert.deepEqual(Object.keys(expectedVocabulary), chapters.map((chapter) => chapter.id));
  let terms = 0;
  let questions = 0;
  for (const [topic, items] of Object.entries(expectedVocabulary)) {
    for (const item of items) {
      terms++;
      const card = glossary.find((word) => word.id === item.cardId);
      assert.ok(card, `${topic}: missing ${item.term}`);
      assert.ok(topicIdsFor(card).includes(topic), `${item.term}: missing topic membership`);
      assert.ok(searchGlossary(item.term, topic).some((word) => word.id === card.id), `${item.term}: missing search name`);
      for (const name of [item.term, ...item.aliases]) {
        for (const phrasing of childWordQuestions) {
          questions++;
          const question = phrasing(name);
          const reply = getReply(question, null, topic === 'food' ? 'space' : 'food');
          assert.equal(reply.kind, 'answer', `${topic}: ${question}`);
          assert.ok([item.cardId, ...item.lessonIds].includes(reply.context.id), `${question}: wrong concept ${reply.context.id}`);
          assert.ok(reply.chapterIds.includes(topic), `${question}: wrong source ${reply.chapterIds}`);
          assert.match(reply.text, new RegExp(item.idea.source, 'i'), `${question}: missing essential meaning`);
          assert.match(reply.text, /Example:/, `${question}: needs an everyday connection`);
          assert.doesNotMatch(reply.text, /outside (?:the )?(?:guide|syllabus)|not part of (?:the )?curriculum/i);
        }
      }
    }
  }
  assert.equal(terms, 505);
  assert.equal(questions, 5814);
});

test('each expected word has meaningful simple, more, and example follow-ups', () => {
  for (const [topic, items] of Object.entries(expectedVocabulary)) {
    for (const item of items) {
      const initial = getReply(`What is meant by ${item.term}?`, null, 'food');
      for (const question of ['Tell me more', 'Give an example', 'Explain it more simply']) {
        const reply = getReply(question, initial.context, 'space');
        assert.equal(reply.kind, 'answer', `${item.term}: ${question}`);
        assert.deepEqual(reply.chapterIds, initial.chapterIds, item.term);
        assert.equal(reply.context.id, initial.context.id, item.term);
        assert.ok(reply.text.length >= 15, item.term);
      }
      assert.ok(initial.chapterIds.includes(topic), item.term);
    }
  }
});

test('pedogenesis and declared child typos explain the confirmed soil concept', () => {
  for (const topic of ['soil', 'food', 'space']) {
    for (const question of ['pedogenesis', 'What is pedogenesis?', 'What is meant by pedogenesis?', 'edogenesis', 'What does pedogenisis mean?']) {
      const reply = getReply(question, null, topic);
      assert.equal(reply.kind, 'answer', question);
      assert.equal(reply.context.id, 'pedogenesis');
      assert.deepEqual(reply.chapterIds, ['soil']);
      assert.match(reply.text, /soil/i);
      assert.match(reply.text, /Example:/);
      if (/\b(?:edogenesis|pedogenisis)\b/.test(question)) {
        assert.match(reply.text, /Did you mean "pedogenesis"/);
      }
    }
  }
  assert.equal(searchGlossary('edogenesis', 'soil')[0].id, 'pedogenesis');
  assert.match(getReply('Compare pedogenesis and weathering').text, /one part/);
  assert.match(getReply('Compare pedogenesis and erosion').text, /removes|carries/);
});

test('neutral hazardous and health vocabulary is explained; requests for actions stay blocked', () => {
  for (const term of ['iodine', 'spirit', 'mothballs', 'scissors', 'knife', 'boiling', 'heating', 'chlorine', 'chlorination', 'electricity', 'food poisoning', 'ringworm', 'pain', 'poisoning']) {
    for (const phrase of childWordQuestions) {
      const reply = getReply(phrase(term));
      assert.equal(reply.kind, 'answer', phrase(term));
      assert.match(reply.text, /Example:/);
    }
  }
  for (const question of [
    'How do I heat a leaf in spirit?', 'Can I test starch with iodine?', 'How much chlorine should I add?',
    'What should I take for food poisoning?', 'I have ringworm, how do I cure it?', 'My tooth hurts',
    'Can I cut a leaf with a knife?', 'How do I make an electrical circuit?', 'How do I look directly at the Sun?',
    'How do I make pickles at home?', 'Can I handle mothballs?', 'How do I draw blood?',
    'Explain iodine and how to mix chemicals', 'I do not understand which medicine to take', 'How do I do brain surgery?',
  ]) {
    const reply = getReply(question);
    assert.equal(reply.kind, 'safety', question);
    assert.match(reply.text, /adult/i);
    assert.equal(reply.context, null);
  }
});

test('word boundaries, conservative suggestions, and unknown language never invent coverage', () => {
  assert.equal(getReply('What is a brain?').context.id, 'nerve-brain');
  assert.equal(getReply('What is rain?').context.id, 'dew-rain-snow');
  assert.equal(getReply('What is revolution?').context.id, 'rotation-revolution');
  assert.equal(getReply('What is evolution?').context.id, 'evolution');
  for (const question of ['What is pedogenesis on Mars?', 'Why is wool radioactive?', 'Explain brain electricity', 'Can plants grow on Mars?', 'What is quantum teleportation?', 'Explain chlorophyll and a dragon']) {
    const reply = getReply(question);
    assert.equal(reply.kind, 'unknown', question);
    assert.match(reply.text, /could not match/);
    assert.doesNotMatch(reply.text, /outside|syllabus|curriculum|teacher|textbook/i);
    assert.ok(reply.choices.length >= 2);
  }
  const suggestion = getReply('What is photosynthsis?');
  assert.equal(suggestion.kind, 'clarify');
  assert.match(suggestion.text, /Did you mean/);
  assert.ok(suggestion.choices.some((choice) => normalizeQuery(choice.question).includes('photosynthesis')));
  for (const question of ['Can you explain fibre for me?', 'I do not understand vein', 'What is meant by root?', 'Define minerals', 'What does pulp mean?', 'spine', 'gum', 'decay']) {
    const reply = getReply(question);
    assert.equal(reply.kind, 'clarify', question);
    assert.ok(reply.choices.length >= 2, question);
    for (const choice of reply.choices) assert.equal(getReply(choice.question).kind, 'answer', choice.question);
  }
});
