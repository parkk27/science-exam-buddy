import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters, comparisons, DEFAULT_CHAPTER_ID, glossary, knowledge, stats, topicIdsFor, wordCountForTopic } from '../content.js';
import { normalizeQuery } from '../tutor.js';

const expectedWords = {
  food: 31, digestion: 31, clothes: 16, matter: 18, soil: 21, 'green-plants': 19, survival: 19,
  circulation: 20, 'young-animals': 21, 'animal-adaptations': 42, forces: 23,
  weather: 34, space: 18, 'earth-care': 28,
};

test('Food is first, Digestion second, and all 14 topics have exact practice totals', () => {
  assert.deepEqual(chapters.map((item) => item.id), Object.keys(expectedWords));
  assert.equal(DEFAULT_CHAPTER_ID, 'food');
  assert.deepEqual(chapters.slice(1).map((chapter) => chapter.id), ['digestion', 'clothes', 'matter', 'soil', 'green-plants', 'survival', 'circulation', 'young-animals', 'animal-adaptations', 'forces', 'weather', 'space', 'earth-care']);
  assert.deepEqual(stats, { topics: 14, glossaryCards: 237, mcqs: 84, shortAnswers: 56, tutorExplanations: 106, tutorQuestions: 447 });
  assert.equal(comparisons.length, 83);
  const ids = new Set();
  for (const chapter of chapters) {
    assert.ok(chapter.summary.length >= 3);
    assert.ok(chapter.summary.every((text) => text.length > 40));
    assert.ok(chapter.checklist.length >= 4);
    assert.equal(chapter.examples.length, 3);
    assert.ok(chapter.diagram.steps.length >= 3);
    assert.equal(chapter.mcqs.length, 6);
    assert.equal(chapter.shortAnswers.length, 4);
    assert.equal(wordCountForTopic(chapter.id), expectedWords[chapter.id]);
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
  assert.equal(chapters.reduce((count, chapter) => count + chapter.mcqs.length, 0), 84);
  assert.equal(chapters.reduce((count, chapter) => count + chapter.shortAnswers.length, 0), 56);
  const questions = chapters.flatMap((chapter) => [...chapter.mcqs, ...chapter.shortAnswers]).map((item) => normalizeQuery(item.question));
  assert.equal(new Set(questions).size, questions.length, 'No duplicate practice questions');
});

test('237 unique glossary cards cover old and reviewed concepts without duplicate cards', () => {
  assert.equal(glossary.length, 237);
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
    'organ', 'organ system', 'circulatory system', 'heart', 'blood', 'artery', 'blood vein',
    'capillary', 'excretion', 'excretory system', 'kidney', 'ureter', 'urethra', 'urinary bladder', 'urine',
    'reproduction', 'life cycle', 'embryo', 'eggshell', 'albumen', 'yolk', 'incubation', 'hatching',
    'spawn', 'tadpole', 'larva', 'caterpillar', 'pupa', 'metamorphosis', 'moulting', 'mammal',
    'blowhole', 'maggot', 'nymph', 'suckle', 'vertebrate', 'invertebrate', 'backbone', 'insect',
    'thorax', 'abdomen', 'chitin', 'gill', 'fin', 'scale', 'amphibian', 'reptile', 'warm blooded',
    'cold blooded', 'arboreal', 'aerial', 'blubber', 'hibernation', 'aestivation', 'migration',
    'herbivore', 'carnivore', 'omnivore', 'scavenger', 'parasite', 'host', 'predator', 'prey',
    'camouflage', 'extinct', 'endangered', 'cellulose', 'evolution', 'force', 'gravity', 'friction',
    'work', 'simple machine', 'lever', 'fulcrum', 'pulley', 'wheel', 'axle', 'inclined plane',
    'screw', 'wedge', 'energy', 'chemical energy', 'mechanical energy', 'heat energy',
    'light energy', 'electrical energy', 'magnetic energy', 'sound energy', 'solar energy',
    'hydro energy', 'wind energy', 'turbine', 'weather', 'atmosphere', 'wind', 'breeze', 'gale',
    'storm', 'sea breeze', 'land breeze', 'humidity', 'cloud', 'dew', 'rain', 'snow',
    'precipitation', 'water cycle', 'groundwater', 'water purification', 'chlorination',
    'solar system', 'star', 'sun', 'planet', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter',
    'Saturn', 'Uranus', 'Neptune', 'dwarf planet', 'orbit', 'satellite', 'moon', 'reflection',
    'constellation', 'galaxy', 'universe', 'rotation', 'revolution', 'axis', 'equator',
    'hemisphere', 'season', 'monsoon', 'environment', 'deforestation', 'afforestation',
    'reforestation', 'wildlife', 'seed dispersal', 'Van Mahotsav', 'World Environment Day',
    'reuse', 'paper pulp', 'ivory', 'transpiration',
    'food sources', 'carbohydrate', 'sugar', 'energy-giving foods', 'protein',
    'body-building foods', 'dietary fats', 'vitamins', 'vitamin A', 'vitamin B-complex',
    'vitamin C', 'vitamin D', 'vitamin E', 'vitamin K', 'minerals in food', 'calcium',
    'iron', 'potassium', 'iodine in food', 'sodium', 'roughage', 'dietary fibre',
    'water in our diet', 'balanced diet', 'diet', 'meal', 'food preservation', 'spoilage',
    'drying food', 'pickling', 'refrigeration', 'deep freezing', 'canning', 'bottling',
    'legume', 'pulse', 'cereals', 'rest', 'sleep', 'posture', 'exercise', 'yoga',
    'International Yoga Day', 'gram', 'kilogram', 'litre', 'kilolitre',
  ];
  for (const term of required) assert.ok(covered.has(normalizeQuery(term)), `Missing glossary term: ${term}`);
  for (const word of glossary) {
    assert.ok(chapters.some((chapter) => chapter.id === word.chapterId));
    assert.ok(word.definition.length > 30);
    assert.ok(word.example.length > 15);
    assert.equal(new Set(topicIdsFor(word)).size, topicIdsFor(word).length);
    for (const id of topicIdsFor(word)) assert.ok(chapters.some((chapter) => chapter.id === id));
    for (const meaning of word.parts) {
      assert.equal(typeof meaning.definition, 'string');
      assert.ok(meaning.definition.trim(), meaning.term);
    }
  }
});

test('every starter, lesson, and comparison points to a real source', () => {
  const ids = new Set(knowledge.map((item) => item.id));
  assert.equal(ids.size, knowledge.length);
  for (const chapter of chapters) {
    for (const id of chapter.starters) assert.ok(ids.has(id));
  }
  for (const item of knowledge) {
    for (const id of topicIdsFor(item)) assert.ok(chapters.some((chapter) => chapter.id === id));
    assert.ok(item.questions.length >= 3);
    assert.ok(item.subjects.length >= 2);
    for (const field of ['answer', 'simple', 'more', 'example']) assert.ok(item[field].length > 20, `${item.id}.${field}`);
  }
  for (const comparison of comparisons) assert.ok(ids.has(comparison.lessonId));
  const questions = knowledge.flatMap((item) => item.questions.map(normalizeQuery));
  assert.equal(new Set(questions).size, 447, 'Curated phrasings must not be duplicated');
});

test('scientific guardrails are stated explicitly in the original material', () => {
  const foodRoute = chapters.find((chapter) => chapter.id === 'digestion').diagram.steps;
  assert.deepEqual(foodRoute, ['Mouth', 'Oesophagus', 'Stomach', 'Small intestine', 'Large intestine', 'Anus']);
  assert.match(knowledge.find((item) => item.id === 'filter-limits').answer, /does not remove all germs/);
  assert.match(knowledge.find((item) => item.id === 'plant-respiration').answer, /daytime and at night/);
  assert.match(knowledge.find((item) => item.id === 'insectivorous-plants').answer, /still photosynthesize/);
  assert.match(knowledge.find((item) => item.id === 'evergreen-deciduous').answer, /teak is generally deciduous/i);
  assert.match(knowledge.find((item) => item.id === 'non-green-plants').answer, /Fungi are not plants/);
  assert.match(knowledge.find((item) => item.id === 'visible-steam').answer, /invisible/);
  assert.match(knowledge.find((item) => item.id === 'urinary-tubes').answer, /kidney to the bladder/);
  assert.match(knowledge.find((item) => item.id === 'mammal-exceptions').answer, /ordinary anteaters give live birth/);
  assert.match(knowledge.find((item) => item.id === 'gravity-ball').answer, /does not carry a throwing force/);
  assert.match(knowledge.find((item) => item.id === 'safe-water').answer, /not dissolved salt or all germs/);
  assert.match(knowledge.find((item) => item.id === 'space-groups').answer, /stars, gas, and dust/);
  assert.match(knowledge.find((item) => item.id === 'seasons-hemispheres').answer, /distance is not the main cause/);
  assert.match(knowledge.find((item) => item.id === 'food-proteins-fats').answer, /does not automatically need more total protein/);
  assert.match(knowledge.find((item) => item.id === 'food-storage-methods').answer, /closing any jar is not enough/);
});
