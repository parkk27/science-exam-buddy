import { broadTopics, chapters, comparisons, DEFAULT_CHAPTER_ID, glossary, knowledge, topicIdsFor } from './content.js';
import { editDistance, namedTargets, parseWordRequest } from './word-requests.js';

export const MAX_QUESTION_LENGTH = 280;
const phraseIndex = new Map();

const spellingCorrections = [
  ['edogenesis', 'pedogenesis'], ['pedogenisis', 'pedogenesis'],
  ['photosyntesis', 'photosynthesis'], ['clorophyll', 'chlorophyll'], ['chlorophyl', 'chlorophyll'],
  ['chorophyll', 'chlorophyll'], ['digetion', 'digestion'], ['digistion', 'digestion'],
  ['oesophogus', 'oesophagus'], ['esophogus', 'oesophagus'],
  ['condesation', 'condensation'], ['evapouration', 'evaporation'], ['evaportion', 'evaporation'],
  ['sedimantation', 'sedimentation'], ['sedementation', 'sedimentation'], ['decantion', 'decantation'],
  ['metamorfosis', 'metamorphosis'], ['metamorphisis', 'metamorphosis'], ['camoflage', 'camouflage'],
  ['friktion', 'friction'], ['rotaton', 'rotation'], ['revoluton', 'revolution'],
  ['satelite', 'satellite'], ['galaxi', 'galaxy'], ['filration', 'filtration'],
  ['roughdge', 'roughage'], ['balanced dite', 'balanced diet'], ['protien', 'protein'],
  ['urethar', 'urethra'],
];

const replacements = [
  ...spellingCorrections,
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
  ['ureters', 'ureter'], ['urethar', 'urethra'], ['kidneys', 'kidney'],
  ['arteries', 'artery'], ['veins', 'vein'], ['capillaries', 'capillary'],
  ['blood vessels', 'blood vessel'], ['larvae', 'larva'], ['pupae', 'pupa'],
  ['caterpillars', 'caterpillar'], ['tadpoles', 'tadpole'], ['spawns', 'spawn'],
  ['molting', 'moulting'], ['molt', 'moulting'], ['moult', 'moulting'],
  ['metamorfosis', 'metamorphosis'], ['metamorphisis', 'metamorphosis'],
  ['estivation', 'aestivation'], ['camoflage', 'camouflage'],
  ['vertebrates', 'vertebrate'], ['invertebrates', 'invertebrate'],
  ['mammals', 'mammal'], ['birds', 'bird'], ['bats', 'bat'],
  ['reptiles', 'reptile'], ['amphibians', 'amphibian'], ['gills', 'gill'], ['gils', 'gill'],
  ['herbivores', 'herbivore'], ['carnivores', 'carnivore'], ['omnivores', 'omnivore'],
  ['scavengers', 'scavenger'], ['parasites', 'parasite'],
  ['forces', 'force'], ['machines', 'machine'], ['screws', 'screw'], ['wedges', 'wedge'],
  ['wheels', 'wheel'], ['axles', 'axle'], ['friktion', 'friction'],
  ['watercycle', 'water cycle'], ['ground water', 'groundwater'],
  ['planets', 'planet'], ['stars', 'star'], ['moons', 'moon'], ['satellites', 'satellite'],
  ['constellations', 'constellation'], ['galaxies', 'galaxy'], ['scorpio', 'scorpius'],
  ['rotaton', 'rotation'], ['revoluton', 'revolution'],
  ['hemispheres', 'hemisphere'], ['seasons', 'season'],
  ['satelite', 'satellite'], ['galaxi', 'galaxy'], ['filration', 'filtration'],
  ['carbohydrates', 'carbohydrate'], ['carbs', 'carbohydrate'], ['proteins', 'protein'],
  ['fats', 'fat'], ['vitamins', 'vitamin'], ['minerals', 'mineral'],
  ['roughdge', 'roughage'], ['balanced dite', 'balanced diet'], ['protien', 'protein'],
  ['grams', 'gram'], ['kilograms', 'kilogram'], ['liters', 'litre'], ['liter', 'litre'],
  ['litres', 'litre'], ['kiloliters', 'kilolitre'], ['kiloliter', 'kilolitre'], ['kilolitres', 'kilolitre'],
  ['refrigerating', 'refrigeration'], ['preserving', 'preservation'],
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
  const normalized = phraseIndex.get(phrase) ?? normalizeQuery(phrase);
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
  const vocabulary = new Set(terms(normalizeQuery(`${item.questions.join(' ')} ${item.subjects.join(' ')} ${intentTerms[item.id] || ''} ${item.intentTerms || ''}`)));
  return [item.id, { item, questions, subjects, vocabulary }];
}));

const questionIndex = new Map();
for (const prepared of lessonIndex.values()) {
  for (const question of prepared.questions) {
    if (questionIndex.has(question)) throw new Error(`Duplicate curated question: ${question}`);
    questionIndex.set(question, prepared);
  }
}

const glossaryIndex = new Map();
function indexWord(entry, matchedPart, name) {
  const key = normalizeQuery(name);
  const matches = glossaryIndex.get(key) || [];
  if (!matches.some((match) => match.entry.id === entry.id && (match.matchedPart === matchedPart || (!matchedPart && match.matchedPart)))) {
    matches.push({ entry, matchedPart });
  }
  glossaryIndex.set(key, matches);
}

const glossarySearchIndex = glossary.map((entry) => {
  for (const item of entry.parts) {
    for (const name of [item.term, ...item.aliases]) indexWord(entry, item, name);
  }
  const names = [entry.term, entry.term.replace(/&/g, 'and'), ...entry.aliases];
  for (const name of names) indexWord(entry, null, name);
  return { entry, names: [...names, ...entry.parts.flatMap((item) => [item.term, ...item.aliases])].map(normalizeQuery) };
});

const broadTopicIndex = new Map(broadTopics.flatMap((item) =>
  item.phrases.map((phrase) => [normalizeQuery(phrase), item])));

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
  stomata: 'Stomata are tiny leaf openings. Losing water as vapour is transpiration.',
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
  if ((value.trim().length < 2 && !/^[gl]$/i.test(value.trim())) || !/[a-z]/i.test(value)) {
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
  const chapterIds = unique.flatMap((id) => {
    const item = lessonIndex.get(id)?.item;
    return item ? topicIdsFor(item) : [];
  });
  return result('clarify', 'Let’s choose a question', message, chapterIds, context, suggestions(unique));
}

function lessonAnswer(id, mode = 'answer') {
  const item = lessonIndex.get(id).item;
  const explanation = mode === 'more' ? item.more : mode === 'simple' ? item.simple : item.answer;
  const text = mode === 'example' ? item.example : `${explanation}\n\nExample: ${item.example}`;
  const title = mode === 'more' ? `A little more: ${item.title}` : mode === 'example' ? `An example: ${item.title}` : mode === 'simple' ? `Simply: ${item.title}` : item.title;
  return result('answer', title, text, topicIdsFor(item), { type: 'lesson', id });
}

function glossaryAnswer(entry, matchedPart, mode = 'answer') {
  const definition = matchedPart?.definition || entry.definition;
  const term = matchedPart?.term || entry.term;
  const example = matchedPart?.example || entry.example;
  let text = `${definition}\n\nExample: ${example}`;
  if (mode === 'more') text = `${definition}\n\n${matchedPart ? `${entry.definition}\n\n` : ''}Example: ${example}`;
  if (mode === 'example') text = `${example}\n\nRemember: ${definition}`;
  if (mode === 'simple') {
    const simple = matchedPart?.simple || matchedPart?.definition || entry.simple || easyMeanings[entry.id] || definition;
    text = `${simple}\n\nExample: ${example}`;
  }
  return result('answer', term, text, topicIdsFor(entry), {
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
  'draw blood', 'take blood', 'blood sample at home', 'inject', 'injection',
  'treat my', 'treat me', 'treat myself',
  'underweight', 'overweight', 'weight loss', 'lose weight', 'too fat',
  'surgery', 'operate on',
];
const hazards = [
  'iodine', 'mothball', 'mothballs', 'alcohol', 'spirit', 'bleach', 'knife', 'knives',
  'razor', 'sharp tool', 'sharp tools', 'scissors', 'fire', 'flame', 'burner', 'stove',
  'hot plate', 'acid experiment', 'cleaning chemicals', 'mix chemicals', 'live wire',
  'electric socket', 'explosive', 'explosives',
];
const heatActions = ['heat', 'heating', 'boil', 'boiling', 'burn', 'burning', 'cut', 'cutting'];
const actionRequests = ['how', 'steps', 'experiment', 'try', 'can i', 'should i', 'do i', 'at home', 'make', 'test', 'use'];

function safetyReply(query, knownConcept = false) {
  // Curated neutral concepts can be explained without giving any procedure.
  if (knownConcept) return null;
  const waterContext = hasPhrase(query, 'water') || hasPhrase(query, 'chlorination');
  if (healthPhrases.some((phrase) => hasPhrase(query, phrase)
    && !(waterContext && ['treat', 'treatment'].includes(phrase)))) {
    return result('safety', 'A trusted adult can help',
      'Please tell a trusted adult now about pain, illness, injury, medicine, or anything you may have swallowed. They can contact a doctor, dentist, poison service, or local emergency service if needed. Do not taste unknown substances or take medicine by yourself. I can explain revision topics, but I cannot diagnose or suggest treatment.');
  }
  const hazardous = hazards.some((phrase) => hasPhrase(query, phrase)) || hasPhrase(query, 'test starch');
  const activityFraming = ['steps', 'experiment', 'try', 'at home', 'can i', 'should i', 'do i', 'how to', 'how do i', 'how can i', 'how do we', 'how can we'];
  const unsafeActivity = heatActions.some((phrase) => hasPhrase(query, phrase))
    && actionRequests.some((phrase) => hasPhrase(query, phrase))
    && (activityFraming.some((phrase) => hasPhrase(query, phrase))
      || ['heat water', 'heat salt', 'boil water', 'cut a', 'cut the', 'burn a', 'burn the'].some((phrase) => hasPhrase(query, phrase)));
  const unsafeFood = ['eat mould', 'eat mouldy', 'taste mould', 'taste mouldy', 'grow mould', 'drink muddy', 'drink salt water', 'eat spoiled', 'eat spoilt', 'taste spoiled', 'taste spoilt'].some((phrase) => hasPhrase(query, phrase));
  const unsafeCooking = ['cook', 'fry', 'frying', 'pickling', 'canning', 'make pickles'].some((phrase) => hasPhrase(query, phrase))
    && ['how do i', 'how can i', 'how to', 'steps', 'experiment', 'at home', 'can i'].some((phrase) => hasPhrase(query, phrase));
  const unsafeObservation = ['look directly at the sun', 'look at the sun', 'look at sun', 'binoculars', 'use a telescope', 'catch a snake', 'touch a snake', 'feed wild animals', 'capture wild animals', 'how do i hunt', 'how to hunt', 'make an electrical circuit'].some((phrase) => hasPhrase(query, phrase));
  const unsafeChemicals = ['chlorine', 'chlorination'].some((phrase) => hasPhrase(query, phrase))
    && ['can i', 'how do i', 'how to', 'steps', 'experiment', 'add', 'dose', 'use at home'].some((phrase) => hasPhrase(query, phrase));
  if (hazardous || unsafeActivity || unsafeFood || unsafeCooking || unsafeObservation || unsafeChemicals) {
    return result('safety', 'Let’s keep revision safe',
      'I cannot give steps for unsafe activities with heat, sharp tools, chemicals, electricity, or wildlife. Ask a teacher or trusted adult instead. Never taste unknown mixtures or mouldy food, or look directly at the Sun. A starch test belongs with a trained adult. We can revise the idea safely using explanations and drawings.',
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

function findWords(target) {
  return glossaryIndex.get(target) || [];
}

function wordQuestion(match) {
  const names = match.matchedPart ? [match.matchedPart.term, ...match.matchedPart.aliases, match.entry.term] : [match.entry.term];
  const name = names.find((item) => {
    const key = normalizeQuery(item);
    if (ambiguousWords[key]) return false;
    const matches = findWords(key);
    return matches.length === 1 && matches[0].entry.id === match.entry.id;
  }) || match.entry.term;
  return { label: name, question: `Explain ${name}` };
}

function clarifyWords(matches, message, context = null) {
  const unique = [...new Map(matches.map((match) => [`${match.entry.id}:${match.matchedPart?.term || ''}`, match])).values()].slice(0, 4);
  return result('clarify', 'Let’s choose the meaning', message, unique.flatMap((match) => topicIdsFor(match.entry)), context, unique.map(wordQuestion));
}

function spellingSuggestions(target) {
  if (!/^[a-z]{6,24}$/.test(target)) return [];
  const candidates = [...glossaryIndex.entries()].filter(([name]) =>
    /^[a-z]{6,24}$/.test(name) && name[0] === target[0] && Math.abs(name.length - target.length) <= 2);
  const close = candidates.map(([name, matches]) => ({ name, matches, distance: editDistance(target, name) }))
    .filter((item) => item.distance <= (target.length >= 9 ? 2 : 1) && 1 - item.distance / Math.max(target.length, item.name.length) >= 0.82)
    .sort((a, b) => a.distance - b.distance);
  if (!close.length) return [];
  return close.filter((item) => item.distance === close[0].distance).slice(0, 3).flatMap((item) => item.matches);
}

function relatedWords(query) {
  const names = [...glossaryIndex.keys()].filter((name) => name.length >= 4 && hasPhrase(query, name))
    .sort((a, b) => b.length - a.length);
  const matches = [];
  const included = [];
  for (const name of names) {
    if (included.some((other) => hasPhrase(other, name))) continue;
    included.push(name);
    const ambiguous = ambiguousWords[name];
    matches.push(...(ambiguous ? ambiguous.names.flatMap((item) => findWords(normalizeQuery(item))) : findWords(name)));
  }
  return [...new Map(matches.map((match) => [`${match.entry.id}:${match.matchedPart?.term || ''}`, match])).values()].slice(0, 3);
}

const ambiguousWords = {
  root: { names: ['tooth root', 'plant root'], message: 'Do you mean a tooth’s root, or a plant’s roots?' },
  vein: { names: ['leaf vein', 'blood vein'], message: 'Do you mean a leaf pathway, or a blood vessel?' },
  pulp: { names: ['tooth pulp', 'paper pulp'], message: 'Do you mean the inside of a tooth, or fibres used for paper?' },
  fibre: { names: ['dietary fibre', 'clothing fibre'], message: 'Do you mean fibre in food, or strands used for clothing?' },
  mineral: { names: ['minerals in food', 'humus and minerals'], message: 'Do you mean mineral nutrients in food, or minerals in rocks and soil?' },
  gum: { names: ['gums', 'plant gum'], message: 'Do you mean tissue around teeth, or the sticky substance from some plants?' },
  decay: { names: ['decomposition', 'tooth decay'], message: 'Do you mean dead material breaking down, or damage to a tooth?' },
};

function withSpellingNote(reply, value) {
  if (reply.kind !== 'answer') return reply;
  const plain = ` ${plainWords(value)} `;
  const correction = spellingCorrections.find(([from]) => plain.includes(` ${from} `));
  if (!correction) return reply;
  return { ...reply, correction: { from: correction[0], to: correction[1] },
    text: `Did you mean "${correction[1]}"? Here is that word.\n\n${reply.text}` };
}

function evidenceFor(prepared, queryTerms, query) {
  const subjectMatches = prepared.subjects.filter((subject) => hasPhrase(query, subject));
  if (!subjectMatches.length || !queryTerms.length) return null;
  const supported = queryTerms.filter((token) => prepared.vocabulary.has(token));
  const coverage = supported.length / queryTerms.length;
  if (coverage < 1) return null;
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

export function getReply(value, context = null, selectedChapterId = DEFAULT_CHAPTER_ID) {
  const validated = validateQuestion(value);
  if (!validated.valid) return result('invalid', 'A small nudge', validated.message);
  const query = normalizeQuery(validated.value);
  const request = parseWordRequest(query);
  const matches = findWords(request.target);
  const named = namedTargets(request.target);
  const namedMatches = named.map(findWords);
  const knownPair = named.length > 0 && namedMatches.every((items) => items.length > 0);
  const exact = questionIndex.get(query);
  const safe = safetyReply(query, Boolean(exact) || matches.length > 0 || Boolean(ambiguousWords[request.target]) || knownPair);
  if (safe) return safe;
  const lastContext = contextAnswer(context, 'answer')?.context || null;
  const answer = (reply) => withSpellingNote(reply, validated.value);

  if (['hi', 'hello', 'hey', 'hi buddy', 'hello buddy', 'good morning', 'good evening', 'how are you'].includes(query)) {
    return result('greeting', 'Hello, revision explorer!',
      'I answer from this small science guide, not an AI service. Pick a starter question or ask about one of the supplied topics. You do not need to share your name or any personal details.',
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

  const broad = broadTopicIndex.get(query);
  if (broad && (!matches.length || request.framed)) return clarification(broad.lessonIds, undefined, lastContext);
  const ambiguous = ambiguousWords[request.target];
  if (ambiguous) {
    return clarifyWords(ambiguous.names.flatMap((name) => findWords(normalizeQuery(name))), ambiguous.message, lastContext);
  }

  const mode = request.mode === 'answer' ? requestedMode(query) : request.mode;
  if (exact) return answer(lessonAnswer(exact.item.id, mode));

  const queryTerms = terms(request.framed ? request.target : query);
  const wantsComparison = ['difference', 'compare', 'versus', 'vs', 'different'].some((phrase) => hasPhrase(query, phrase));
  if (!wantsComparison && matches.length) {
    if (matches.length > 1) return clarifyWords(matches, 'That word has more than one meaning here. Which one do you want?', lastContext);
    const match = matches[0];
    if (mode !== 'answer' && !match.matchedPart && lessonIndex.has(match.entry.id)) {
      return answer(lessonAnswer(match.entry.id, mode));
    }
    return answer(glossaryAnswer(match.entry, match.matchedPart, mode));
  }
  const comparison = comparisons.find((item) => {
    const prepared = lessonIndex.get(item.lessonId);
    return item.groups.every((group) => group.some((phrase) => hasPhrase(request.target, phrase)))
      && queryTerms.length && queryTerms.every((token) => prepared.vocabulary.has(token));
  });
  if (comparison) {
    return answer(lessonAnswer(comparison.lessonId, mode));
  }
  if (knownPair) return clarifyWords(namedMatches.flat(), 'I can explain these words separately. Choose a meaning so I do not mix them up.', lastContext);
  const candidates = [...lessonIndex.values()]
    .map((prepared) => evidenceFor(prepared, queryTerms, request.framed ? request.target : query))
    .filter(Boolean).sort((a, b) => b.score - a.score);
  if (candidates.length) {
    const top = candidates[0];
    const close = candidates.filter((item) => top.score - item.score < 0.09);
    if (wantsComparison || close.length > 1 || (queryTerms.length < 2 && /^(why|how) /.test(query))) {
      return clarification(close.length > 1 ? close.map((item) => item.id) : candidates.map((item) => item.id),
        'I can help with these guide questions, but I am not sure which explanation fits yours. Choose one so I do not guess.', lastContext);
    }
    return answer(lessonAnswer(top.id, mode));
  }
  const closeWords = spellingSuggestions(request.target);
  if (closeWords.length) {
    return clarifyWords(closeWords, 'I could not match that spelling. Did you mean one of these words?', lastContext);
  }
  const wordChoices = relatedWords(query).map(wordQuestion);
  const choices = [...wordChoices, ...suggestions(selectedStarters(selectedChapterId))].slice(0, 4);
  return result('unknown', 'Let’s try that wording again',
    'I could not match that word or question yet. Try the science word on its own, ask what it means, or choose a question below. I only use this small local guide, so I will not guess.',
    [], lastContext, choices);
}

export function searchGlossary(value, chapterId = null) {
  const query = normalizeQuery(value);
  const wanted = query.split(' ');
  return glossarySearchIndex.filter(({ entry, names }) => {
    if (chapterId && !topicIdsFor(entry).includes(chapterId)) return false;
    if (!query) return true;
    return names.some((name) => {
      const words = name.split(' ');
      return words.some((_, start) => wanted.every((token, offset) =>
        offset === wanted.length - 1 ? words[start + offset]?.startsWith(token) : words[start + offset] === token));
    });
  }).map(({ entry }) => entry).sort((a, b) => a.term.localeCompare(b.term, 'en'));
}

// Index only fixed guide phrases, never children's questions or chat history.
const fixedPhrases = [
  ...healthPhrases, ...hazards, ...heatActions, ...actionRequests,
  ...routes.flatMap((item) => [...item.groups.flat(), ...(item.unless || [])]),
  ...comparisons.flatMap((item) => item.groups.flat()),
  ...knowledge.flatMap((item) => item.subjects),
  'example', 'examples', 'simply', 'simpler', 'simple words', 'more', 'test starch',
  'steps', 'experiment', 'try', 'at home', 'can i', 'should i', 'do i', 'how to',
  'how do i', 'how can i', 'how do we', 'how can we', 'heat water', 'heat salt',
  'boil water', 'cut a', 'cut the', 'burn a', 'burn the', 'eat mould', 'eat mouldy',
  'taste mould', 'taste mouldy', 'grow mould', 'drink muddy', 'drink salt water',
  'look directly at the sun', 'look at the sun', 'look at sun', 'binoculars',
  'use a telescope', 'catch a snake', 'touch a snake', 'feed wild animals',
  'capture wild animals', 'how to hunt', 'how do i hunt', 'make an electrical circuit',
  'chlorine', 'chlorination', 'add', 'dose', 'use at home',
  'difference', 'compare', 'versus', 'vs', 'different', 'carbon dioxide',
  'cook', 'fry', 'frying', 'pickling', 'canning', 'make pickles',
  'eat spoiled', 'eat spoilt', 'taste spoiled', 'taste spoilt',
];
for (const phrase of fixedPhrases) {
  const normalized = normalizeQuery(phrase);
  phraseIndex.set(phrase, normalized);
  phraseIndex.set(normalized, normalized);
}
