import { broadTopics, chapters, comparisons, glossary, knowledge } from './content.js';

export const MAX_QUESTION_LENGTH = 280;

const replacements = [
  ['food pipe', 'oesophagus'], ['foodpipe', 'oesophagus'], ['esophagus', 'oesophagus'],
  ['oesophogus', 'oesophagus'], ['esophogus', 'oesophagus'], ['oesophagu s', 'oesophagus'],
  ['micro organisms', 'microbes'], ['micro organism', 'microbes'],
  ['microorganisms', 'microbes'], ['microorganism', 'microbes'], ['microbe', 'microbes'],
  ['fibers', 'fibre'], ['fibres', 'fibre'], ['fiber', 'fibre'],
  ['stomatas', 'stomata'], ['stoma', 'stomata'],
  ['photosyntesis', 'photosynthesis'], ['photosynthesise', 'photosynthesis'],
  ['photosynthesize', 'photosynthesis'], ['photosynthesizes', 'photosynthesis'],
  ['clorophyll', 'chlorophyll'], ['chlorophyl', 'chlorophyll'], ['chorophyll', 'chlorophyll'],
  ['digetion', 'digestion'], ['digistion', 'digestion'],
  ['condesation', 'condensation'], ['evapouration', 'evaporation'], ['evaportion', 'evaporation'],
  ['sedimantation', 'sedimentation'], ['sedementation', 'sedimentation'], ['decantion', 'decantation'],
  ['solidification', 'freezing'], ['water vapor', 'water vapour'],
  ['dentin', 'dentine'], ['mold', 'mould'], ['molds', 'mould'], ['fungus', 'fungi'],
  ['viruses', 'virus'], ['germ', 'germs'], ['incisor', 'incisors'], ['canine', 'canines'],
  ['premolar', 'premolars'], ['molar', 'molars'],
  ['woolen', 'wool'], ['woollen', 'wool'], ['sweaters', 'sweater'],
  ['woven', 'weaving'], ['weave', 'weaving'], ['knitted', 'knitting'], ['knit', 'knitting'],
  ['solids', 'solid'], ['liquids', 'liquid'], ['gases', 'gas'], ['fluids', 'fluid'],
  ['particles', 'particle'], ['plants', 'plant'], ['leaves', 'leaf'], ['trees', 'tree'],
  ['roots', 'root'], ['veins', 'vein'], ['animals', 'animal'], ['producers', 'producer'],
  ['adaptations', 'adaptation'], ['habitats', 'habitat'], ['deserts', 'desert'],
  ['mangroves', 'mangrove'], ['saprophytes', 'saprophyte'], ['insects', 'insect'],
  ['intestines', 'intestine'], ['silkworms', 'silkworm'], ['nutrient', 'nutrients'],
  ['top soil', 'topsoil'], ['sub soil', 'subsoil'], ['bed rock', 'bedrock'],
  ['clay soil', 'clayey soil'], ['sandy', 'sandy soil'], ['clayey', 'clayey soil'], ['loamy', 'loamy soil'],
  ['loam', 'loamy soil'], ['sunlight', 'light'], ['sunshine', 'light'],
  ['keep us warm', 'keep warm'], ['keep you warm', 'keep warm'],
  ['food factories', 'food factory'], ['food factorys', 'food factory'],
].sort((a, b) => b[0].length - a[0].length);

function plainWords(value) {
  return value.normalize('NFKC').toLowerCase().replace(/['\u2019]/g, '').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}

export function normalizeQuery(value) {
  if (typeof value !== 'string') return '';
  let result = ` ${plainWords(value)} `;
  for (const [from, to] of replacements) {
    const phrase = ` ${from} `;
    result = result.split(phrase).join(` ${to} `);
  }
  // Single-word aliases must not turn "sandy soil" into "sandy soil soil".
  return result.trim().replace(/\bsoil(?: soil)+\b/g, 'soil').replace(/\s+/g, ' ');
}

export function hasPhrase(query, phrase) {
  const normalized = normalizeQuery(phrase);
  return normalized !== '' && ` ${query} `.includes(` ${normalized} `);
}

const stopWords = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'being', 'been', 'do', 'does', 'did',
  'can', 'could', 'would', 'should', 'will', 'must', 'may', 'might', 'please', 'tell', 'me',
  'what', 'why', 'how', 'when', 'where', 'which', 'who', 'this', 'that', 'these', 'those',
  'i', 'we', 'you', 'it', 'its', 'they', 'them', 'their', 'my', 'our', 'us', 'in', 'on',
  'at', 'of', 'to', 'for', 'from', 'with', 'and', 'or', 'as', 'by', 'than', 'there', 'have',
  'has', 'had', 'all', 'some', 'not', 'no', 'never', 'only', 'also', 'about', 'between',
  'difference', 'different', 'compare', 'versus', 'vs', 'same', 'explain', 'mean', 'means',
  'meaning', 'define', 'example', 'examples', 'give', 'more', 'simply', 'simple', 'words',
  'much', 'any', 'if', 'then', 'into', 'through', 'work', 'works',
]);

function terms(query) {
  return [...new Set(query.split(' ').filter((token) => token && !stopWords.has(token)))];
}

const intentTerms = {
  'teeth-jobs': 'bite biting chew chewing cut cutting tear tearing crush crushing grind grinding jobs functions',
  'tooth-numbers': 'child children adult adults number set replace replacement growing grow',
  'tooth-layers': 'inside outside parts hard protect protective layer layers anchors jaw gums blood nerves',
  'tooth-care': 'healthy health acids acid damage protect care calcium snacks sugary sweet clean cleaning',
  'food-journey': 'route journey travel passage digestion digest break down nutrient nutrients absorb absorption churn saliva mouth oesophagus waste',
  'liver-helper': 'helper helps digestion digest fats bile passage journey route food',
  'intestine-difference': 'absorb absorbs absorption nutrients water wide wider length long',
  'useful-microbes': 'help helpful useful harmless harmful good bad food gut decomposition decomposers germ make making curd milk rise dough bread',
  'microbe-groups': 'groups types living alive organisms organism cell cells independent multiply mould',
  'fibre-sources': 'source sources plant animal natural synthetic man made human made sheep silkworm flax',
  'fibre-to-fabric': 'strand strands make making made order cotton wool weave knit',
  'weave-knit': 'loops loop cross crossing yarn fabric thread cloth make making methods',
  'wool-warmth': 'warm warmth cold heat trap traps trapped air insulating insulation colour dark black body',
  'summer-clothes': 'hot heat cool cooler comfortable breathable airy air sweat moisture dry drying summer warm',
  'rain-clothes': 'wet rain rainy water coating coated keep out fabric material nylon polyester',
  'clothes-care': 'clean dry damp delicate gentle mould label safe safely washing drying storing care',
  'matter-states': 'shape volume space container arrangement close apart move moving particles fixed keeps own solid liquid gas',
  'fluids-air': 'flow flows flowing mixture nitrogen oxygen space balloon',
  'melting-freezing': 'solid liquid water heat cold gain gains lose loses opposite changes change ice melts freezes',
  'evaporation-condensation': 'liquid gas cool cooling droplets drop dry drying wet clothes surface boiling boil vapour disappear outside water',
  'visible-steam': 'invisible visible white cloud clouds water vapour liquid gas droplets drop condensation',
  'evaporation-boiling': 'surface liquid gas bubbles bubble water heat temperature boiling evaporation evaporate change changes',
  'dissolving': 'salt sugar sand chalk water dissolve dissolves dissolved dissolving soluble insoluble visible disappear present',
  'filter-limits': 'filtration filter filters filtering remove removes take out salt sand particles water safe safety drink drinking tea sugar leaves insoluble germs clean clearer',
  'settle-pour': 'sedimentation decantation settle settled settling heavy heavier particles insoluble bottom pour pouring clearer liquid water',
  'salt-recovery': 'evaporation water dissolve dissolved recover recovery separate separates separation salt remains remain vapour method',
  'soil-formation': 'formation form forms made components mixture mix mineral minerals particles humus decay decayed air water rock rocks slow time years',
  'soil-types': 'drain drains drainage fast quick quickly slow hold holds water sticky rough humus mix mixture equal parts garden plants',
  'particle-sizes': 'size sizes largest smallest big bigger small smaller intermediate order rough gritty sticky',
  'weathering-erosion': 'break breaks breaking down carry carries carried carrying remove removes removed rain water wind soil rock rocks',
  'soil-layers': 'layers layer top bottom upper lower humus fertile rock solid',
  'soil-protection': 'root roots tree trees plant plants cover hold holds protect protection prevent rain wind cutting clearing bare conserve',
  'photosynthesis': 'light energy water food make making glucose oxygen sunlight need needs uses inputs soil roots factory',
  'leaf-parts': 'plant flat broad main side blade veins vein transport carry carries water minerals food green colour pigment light energy',
  'stomata-jobs': 'openings opening exchange enter enters leave leaves release water vapour underside oxygen carbon dioxide gases',
  'plant-respiration': 'respire respires respiration day night oxygen need needs energy food light dark daytime release',
  'plant-storage': 'store stores storage extra starch glucose sugar food rice potatoes potato later',
  'food-chain-arrows': 'direction point points arrow arrows transfer energy eats eaten eating food eater chain',
  'plant-animal-dependence': 'depend depends need needs help food gases oxygen carbon dioxide pollination seeds dispersal balance',
  'habitat-adaptation': 'home environment feature features helpful land water live lives living survive survival',
  'plains-rain': 'plain plains rain rainy heavy broad pointed tips leaves water drain runoff',
  'evergreen-deciduous': 'leaf leaves foliage shed sheds shedding season seasonal dry year green replace',
  'mountain-plants': 'snow snowy winter slide slides sloping slope branches branch shape cone conical needles',
  'coastal-coconut': 'coast coastal salty salt seawater water float floats floating fruit fruits husk dispersal',
  'cactus-survival': 'dry little water stores storage stem green spines spine reduced reduce loss leaves food photosynthesis',
  'mangrove-roots': 'air oxygen root roots wet waterlogged muddy ground soil surface respiration',
  'aquatic-types': 'floating float fixed underwater rooted root roots water surface air spongy spaces stem stems leaves gases dissolved absorb',
  'insectivorous-plants': 'trap traps trapping catch catches catching minerals nutrients extra food photosynthesis make close closes closing lid slippery fluid digestive',
  'non-green-plants': 'lack lacks chlorophyll food photosynthesis nutrients fungi fungal partners decompose decomposer decayed dead matter',
  'plant-products': 'food oil oils fibre fibres cotton jute flax coir husk husks wood paper rubber gum uses products mats ropes',
};

const routes = [
  { id: 'wool-warmth', groups: [['wool', 'sweater'], ['warm', 'winter', 'heat', 'air', 'dark']] },
  { id: 'summer-clothes', groups: [['cotton', 'linen', 'clothes'], ['summer', 'hot', 'cool', 'sweat']] },
  { id: 'rain-clothes', groups: [['raincoat', 'rainwear', 'synthetic', 'polyester', 'nylon'], ['waterproof', 'rain', 'water']] },
  { id: 'tooth-care', groups: [['teeth', 'tooth', 'plaque'], ['brush', 'brushing', 'sugar', 'acids', 'care']] },
  { id: 'useful-microbes', groups: [['microbes', 'germs', 'bacteria', 'yeast'], ['useful', 'helpful', 'harmful', 'curd', 'bread']] },
  { id: 'microbe-groups', groups: [['virus'], ['bacteria', 'living', 'alive', 'cell', 'cells']] },
  { id: 'filter-limits', groups: [['filter', 'filtration', 'strainer'], ['salt', 'germs', 'safe', 'water', 'tea']] },
  { id: 'salt-recovery', groups: [['salt'], ['evaporation', 'recover', 'separate']], unless: ['filter', 'filtration'] },
  { id: 'plant-respiration', groups: [['plant', 'respiration'], ['oxygen', 'night', 'respire', 'daytime']], unless: ['carbon dioxide'] },
  { id: 'photosynthesis', groups: [['plant', 'leaf', 'photosynthesis'], ['make food', 'light', 'food factory', 'glucose']], unless: ['night', 'respiration'] },
  { id: 'stomata-jobs', groups: [['stomata'], ['do', 'exchange', 'gas', 'opening', 'vapour']] },
  { id: 'soil-protection', groups: [['soil', 'erosion'], ['root', 'tree', 'cover', 'protect', 'conserve', 'prevent']] },
  { id: 'cactus-survival', groups: [['cactus'], ['water', 'spines', 'stem', 'desert', 'food']] },
  { id: 'mangrove-roots', groups: [['mangrove', 'breathing roots'], ['air', 'root', 'swamp', 'waterlogged']] },
  { id: 'insectivorous-plants', groups: [['pitcher plant', 'venus flytrap', 'insectivorous'], ['lid', 'close', 'insect', 'food', 'nutrients']] },
  { id: 'coastal-coconut', groups: [['coconut'], ['coast', 'float', 'seawater', 'salty']] },
];

const lessonIndex = new Map(knowledge.map((item) => {
  const questions = item.questions.map(normalizeQuery);
  const subjects = item.subjects.map(normalizeQuery);
  const vocabulary = new Set(terms(normalizeQuery(`${item.questions.join(' ')} ${item.subjects.join(' ')} ${intentTerms[item.id] || ''}`)));
  return [item.id, { item, questions, subjects, vocabulary }];
}));

const easyMeanings = {
  digestion: 'Digestion breaks food into useful substances your body can take in.',
  nutrients: 'Nutrients are the useful things in food that your body needs.',
  saliva: 'Saliva is the liquid in your mouth that moistens food and starts breaking down starch.',
  oesophagus: 'The food pipe carries swallowed food to your stomach.',
  stomach: 'The stomach mixes food and helps break it down.',
  intestines: 'The small intestine takes in nutrients. The large intestine takes in water and forms waste.',
  liver: 'The liver makes bile to help digestion. Food does not go through it.',
  anus: 'The anus is where solid digestive waste leaves the body.',
  'front-teeth': 'Incisors cut and bite. Canines tear.',
  'back-teeth': 'Premolars crush. Molars grind.',
  'crown-root': 'The crown is the visible part of a tooth. Its hidden root holds it in place.',
  'enamel-dentine': 'Enamel is the hard outer shield of a tooth. Dentine is just beneath it.',
  pulp: 'Pulp is the living inside of a tooth, with nerves and blood vessels.',
  plaque: 'Plaque is sticky bacteria and food remains on teeth.',
  microbes: 'Microbes are very tiny. Some help us and some cause disease.',
  microscope: 'A microscope helps us see very tiny things.',
  bacteria: 'Bacteria are tiny, single-celled living things. Some are useful.',
  fungi: 'Fungi include yeast and moulds. They are not plants.',
  protozoa: 'Protozoa are tiny living things made of one cell.',
  virus: 'A virus needs a living cell to make more viruses.',
  fibre: 'A fibre is a thin strand used to make cloth.',
  'yarn-fabric': 'Yarn is a long strand. Yarn can be made into fabric, or cloth.',
  'weaving-knitting': 'Weaving crosses yarns. Knitting joins loops.',
  'natural-fibre': 'Natural fibres come from plants or animals.',
  'synthetic-fibre': 'Synthetic fibres are human-made.',
  linen: 'Linen comes from the flax plant.',
  wool: 'Wool often comes from sheep. It traps air and helps keep us warm.',
  silk: 'Silkworms produce silk fibres.',
  waterproof: 'Waterproof material helps keep water from passing through.',
  'matter-mass': 'Matter takes up space and has mass. Mass tells us how much matter there is.',
  particle: 'A particle is a tiny piece of matter.',
  solid: 'A solid usually keeps its own shape and volume.',
  liquid: 'A liquid flows and takes its container’s shape, but keeps its own volume.',
  gas: 'A gas spreads out to fill available container space.',
  fluid: 'A fluid can flow. Liquids and gases are both fluids.',
  'melting-freezing': 'Melting: solid to liquid. Freezing: liquid to solid.',
  evaporation: 'Evaporation happens at the surface. Boiling makes gas bubbles throughout the liquid.',
  condensation: 'Condensation changes gas to liquid.',
  'solute-solvent': 'The solute dissolves. The solvent is what it dissolves in.',
  solution: 'A solution is a mixture with a substance dissolved in it.',
  'soluble-insoluble': 'Soluble can dissolve in a solvent. Insoluble cannot.',
  filtration: 'A filter catches insoluble bits, not dissolved salt or all germs.',
  sedimentation: 'Sedimentation means letting heavier bits settle at the bottom.',
  decantation: 'Decantation means pouring clearer liquid off the settled bits.',
  soil: 'Soil mixes mineral particles, decayed matter, air, and water.',
  weathering: 'Weathering slowly breaks rocks into smaller pieces.',
  'humus-minerals': 'Humus is decayed living matter. Minerals are natural substances in rock and soil.',
  'sand-silt-clay': 'Sand is largest, silt is in between, and clay is smallest.',
  'sandy-soil': 'Sandy soil feels rough and lets water drain quickly.',
  'clayey-soil': 'Clayey soil holds water and can be sticky when wet.',
  'loamy-soil': 'Loamy soil is a useful mixture that holds water but also lets some drain.',
  'soil-profile': 'A soil profile shows the layers from top to bottom.',
  topsoil: 'Topsoil is the upper layer, usually with more humus.',
  subsoil: 'Subsoil is below topsoil and usually has less humus.',
  bedrock: 'Bedrock is solid rock deeper down.',
  erosion: 'Erosion carries soil or rock away.',
  conservation: 'Conservation means protecting something useful, such as soil.',
  'leaf-blade': 'The leaf blade is the broad, flat part of a leaf.',
  vein: 'Leaf veins carry water, minerals, and food.',
  chlorophyll: 'Chlorophyll is the green pigment that captures light energy.',
  stomata: 'Stomata are tiny leaf openings for gases and water vapour.',
  photosynthesis: 'A green plant uses light, water, and carbon dioxide to make food and release oxygen.',
  'carbon-dioxide-oxygen': 'Plants use carbon dioxide to make food. They release oxygen, but also need oxygen to respire.',
  'glucose-starch': 'Glucose is food made by the plant. Starch stores extra food.',
  respiration: 'Respiration releases usable energy from food. Plants respire day and night.',
  producer: 'A producer makes its own food. Green plants are producers.',
  'food-chain': 'A food chain shows food and energy passing from food to eater.',
  interdependence: 'Living things depend on each other for what they need.',
  'adaptation-habitat': 'Habitat means home environment. Adaptation means a helpful feature for living there.',
  'terrestrial-aquatic': 'Terrestrial means on land. Aquatic means in water.',
  'evergreen-deciduous': 'Evergreen stays leafy through the year. Deciduous sheds leaves in a season.',
  desert: 'A desert gets very little rain.',
  swamp: 'A swamp is a wet, waterlogged place.',
  'breathing-roots': 'Breathing roots reach above wet ground to get air.',
  'floating-plant': 'A floating plant floats at the water surface.',
  'fixed-aquatic-plant': 'A fixed aquatic plant is rooted below the water with leaves reaching the surface.',
  'underwater-plant': 'An underwater plant grows below the water surface.',
  'insectivorous-plant': 'These plants trap insects for extra nutrients but still make food using light.',
  'non-green-saprophyte': 'Some non-green plants get help from fungi. Fungi are not plants, and many break down dead matter.',
  coir: 'Coir is a tough fibre from a coconut’s outer husk.',
};

export function validateQuestion(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return { valid: false, message: 'Type a science word or a short question first.' };
  }
  if (value.trim().length > MAX_QUESTION_LENGTH) {
    return { valid: false, message: `That is a little long. Please use ${MAX_QUESTION_LENGTH} characters or fewer.` };
  }
  if (value.trim().length < 2 || !/[a-z]/i.test(value)) {
    return { valid: false, message: 'Try a word like “soil”, or a short science question using letters.' };
  }
  return { valid: true, value: value.trim() };
}

function result(kind, title, text, chapterIds = [], context = null, choices = []) {
  return { kind, title, text, chapterIds: [...new Set(chapterIds)], context, choices };
}

function suggestions(ids) {
  return ids.map((id) => lessonIndex.get(id)?.item).filter(Boolean).map((item) => ({
    label: item.title,
    question: item.questions[0],
  }));
}

function selectedStarters(chapterId) {
  return (chapters.find((chapter) => chapter.id === chapterId) || chapters[0]).starters;
}

function clarification(ids, message = 'That could mean a few things. Which one would you like to revise?', context = null) {
  const unique = [...new Set(ids)].slice(0, 4);
  const chapterIds = unique.map((id) => lessonIndex.get(id)?.item.chapterId).filter(Boolean);
  return result('clarify', 'Let’s choose a question', message, chapterIds, context, suggestions(unique));
}

function lessonAnswer(id, mode = 'answer') {
  const item = lessonIndex.get(id).item;
  const text = mode === 'more' ? item.more : mode === 'example' ? item.example : mode === 'simple' ? item.simple : item.answer;
  const title = mode === 'more' ? `A little more: ${item.title}` : mode === 'example' ? `An example: ${item.title}` : mode === 'simple' ? `Simply: ${item.title}` : item.title;
  return result('answer', title, text, [item.chapterId], { type: 'lesson', id });
}

function glossaryAnswer(entry, matchedPart, mode = 'answer') {
  const definition = matchedPart?.definition || entry.definition;
  const term = matchedPart?.term || entry.term;
  let text = definition;
  if (mode === 'more') text = `${definition}\n\n${matchedPart ? `${entry.definition}\n\n` : ''}Everyday connection: ${entry.example}`;
  if (mode === 'example') text = `${entry.example}\n\nRemember: ${definition}`;
  if (mode === 'simple') text = matchedPart?.definition || easyMeanings[entry.id];
  return result('answer', term, text, [entry.chapterId], {
    type: 'glossary',
    id: entry.id,
    part: matchedPart?.term || null,
  });
}

const healthPhrases = [
  'pain', 'pains', 'painful', 'hurt', 'hurts', 'hurting', 'ache', 'toothache', 'headache',
  'stomachache', 'stomach ache', 'tummy ache', 'aches', 'aching', 'sick', 'ill', 'fever', 'vomit', 'vomiting',
  'bleeding', 'bleed', 'wound', 'wounds', 'cut my', 'cut myself', 'broken bone', 'broken arm',
  'injury', 'injured', 'sprained', 'poison', 'poisoned', 'poisoning', 'poisonous', 'swallowed',
  'medicine', 'medication', 'medicines', 'pill', 'pills', 'tablet', 'tablets', 'dose', 'dosage',
  'treat', 'treatment', 'diagnose', 'diagnosis', 'cure', 'cancer', 'allergy', 'allergic',
  'burned', 'burnt', 'cough', 'coughing', 'sore', 'diarrhoea', 'diarrhea', 'nausea',
  'i feel unwell', 'i feel dizzy', 'cannot breathe', 'cant breathe',
];
const hazards = [
  'iodine', 'mothball', 'mothballs', 'alcohol', 'spirit', 'bleach', 'knife', 'knives',
  'razor', 'sharp tool', 'sharp tools', 'scissors', 'fire', 'flame', 'burner', 'stove',
  'hot plate', 'acid experiment', 'cleaning chemicals', 'mix chemicals', 'live wire',
  'electric socket', 'explosive', 'explosives',
];
const heatActions = ['heat', 'heating', 'boil', 'boiling', 'burn', 'burning', 'cut', 'cutting'];
const actionRequests = ['how', 'steps', 'experiment', 'try', 'can i', 'should i', 'do i', 'at home', 'make', 'test', 'use'];

function safetyReply(query) {
  if (healthPhrases.some((phrase) => hasPhrase(query, phrase))) {
    return result('safety', 'A trusted adult can help',
      'Please tell a trusted adult now about pain, illness, injury, medicine, or anything you may have swallowed. They can contact a doctor, dentist, poison service, or local emergency service if needed. Do not taste unknown substances or take medicine by yourself. I can explain revision topics, but I cannot diagnose or suggest treatment.');
  }
  const hazardous = hazards.some((phrase) => hasPhrase(query, phrase)) || hasPhrase(query, 'test starch');
  const activityFraming = ['steps', 'experiment', 'try', 'at home', 'can i', 'should i', 'do i', 'how to', 'how do i', 'how can i', 'how do we', 'how can we'];
  const unsafeActivity = heatActions.some((phrase) => hasPhrase(query, phrase))
    && actionRequests.some((phrase) => hasPhrase(query, phrase))
    && (activityFraming.some((phrase) => hasPhrase(query, phrase))
      || ['heat water', 'heat salt', 'boil water', 'cut a', 'cut the', 'burn a', 'burn the'].some((phrase) => hasPhrase(query, phrase)));
  const unsafeFood = ['eat mould', 'eat mouldy', 'taste mould', 'taste mouldy', 'grow mould', 'drink muddy', 'drink salt water'].some((phrase) => hasPhrase(query, phrase));
  if (hazardous || unsafeActivity || unsafeFood) {
    return result('safety', 'Let’s keep revision safe',
      'I cannot give steps for activities with heat, sharp tools, chemicals, or unsafe food. Ask a teacher or trusted adult instead, and never taste unknown mixtures or mouldy food. A starch test belongs with a trained adult. We can safely revise the idea without doing the experiment.',
      [], null, suggestions(['melting-freezing', 'plant-storage', 'filter-limits']));
  }
  return null;
}

function requestedMode(query) {
  if (hasPhrase(query, 'example') || hasPhrase(query, 'examples')) return 'example';
  if (['simply', 'simpler', 'simple words'].some((phrase) => hasPhrase(query, phrase))) return 'simple';
  if (hasPhrase(query, 'more')) return 'more';
  return 'answer';
}

const followUps = new Map([
  ...['tell me more', 'more', 'more please', 'explain more', 'can you tell me more'].map((phrase) => [phrase, 'more']),
  ...['give an example', 'give me an example', 'an example please', 'example', 'example please'].map((phrase) => [phrase, 'example']),
  ...['explain it more simply', 'explain simply', 'explain it simply', 'simpler', 'make it simpler', 'explain in simple words'].map((phrase) => [phrase, 'simple']),
]);

function contextAnswer(context, mode) {
  if (context?.type === 'lesson' && lessonIndex.has(context.id)) return lessonAnswer(context.id, mode);
  if (context?.type === 'glossary') {
    const entry = glossary.find((item) => item.id === context.id);
    if (entry) return glossaryAnswer(entry, entry.parts.find((item) => item.term === context.part), mode);
  }
  return null;
}

function termRequest(query) {
  const meaning = query.match(/^what (?:does|do) (.+) mean$/);
  if (meaning) return meaning[1].replace(/^(?:a|an|the) /, '');
  return query
    .replace(/^(?:what is|what are|meaning of|define|explain|tell me about|tell me more about|give an example of|give me an example of) /, '')
    .replace(/^(?:a|an|the) /, '')
    .replace(/ (?:please|more simply|in simple words|simply)$/, '');
}

function findWord(query) {
  const target = termRequest(query);
  for (const entry of glossary) {
    for (const item of entry.parts) {
      if ([item.term, ...item.aliases].some((name) => normalizeQuery(name) === target)) return { entry, matchedPart: item };
    }
    if ([entry.term, ...entry.aliases].some((name) => normalizeQuery(name) === target)) return { entry, matchedPart: null };
  }
  return null;
}

function evidenceFor(prepared, queryTerms, query) {
  const subjectMatches = prepared.subjects.filter((subject) => hasPhrase(query, subject));
  if (!subjectMatches.length || !queryTerms.length) return null;
  const supported = queryTerms.filter((token) => prepared.vocabulary.has(token));
  const coverage = supported.length / queryTerms.length;
  if (coverage < 0.78) return null;
  const similarity = Math.max(...prepared.questions.map((question) => {
    const known = terms(question);
    const intersection = queryTerms.filter((token) => known.includes(token)).length;
    return intersection / new Set([...queryTerms, ...known]).size;
  }));
  const specificity = Math.min(3, Math.max(...subjectMatches.map((subject) => terms(subject).length)));
  const route = routes.find((item) => item.id === prepared.item.id);
  const routed = route && route.groups.every((group) => group.some((phrase) => hasPhrase(query, phrase)))
    && !(route.unless || []).some((phrase) => hasPhrase(query, phrase));
  return { id: prepared.item.id, score: coverage * 0.6 + similarity * 0.2 + specificity * 0.04 + (routed ? 0.25 : 0) };
}

export function getReply(value, context = null, selectedChapterId = 'digestion') {
  const validated = validateQuestion(value);
  if (!validated.valid) return result('invalid', 'A small nudge', validated.message);
  const query = normalizeQuery(validated.value);
  const safe = safetyReply(query);
  if (safe) return safe;
  const lastContext = contextAnswer(context, 'answer')?.context || null;

  if (['hi', 'hello', 'hey', 'hi buddy', 'hello buddy', 'good morning', 'good evening', 'how are you'].includes(query)) {
    return result('greeting', 'Hello, revision explorer!',
      'I answer from this small science guide, not an AI service. Pick a starter question or ask about one of the six topics. You do not need to share your name or any personal details.',
      [], lastContext, suggestions(selectedStarters(selectedChapterId)));
  }
  if (['thanks', 'thank you', 'thank you buddy'].includes(query)) {
    return result('greeting', 'You’re welcome!',
      'Small steps count. You can revise another word, try a practice question, or ask for a simpler explanation.',
      [], lastContext, suggestions(selectedStarters(selectedChapterId)));
  }

  const followMode = followUps.get(query);
  if (followMode) {
    return contextAnswer(lastContext, followMode) || clarification(selectedStarters(selectedChapterId),
      'I need a topic first. Choose a question below, then I can explain more, make it simpler, or give an example.');
  }

  const broad = broadTopics.find((item) => item.phrases.some((phrase) => normalizeQuery(phrase) === query));
  if (broad) return clarification(broad.lessonIds, undefined, lastContext);
  if (['root', 'roots', 'what is a root', 'what is root'].some((phrase) => normalizeQuery(phrase) === query)) {
    return clarification(['tooth-layers', 'photosynthesis', 'soil-protection'], 'Do you mean a tooth’s root, or a plant’s roots? Choose the idea you want.', lastContext);
  }

  const mode = requestedMode(query);
  const exact = [...lessonIndex.values()].find((prepared) => prepared.questions.includes(query));
  if (exact) return lessonAnswer(exact.item.id, mode);

  const queryTerms = terms(query);
  const comparison = comparisons.find((item) => item.groups.every((group) => group.some((phrase) => hasPhrase(query, phrase))));
  if (comparison) {
    const prepared = lessonIndex.get(comparison.lessonId);
    if (queryTerms.length && queryTerms.filter((token) => prepared.vocabulary.has(token)).length / queryTerms.length >= 0.78) {
      return lessonAnswer(comparison.lessonId, mode);
    }
  }
  const wantsComparison = ['difference', 'compare', 'versus', 'vs', 'different'].some((phrase) => hasPhrase(query, phrase));
  if (!wantsComparison) {
    const match = findWord(query);
    if (match) {
      if (mode !== 'answer' && !match.matchedPart && lessonIndex.has(match.entry.id)) return lessonAnswer(match.entry.id, mode);
      return glossaryAnswer(match.entry, match.matchedPart, mode);
    }
  }

  const candidates = [...lessonIndex.values()]
    .map((prepared) => evidenceFor(prepared, queryTerms, query))
    .filter(Boolean).sort((a, b) => b.score - a.score);
  if (candidates.length) {
    const top = candidates[0];
    const close = candidates.filter((item) => top.score - item.score < 0.09);
    if (wantsComparison || close.length > 1 || (queryTerms.length < 2 && /^(why|how) /.test(query))) {
      return clarification(close.length > 1 ? close.map((item) => item.id) : candidates.map((item) => item.id),
        'I can help with these guide questions, but I am not sure which explanation fits yours. Choose one so I do not guess.', lastContext);
    }
    return lessonAnswer(top.id, mode);
  }
  return result('unknown', 'That is outside this little guide',
    'I do not have a reliable answer for that in this revision guide. I only cover the six science topics shown here, and I will not make up an answer. Check your textbook or ask a teacher or trusted adult. You can try one of these on-topic questions instead.',
    [], lastContext, suggestions(selectedStarters(selectedChapterId)));
}

export function searchGlossary(value, chapterId = null) {
  const query = normalizeQuery(value);
  return glossary.filter((entry) => {
    if (chapterId && entry.chapterId !== chapterId) return false;
    if (!query) return true;
    const names = [entry.term, ...entry.aliases, ...entry.parts.flatMap((item) => [item.term, ...item.aliases])];
    return names.some((name) => normalizeQuery(name).includes(query));
  }).sort((a, b) => a.term.localeCompare(b.term, 'en'));
}
