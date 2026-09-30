import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters, comparisons, glossary, knowledge } from '../content.js';
import { normalizeQuery } from '../tutor.js';

test('all six chapters are complete, with original quizzes and model answers', () => {
  assert.deepEqual(chapters.map((item) => item.id), ['digestion', 'clothes', 'matter', 'soil', 'green-plants', 'survival']);
  const ids = new Set();
  for (const chapter of chapters) {
    assert.ok(chapter.summary.length >= 3);
    assert.ok(chapter.summary.every((text) => text.length > 40));
    assert.ok(chapter.checklist.length >= 4);
    assert.ok(chapter.examples.length >= 3);
    assert.ok(chapter.diagram.steps.length >= 3);
    assert.ok(chapter.mcqs.length >= 5);
    assert.ok(chapter.shortAnswers.length >= 3);
    assert.ok(glossary.filter((word) => word.chapterId === chapter.id).length >= 8);
    for (const question of chapter.mcqs) {
      assert.ok(!ids.has(question.id), `Duplicate question: ${question.id}`);
      ids.add(question.id);
      assert.equal(question.options.length, 4);
      assert.equal(new Set(question.options).size, 4);
      assert.ok(Number.isInteger(question.correct));
      assert.ok(question.correct >= 0 && question.correct < question.options.length);
      assert.ok(question.explanation.length > 35);
    }
    for (const question of chapter.shortAnswers) {
      assert.ok(!ids.has(question.id));
      ids.add(question.id);
      assert.ok(question.question.length > 15);
      assert.ok(question.answer.length > 45);
    }
  }
  assert.equal(chapters.reduce((count, chapter) => count + chapter.mcqs.length, 0), 36);
  assert.equal(chapters.reduce((count, chapter) => count + chapter.shortAnswers.length, 0), 24);
});

test('80 unique glossary cards cover all required terms, including grouped terms', () => {
  assert.equal(glossary.length, 80);
  assert.equal(new Set(glossary.map((word) => word.id)).size, glossary.length);
  const covered = new Set(glossary.flatMap((word) =>
    [word.term, ...word.aliases, ...word.parts.flatMap((part) => [part.term, ...part.aliases])]).map(normalizeQuery));
  const required = [
    'digestion', 'nutrients', 'saliva', 'oesophagus', 'stomach', 'small intestine', 'large intestine',
    'liver', 'anus', 'incisors', 'canines', 'premolars', 'molars', 'enamel', 'dentine', 'pulp',
    'crown', 'root', 'plaque', 'microbes', 'microscope', 'bacteria', 'fungi', 'protozoa', 'virus',
    'fibre', 'yarn', 'fabric', 'weaving', 'knitting', 'natural fibre', 'synthetic fibre',
    'linen', 'wool', 'silk', 'waterproof', 'matter', 'mass', 'particle', 'solid', 'liquid',
    'gas', 'fluid', 'melting', 'evaporation', 'condensation', 'freezing', 'solidification',
    'solute', 'solvent', 'solution', 'soluble', 'insoluble', 'filtration', 'sedimentation', 'decantation',
    'soil', 'weathering', 'humus', 'minerals', 'sand', 'silt', 'clay', 'sandy soil', 'clayey soil',
    'loamy soil', 'soil profile', 'topsoil', 'subsoil', 'bedrock', 'erosion', 'conservation',
    'leaf blade', 'vein', 'chlorophyll', 'stomata', 'photosynthesis', 'carbon dioxide', 'oxygen',
    'glucose', 'starch', 'respiration', 'producer', 'food chain', 'interdependence', 'adaptation',
    'habitat', 'terrestrial', 'aquatic', 'evergreen', 'deciduous', 'desert', 'swamp', 'breathing roots',
    'floating plant', 'fixed aquatic plant', 'underwater plant', 'insectivorous plant',
    'non-green plant', 'saprophyte', 'coir',
  ];
  for (const term of required) assert.ok(covered.has(normalizeQuery(term)), `Missing glossary term: ${term}`);
  for (const word of glossary) {
    assert.ok(chapters.some((chapter) => chapter.id === word.chapterId));
    assert.ok(word.definition.length > 30);
    assert.ok(word.example.length > 15);
  }
});

test('every starter, lesson, and comparison points to a real source', () => {
  const ids = new Set(knowledge.map((item) => item.id));
  assert.equal(ids.size, knowledge.length);
  for (const chapter of chapters) {
    for (const id of chapter.starters) assert.ok(ids.has(id));
  }
  for (const item of knowledge) {
    assert.ok(chapters.some((chapter) => chapter.id === item.chapterId));
    assert.ok(item.questions.length >= 3);
    assert.ok(item.subjects.length >= 2);
    for (const field of ['answer', 'simple', 'more', 'example']) assert.ok(item[field].length > 20, `${item.id}.${field}`);
  }
  for (const comparison of comparisons) assert.ok(ids.has(comparison.lessonId));
});

test('scientific guardrails are stated explicitly in the original material', () => {
  const foodRoute = chapters[0].diagram.steps;
  assert.deepEqual(foodRoute, ['Mouth', 'Oesophagus', 'Stomach', 'Small intestine', 'Large intestine', 'Anus']);
  assert.match(knowledge.find((item) => item.id === 'filter-limits').answer, /does not remove all germs/);
  assert.match(knowledge.find((item) => item.id === 'plant-respiration').answer, /daytime and at night/);
  assert.match(knowledge.find((item) => item.id === 'insectivorous-plants').answer, /still photosynthesize/);
  assert.match(knowledge.find((item) => item.id === 'evergreen-deciduous').answer, /teak is generally deciduous/i);
  assert.match(knowledge.find((item) => item.id === 'non-green-plants').answer, /Fungi are not plants/);
  assert.match(knowledge.find((item) => item.id === 'visible-steam').answer, /invisible/);
});
