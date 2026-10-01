import { lesson, part, word } from './content-helpers.js';

function w(id, chapterId, term, definition, example, simple, aliases = [], parts = [], relatedChapterIds = []) {
  return { ...word(id, chapterId, term, definition, example, aliases, parts), simple, relatedChapterIds };
}

export const reviewedWords = [
  w('labourer', 'food', 'Labourer', 'A person whose job involves physical work. Different jobs can involve different amounts of activity.', 'Someone moving materials at a building site does physical work.', 'A labourer does physical work as part of a job.', ['laborer', 'labourers', 'laborers']),
  w('nerve-brain', 'digestion', 'Nerve, brain & nervous system', 'Nerves carry messages between the brain, spinal cord, and other body parts. These organs and pathways form the nervous system.', 'Nerves inside tooth pulp help a tooth sense things.', 'Nerves carry messages; the brain helps coordinate body activities.', [], [
    part('Nerve', 'A pathway carrying messages between the brain, spinal cord, and body.', ['nerves']),
    part('Brain', 'An organ that helps coordinate body activities, senses, thinking, and memory. It works with nerves.', ['brains']),
    part('Nervous system', 'The body team including the brain, spinal cord, and nerves that carries and processes messages.'),
    part('Pain', 'An unpleasant feeling that can signal a problem. Tell a trusted adult about pain; this definition is not a diagnosis.'),
  ], ['circulation', 'young-animals']),
  w('gums-dentist', 'digestion', 'Gums & dentist', 'Gums are the tissues around the bases of teeth. A dentist is a trained professional who cares for teeth and gums.', 'Visit a dentist with an adult; tell the adult about tooth or gum pain.', 'Gums surround teeth. A dentist cares for teeth and gums.', [], [
    part('Gums', 'Tissues surrounding the bases of teeth.', ['gum tissue']),
    part('Dentist', 'A trained professional who checks and cares for teeth and gums.', ['dentists']),
  ]),
  w('tooth-sets', 'digestion', 'Milk & permanent teeth', 'Milk teeth are the first set, usually 20. Permanent teeth replace them as a child grows; a full adult set can have up to 32.', 'A Class 4 child can have a mixture of the two sets.', 'Milk teeth come first. Permanent teeth replace them.', ['temporary teeth'], [
    part('Milk teeth', 'The first set of teeth, usually 20, which are gradually replaced.', ['temporary teeth', 'baby teeth']),
    part('Permanent teeth', 'The later set of teeth; a full adult set can have up to 32, including wisdom teeth.'),
    part('Wisdom teeth', 'The last molars at the back of the adult mouth. Not every adult has all four.'),
  ]),
  w('tooth-decay', 'digestion', 'Tooth decay', 'Damage to a tooth caused when acids, often made by plaque bacteria using sugar, weaken its hard layers.', 'Brushing and sensible food choices help protect teeth.', 'Tooth decay is damage to a tooth, not simply its normal replacement.', ['decay of teeth', 'cavity', 'cavities']),
  w('absorption', 'digestion', 'Absorption', 'Taking a substance into something else. In digestion, nutrients pass through the small-intestine wall into the blood.', 'Digestion breaks food down; absorption takes the useful substances in.', 'Absorption means taking a substance in.', ['absorb', 'absorbed'], [], ['green-plants']),
  w('faeces', 'digestion', 'Faeces', 'Digestive waste containing material the body has not used. It leaves through the anus and is different from urine.', 'The large intestine absorbs water and helps form faeces.', 'Faeces are solid digestive waste, not urine.', ['feces', 'stool']),
  w('bile', 'digestion', 'Bile', 'A fluid made by the liver that helps with fat digestion. Food itself does not pass through the liver.', 'The liver helps digestion from beside the main food route.', 'Bile is a liver-made helper for digesting fats.'),
  w('decomposition', 'digestion', 'Decomposition', 'The breaking down of dead living material into simpler substances, helped by organisms such as many fungi and bacteria.', 'Dead leaves gradually break down and contribute organic matter to soil.', 'Decomposition breaks down dead material.', ['rotting', 'decay', 'decompose', 'decomposer', 'decomposers'], [], ['soil', 'survival', 'earth-care']),
  w('microbe-illnesses', 'digestion', 'Microbes and illness words', 'Some microbes can cause illnesses. These names are for revision, not a way to identify an illness or choose treatment.', 'If someone feels ill, a trusted adult can get appropriate medical help.', 'Illness names are not diagnoses. Ask an adult about health worries.', [], [
    part('Common cold', 'A common infection caused by viruses. This is a word meaning, not a diagnosis.'),
    part('Influenza', 'An illness caused by influenza viruses; it is also called flu.', ['flu']),
    part('Polio', 'A viral illness that can affect the nervous system. Vaccination helps protect against it.'),
    part('Typhoid', 'An illness caused by certain bacteria, often spread through unsafe food or water.'),
    part('Tuberculosis', 'A bacterial illness that often affects the lungs.', ['tb']),
    part('Cholera', 'A bacterial illness of the intestine associated with unsafe water or food.'),
    part('Ringworm', 'A fungal skin infection. Despite its name, it is not caused by a worm.'),
    part("Athlete's foot", 'A fungal infection affecting skin on the feet.', ['athletes foot']),
    part('Dysentery', 'An intestinal illness that can be caused by different microbes, not only one group.'),
    part('Malaria', 'An illness caused by certain parasites and spread by some mosquitoes.'),
    part('Food poisoning', 'Illness caused by unsafe food; microbes or harmful substances can be involved.'),
    part('Poisoning', 'Harm caused by a harmful substance entering the body. Tell a trusted adult immediately if poisoning may have happened.'),
  ]),
  w('handloom', 'clothes', 'Handloom', 'A loom operated by a person to weave yarn into cloth, rather than a motor doing the weaving.', 'Some woven fabrics are made on handlooms.', 'A handloom is a person-operated weaving tool.', ['loom']),
  w('clothes-cleaning', 'clothes', 'Detergent & dry cleaning', 'Detergent helps remove dirt from clothes. Dry cleaning is a professional cleaning process using a liquid other than ordinary washing water.', 'An adult checks the care label before choosing a cleaning method.', 'Different clothes need different cleaning methods.', [], [
    part('Detergent', 'A cleaning substance that helps remove dirt or grease. Adults should handle cleaning products.', ['detergents']),
    part('Dry cleaning', 'A professional method of cleaning some clothes without ordinary water washing.', ['dry cleaned']),
  ]),
  w('clothes-insects', 'clothes', 'Moths & silverfish', 'Some insects can damage stored fabric. A silverfish is a wingless insect, not a fish.', 'Clean, dry storage and adult care help protect delicate clothes.', 'Silverfish are insects; some insects can damage fabric.', [], [
    part('Moth', 'An insect related to butterflies. The larvae of some moths can damage fabric.', ['moths']),
    part('Silverfish', 'A small wingless insect with a silvery appearance. It is not a fish.'),
  ]),
  w('mothballs', 'clothes', 'Mothballs', 'Chemical products used by some adults to discourage fabric-damaging insects. They can be harmful and must not be handled or tasted by children.', 'Ask an adult about protecting stored clothes; do not touch mothballs.', 'Mothballs are adult-handled chemicals, not toys or food.', ['mothball']),
  w('insulation', 'clothes', 'Insulation', 'Slowing the transfer of heat. Trapped air in wool helps reduce heat loss from the body.', 'A wool scarf can help retain warmth even when it is a light colour.', 'Insulation helps heat move more slowly.', ['insulating'], [], ['animal-adaptations', 'forces']),
  w('mixture', 'matter', 'Mixture', 'Two or more substances together. Some mixtures are solutions, but a mixture with undissolved particles is not the same kind.', 'Air is a gas mixture, and sand with water is another mixture.', 'A mixture combines substances.', ['mixtures']),
  w('mist-steam', 'matter', 'Mist & visible steam', 'Mist and a visible white steam cloud contain tiny liquid water droplets. Water vapour itself is invisible gas.', 'Droplets on a cool surface are liquid, not invisible vapour.', 'Visible mist has tiny droplets; water vapour is invisible.', ['steam', 'mist'], [], ['weather']),
  w('separation-tools', 'matter', 'Filter paper, funnel & beaker', 'These are tools that can help separate or hold mixtures in a supervised science lesson.', 'A filter holds back some insoluble bits, not dissolved salt or all germs.', 'These tools are for supervised observations, not proof of safe drinking water.', [], [
    part('Filter paper', 'Porous paper that can hold back insoluble particles while liquid passes through.'),
    part('Funnel', 'A tool with a wide opening and a narrow outlet, used to guide a liquid.'),
    part('Beaker', 'A container used to hold liquids during supervised science work.'),
  ], ['weather']),
  w('pedogenesis', 'soil', 'Pedogenesis', 'Soil gradually forms and develops. Small pieces from rocks mix with decayed plant and animal material, air, and water as the soil changes over time.', 'Under plant cover, broken-down rock material and decayed leaves contribute to developing soil.', 'Pedogenesis means soil formation. Weathering is one part; erosion carries material away.', ['soil formation']),
  w('gravel', 'soil', 'Gravel', 'Small stones and pebbles that are larger than sand particles. Some soils contain gravel as well as finer particles.', 'Gravel and sand are not the same particle-size group.', 'Gravel is small stones, larger than sand.', ['pebble', 'pebbles']),
  w('soil-fertility', 'soil', 'Fertile soil & historical names', 'Fertile soil can support plant growth by supplying suitable nutrients and conditions. It is not simply soil with one exact mixture.', 'Humus can help improve soil conditions for plants.', 'Fertile soil supports plant growth.', ['fertile', 'fertility'], [
    part('Urvara', 'A historical Indian word for fertile soil in the supplied topic. It is not a modern particle-size group.'),
    part('Usara', 'A historical Indian word for non-fertile soil in the supplied topic. It is not another name for clay.'),
  ], ['earth-care']),
  w('soil-textures', 'soil', 'Soil texture words', 'Words such as gritty and sticky describe how soil feels. They are descriptions, not new soil layers.', 'Sandy soil can feel gritty; wet clayey soil can feel sticky.', 'Texture describes the feel of a material.', [], [
    part('Gritty', 'Feeling rough because of small grains.'),
    part('Sticky', 'Tending to cling to something, as wet clay can.'),
    part('Lumpy', 'Containing noticeable lumps rather than being evenly smooth.'),
    part('Drainage', 'Water moving through and away from soil instead of staying there.'),
  ]),
  w('dam-flood', 'soil', 'Dam & flood', 'A dam is a barrier used to control water flow. A flood is water covering land that is usually dry. Water management needs trained adults and careful planning.', 'Dams can affect water flow, but do not automatically prevent every flood or soil problem.', 'Dams control water; floods cover normally dry land.', [], [
    part('Dam', 'A barrier controlling water flow, sometimes used for water storage or hydroelectricity.', ['dams']),
    part('Flood', 'Water covering land that is normally dry. Stay away from floodwater and tell an adult.', ['floods']),
  ], ['weather', 'forces']),
  w('botanist', 'green-plants', 'Botanist', 'A scientist who studies plants, including their features and how they live.', 'Janaki Ammal studied plants, including different varieties of sugarcane.', 'A botanist studies plants.', ['botany']),
  w('pigment-materials', 'green-plants', 'Pigment & raw materials', 'A pigment gives colour. Raw materials are starting substances used to make something.', 'Chlorophyll is a green pigment; water and carbon dioxide are starting materials for photosynthesis.', 'A pigment gives colour; raw materials are starting substances.', [], [
    part('Pigment', 'A substance giving colour. Chlorophyll also captures light energy.', ['pigments']),
    part('Raw materials', 'Starting substances used in a process. Photosynthesis uses water and carbon dioxide.', ['raw material']),
  ]),
  w('teacher-test-materials', 'green-plants', 'Iodine & spirit', 'These substances appear in teacher-led starch-test discussions. Children must not handle them or try the test themselves.', 'Revise the starch idea using a diagram, without chemicals or heat.', 'These are adult-handled substances, not home experiment materials.', [], [
    part('Iodine', 'An element needed in tiny amounts as a nutrient. Teachers may use an iodine solution to detect starch; children must not use it.', ['iodine solution']),
    part('Spirit', 'Here, an alcohol-based liquid used in some teacher-led science work. It can burn and is not for children to handle.', ['alcohol', 'methylated spirit']),
    part('Starch test', 'A teacher-led check for starch, sometimes using iodine. Children should revise the idea without doing the chemical test.'),
  ], ['food']),
  w('landforms', 'survival', 'Plains, mountains & coast', 'Different kinds of places offer different conditions for living things.', 'A pine on a mountain and a coconut near a coast have different helpful features.', 'A plant must suit the conditions where it lives.', [], [
    part('Plain', 'A large area of mostly flat land.', ['plains']),
    part('Mountain', 'Land rising high above its surroundings.', ['mountains']),
    part('Coast', 'The area where land meets the sea.', ['coastal', 'sea coast']),
  ], ['animal-adaptations', 'weather']),
  w('plant-roots-stems', 'survival', 'Plant roots & stems', 'Roots anchor a plant and take in water and minerals. Stems support parts of the plant and transport substances.', 'Water taken in by roots travels through a plant towards its leaves.', 'Roots take in water; stems help support and transport.', [], [
    part('Plant root', 'A part anchoring the plant and taking in water and minerals.', ['plant roots', 'roots of plants']),
    part('Plant stem', 'A plant part supporting leaves and transporting substances. A cactus stem also stores water and makes food.', ['stem', 'stems']),
  ], ['green-plants', 'soil', 'earth-care']),
  w('plant-features', 'survival', 'Cones, spines & coatings', 'Plant parts and coverings can help reproduction or survival in particular conditions.', 'Pine cones protect seeds; cactus spines help reduce water loss.', 'Features help plants survive, but not every plant has the same ones.', [], [
    part('Cone', 'A seed-bearing structure of plants such as pine and fir.', ['cones']),
    part('Spine', 'In a cactus, a narrow sharp structure developed from a leaf. It helps reduce water loss.', ['plant spine', 'spines']),
    part('Thorn', 'A sharp plant structure developed from a stem. Thorns and cactus spines are not the same kind of part.', ['thorns']),
    part('Waxy coating', 'A covering that can help limit water loss or protect a surface. Its effect depends on the plant.', ['wax coating']),
    part('Fleshy stem', 'A thick, soft-looking stem that can store water, as in a cactus.'),
    part('Spongy stem', 'A stem containing spaces that can help some floating plants stay at the surface.'),
  ]),
  w('plant-products', 'survival', 'Plant products', 'Useful materials obtained from plants. A plant is also a living part of a habitat, not just a source of products.', 'Plants supply food, fibres, paper materials, wood, rubber, and gum.', 'Plants give useful materials and support living habitats.', [], [
    part('Jute', 'A plant fibre used in items such as bags and ropes.'),
    part('Bamboo', 'A grass with strong stems used for items such as baskets and furniture.'),
    part('Cane', 'A strong plant stem that can be used to make items such as baskets.'),
    part('Rubber', 'An elastic material; natural rubber comes from certain plants, while synthetic rubber is human-made.'),
    part('Plant gum', 'A sticky substance from some plants, including acacias.', ['gum from plants']),
  ], ['earth-care', 'clothes']),
  w('named-land-plants', 'survival', 'Named land-plant examples', 'These plant names appear in the supplied leaf and habitat examples. They identify plants, not new states of matter or soil types.', 'Neem is a familiar plains tree; pine has features useful in snowy mountain conditions.', 'Plant names help connect a leaf or feature to its habitat.', [], [
    part('Neem', 'A tree used as a familiar plains example in this guide.'),
    part('Peepal', 'A tree used as a familiar plains and leaf example.'),
    part('Gulmohar', 'A tree used as a familiar plains example.'),
    part('Ashok', 'A tree name used in the supplied plains and leaf examples.', ['ashoka']),
    part('Eucalyptus', 'A tree group used in the supplied leaf examples. Its leaves are different from the other pictured trees.'),
    part('Sheesham', 'A tree used as a plains example.'),
    part('Sal', 'A tree used as a land-plant example.'),
    part('Pine', 'A cone-bearing tree often with needle leaves and sloping branches.', ['pine tree']),
    part('Fir', 'A cone-bearing tree often used as a snowy mountain example.', ['fir tree']),
    part('Cactus', 'A plant with features for dry conditions, including a water-storing green stem.', ['cacti']),
    part('Babool', 'A tree used as an example of a plant suited to dry conditions.'),
    part('Date palm', 'A palm used as an example of a plant growing in dry conditions. It still needs suitable water.'),
    part('Coconut palm', 'A coastal tree that tolerates salty conditions; its fruits can float. It does not simply drink pure seawater.', ['coconut tree']),
    part('Rubber tree', 'A tree from which a liquid material is obtained to make natural rubber.'),
    part('Teak', 'A tree that is generally deciduous. It should not be memorised as an evergreen example.'),
    part('Acacia', 'A tree group including kinds used for plant gum in this guide.', ['kikar']),
    part('Redwood', 'A tree group including some very tall trees. Height is a feature, not a new plant food group.'),
  ], ['green-plants']),
  w('transport-medium', 'circulation', 'Transport & medium', 'Transport means carrying something from place to place. In this topic, blood is the medium carrying substances around the body.', 'Blood transports nutrients to different body parts.', 'Transport carries things; a medium is what they are carried through.', [], [
    part('Transport', 'Moving something from one place to another.', ['transportation']),
    part('Medium', 'A material in which something is carried or travels. Here, blood carries substances.'),
  ]),
  w('animal-growth', 'young-animals', 'Development & adult', 'Development is the series of changes as a living thing grows. An adult has reached its mature stage.', 'A chick develops into an adult chicken; a caterpillar follows a different sequence.', 'Development is growing and changing towards an adult.', [], [
    part('Development', 'The changes through which a living thing grows and matures.'),
    part('Adult', 'The mature stage of a living thing.', ['adults', 'mature']),
    part('Nest', 'A place many birds build or use for eggs and young. Not all nests are in trees.', ['nests']),
    part('Chick', 'A young bird, such as a young chicken.', ['chicks']),
    part('Hen', 'An adult female chicken. A developing chick is not yet an adult hen.'),
    part('Butterfly', 'An insect whose life cycle includes egg, caterpillar, pupa, and adult.', ['butterflies']),
  ]),
  w('fish-birds', 'animal-adaptations', 'Fish & birds', 'Animal groups are identified by features, not just where they live or whether they fly.', 'A penguin is a bird and a dolphin is a mammal, although both swim.', 'Fish and birds are different vertebrate groups.', [], [
    part('Fish', 'A vertebrate animal group generally using gills and fins in water.'),
    part('Bird', 'A vertebrate with feathers. Not every bird can fly.', ['birds']),
    part('Flightless bird', 'A bird that cannot fly, such as an ostrich or penguin.', ['flightless birds']),
    part('Bat', 'A mammal capable of powered flight. Flying does not make it a bird.', ['bats']),
  ], ['young-animals']),
  w('lungs', 'animal-adaptations', 'Lungs', 'Breathing organs that take oxygen from air and release carbon dioxide. Mammals use lungs, even when living in water.', 'A dolphin surfaces to breathe air using its lungs.', 'Lungs take oxygen from air, not dissolved oxygen from water.', ['lung'], [], ['young-animals', 'circulation']),
  w('named-animal-examples', 'animal-adaptations', 'Named animal examples', 'Animal names help connect a living thing with its group, habitat, diet, or protective feature. The same animal can belong to several of these descriptions.', 'A koala is a mammal and an arboreal animal; an octopus is aquatic but is not a fish.', 'An animal name is different from its habitat or diet label.', [], [
    part('Koala', 'A mammal used here as an example of an animal living mainly in trees.'),
    part('Camel', 'A mammal with features suited to desert conditions. Its hump stores fat, not a tank of water.'),
    part('Yak', 'A mammal with a thick coat, used as a cold mountain example.'),
    part('Octopus', 'An aquatic invertebrate with eight arms. Living in water does not make it a fish.'),
    part('Turtle', 'A reptile with a shell. Aquatic turtles still use lungs.'),
    part('Seal', 'An aquatic mammal whose fat layer helps reduce heat loss.'),
    part('Walrus', 'An aquatic mammal used in the cold-habitat examples. It breathes air with lungs.'),
    part('Gazelle', 'An animal used as an example of strong legs and speed helping escape predators.'),
    part('Raccoon', 'A mammal used as an omnivore example.'),
    part('Stick insect', 'An insect whose shape and colour can help it resemble a twig.'),
    part('Chameleon', 'A reptile that can change colour for several reasons, not just to match a background.'),
    part('Dodo', 'A bird species that is extinct; no members remain alive.'),
    part('Passenger pigeon', 'A bird species that is extinct.'),
    part('Giant panda', 'A mammal needing habitat protection. Older casual conservation labels should not be treated as permanent.', ['panda']),
    part('Tiger', 'A large carnivorous mammal that needs protected habitat.'),
  ]),
  w('tools', 'forces', 'Tools and their parts', 'Tools help with tasks, but sharp tools and heavy work need adult handling.', 'Learn the machine idea from a picture rather than using a sharp tool.', 'These tool examples are for revision, not instructions.', [], [
    part('Scissors', 'A cutting tool with two blades joined at a pivot. Each handle acts as a lever. Adults should guide use.'),
    part('Screwdriver', 'A tool used to turn screws. Children should not use it to open devices or sockets.'),
    part('Axe', 'A sharp tool with a wedge-shaped cutting edge. It is for adult handling.'),
    part('Knife', 'A sharp cutting tool. Children need adult help and should never use one for an experiment alone.', ['knives']),
  ]),
  w('saturated', 'weather', 'Saturated', 'Containing as much of something as it can under given conditions. Saturated air has reached its water-vapour limit at that temperature.', 'A soaked sponge is a simple everyday example of saturation.', 'Saturated means it has reached a limit under those conditions.', ['saturation']),
  w('habitat-threats', 'earth-care', 'Habitat loss and harmful changes', 'Changes can damage habitats or reduce the resources wildlife needs. Conservation protects places as well as individual animals.', 'Clearing a forest removes homes and food for many living things.', 'Protect habitats before their living connections are lost.', [], [
    part('Habitat loss', 'The loss or damage of a living thing\'s home environment.'),
    part('Mining', 'Removing useful materials from the ground. Poorly managed mining can damage habitats.'),
    part('Hunting', 'Seeking and capturing or killing animals. Hunting protected wildlife can threaten species.'),
    part('Pollution', 'Harmful substances or changes introduced into the environment.'),
  ], ['animal-adaptations']),
];

export const reviewedLessons = [
  lesson('pedogenesis', 'soil', 'How does pedogenesis form soil?',
    ['What is pedogenesis?', 'How does pedogenesis form soil?', 'Is pedogenesis the same as weathering?', 'How is pedogenesis different from erosion?'],
    ['pedogenesis', 'soil formation', 'weathering', 'erosion'],
    'Pedogenesis means soil formation. Weathering supplies broken-down rock material. This material becomes mixed with decayed organic matter, water, and air as soil develops. Weathering is one part of that wider process. Erosion is different: it removes and carries material away.',
    'Pedogenesis makes and develops soil. Weathering breaks rock down. Erosion carries material away.',
    'Soil develops slowly, and its speed varies with the place and conditions. It is not just sand appearing at once. Humus comes from decayed living material and helps soil support plants.',
    'Under plant cover, weathered rock material and decayed leaves contribute to developing soil.',
    'soil formation forms develops development gradual slowly humus rock rocks particles water air decayed material break breaks carries removes'),
];

export const reviewedComparisons = [
  { groups: [['pedogenesis', 'soil formation'], ['weathering']], lessonId: 'pedogenesis' },
  { groups: [['pedogenesis', 'soil formation'], ['erosion']], lessonId: 'pedogenesis' },
];

export function enrichReviewedVocabulary(glossary) {
  const update = (id, fields) => {
    const entry = glossary.find((item) => item.id === id);
    if (!entry) throw new Error(`Cannot enrich missing glossary card: ${id}`);
    Object.assign(entry, fields);
  };
  update('digestion', { aliases: ['digestive system'], parts: [
    part('Digestive system', 'The body team that breaks down food, absorbs useful nutrients, and passes on unused material.'),
  ] });
  update('back-teeth', { aliases: ['back teeth'] });
  update('nutrients', { simple: 'Nutrients help the body get energy, grow, and stay healthy.' });
  update('food-fats', { simple: 'Fats provide energy. We need some fat as part of a balanced diet.' });
  update('soil', { simple: 'Soil mixes mineral particles, decayed matter called humus, air, and water.' });
  update('backbone', { simple: 'A backbone is a row of bones supporting the back and protecting the spinal cord.' });
  update('reptile', { simple: 'Reptiles, such as snakes and lizards, generally have scaly skin and breathe with lungs.' });
  update('simple-machine', { simple: 'Simple machines help by changing a force or the direction of a pull.' });
  const soilMinerals = glossary.find((item) => item.id === 'humus-minerals').parts.find((item) => item.term === 'Minerals');
  soilMinerals.aliases.push('soil minerals', 'minerals in soil');
  glossary.find((item) => item.id === 'humus-minerals').parts.push(
    part('Organic matter', 'Material from living or once-living things, such as leaves. Humus is a well-decayed part of this material.'),
  );
  update('particle', { relatedChapterIds: ['soil'] });
  const decomposition = glossary.find((item) => item.id === 'decomposition');
  decomposition.definition = 'The breaking down of material from dead living things into simpler substances, helped by organisms such as many fungi and bacteria.';
  decomposition.aliases.push('decayed');
  update('microbes', { aliases: ['microbe', 'microorganism', 'microorganisms'], parts: [
    part('Germ', 'A microbe that can cause disease. Many microbes are useful and are not germs.', ['germs']),
    part('Cell', 'A tiny basic unit of living things. Some organisms have one cell and others have many.', ['cells']),
    part('Tissue', 'A group of cells working together on a body job, such as gum tissue.', ['tissues']),
  ] });
  update('fungi', { aliases: ['fungus'], parts: [
    part('Yeast', 'A fungus used to make bread dough rise by producing gas.'),
    part('Mould', 'A fungus that can grow on food or other materials. Do not taste mouldy food.', ['mold', 'moulds', 'molds']),
  ] });
  update('protozoa', { aliases: ['protozoan'], parts: [
    part('Amoeba', 'A single-celled living thing used as a protozoan example.'),
  ] });
  update('natural-fibre', { aliases: ['natural fiber', 'natural fibres'], parts: [
    part('Cotton', 'A natural plant fibre obtained from the cotton plant.'),
  ] });
  update('synthetic-fibre', { aliases: ['synthetic fiber', 'synthetic fibres', 'man made fibre'], parts: [
    part('Nylon', 'A human-made fibre used for many fabrics. Nylon fabric is not automatically waterproof.'),
    part('Polyester', 'A human-made fibre used for many fabrics. A polyester shirt is not automatically rainwear.'),
  ] });
  update('linen', { aliases: [], parts: [
    part('Flax', 'The plant from which linen fibres are obtained.'),
  ] });
  update('silk', { aliases: [], parts: [
    part('Silkworm', 'An insect larva that produces silk fibres.', ['silkworms']),
  ] });
  update('matter-mass', { parts: [
    part('Matter', 'Anything that has mass and takes up space.'),
    part('Mass', 'A measure of the amount of matter in an object.'),
    part('Volume', 'The space something occupies. It is different from mass.'),
  ] });
  update('gas', { aliases: ['gases'], parts: [
    part('Air', 'A mixture of gases, mainly nitrogen and oxygen, with other gases too.'),
    part('Nitrogen', 'The gas making up the largest part of ordinary air.'),
    part('Cooking gas', 'A gas fuel used by adults for cooking. Children must not handle gas equipment.'),
  ] });
  update('evaporation', { aliases: ['evaporation', 'evaporate', 'evaporates', 'boiling'], parts: [
    part('Evaporation', 'A liquid changing to gas at its surface, without needing to boil.', ['evaporate', 'evaporates']),
    part('Boiling', 'A liquid changing to gas with bubbles forming throughout it. Hot liquids are for adult handling.'),
    part('Water vapour', 'Water in the gas state. It is invisible, unlike a cloud of tiny liquid droplets.', ['water vapor', 'vapour', 'vapor']),
    part('Heating', 'Transferring energy to something from a warmer source. It can warm it or change its state. Heat activities are for adult handling.'),
  ] });
  update('photosynthesis', { parts: [
    part('Photo', 'A word part meaning light, as in photosynthesis.'),
    part('Synthesis', 'Putting things together to form something; it is part of the name photosynthesis.'),
  ] });
  update('leaf-blade', { parts: [
    part('Leaf', 'A plant part that often captures light and makes food by photosynthesis. Leaves have different shapes.', ['leaves']),
  ] });
  update('botanist', { parts: [
    part('Janaki Ammal', 'An Indian botanist who studied plants, including varieties of sugarcane and brinjal.'),
  ] });
  update('food-vitamins', { aliases: ['vitamin'], parts: [
    ...glossary.find((item) => item.id === 'food-vitamins').parts,
    part('Protective foods', 'A school label for foods providing vitamins and minerals that support normal body functions, not a promise of no illness.', ['protective food']),
  ] });
  update('exercise-yoga', { aliases: [], parts: [
    ...glossary.find((item) => item.id === 'exercise-yoga').parts,
    part('International Yoga Day', 'A day observed on 21 June to recognise yoga. Children need suitable adult guidance for activities.'),
  ] });
  update('dwarf-planet', { simple: 'A dwarf planet is a solar-system body in a different category from the eight planets.' });
  const sources = glossary.find((item) => item.id === 'food-sources');
  sources.aliases = ['plant food', 'animal food'];
  sources.parts.push(part('Foodstuff', 'An item or substance used as food.', ['foodstuffs']));
  const adaptation = glossary.find((item) => item.id === 'adaptation-habitat');
  adaptation.parts.push(part('Adapt', 'To adjust to conditions. In this guide, helpful features suit a living thing to its habitat.'));
  const seasonal = glossary.find((item) => item.id === 'hibernation-aestivation');
  seasonal.parts.push(part('Scarce', 'Not much available, for example when food is in short supply.'));
  const seasons = glossary.find((item) => item.id === 'season');
  seasons.aliases = ['season', 'seasons'];
  seasons.parts.push(
    part('Summer', 'The usually warmer main season, with longer days in many places. Local patterns vary.'),
    part('Winter', 'The usually cooler main season, with shorter days in many places.'),
    part('Spring', 'A season between the main colder and warmer seasons in places using this seasonal pattern.'),
    part('Autumn', 'A season between the main warmer and colder seasons in places using this seasonal pattern.'),
  );
  const moon = glossary.find((item) => item.id === 'moon');
  moon.aliases = [];
  moon.parts.push(
    part('Chandrayaan', 'The name of India\'s Moon-exploration missions. A spacecraft is not a natural satellite.'),
    part('Chandrayaan-2', 'An Indian Moon mission launched in 2019. This is a historical fact.', ['chandrayaan 2']),
    part('Chandrayaan-3', 'An Indian Moon mission launched in 2023. This is a historical fact, not a claim about the latest mission.', ['chandrayaan 3']),
  );
  const ivory = glossary.find((item) => item.id === 'ivory');
  ivory.aliases = [];
  ivory.parts.push(part('Tusk', 'A long, enlarged tooth of some animals, such as an elephant.', ['tusks']));
  update('wind-weather-words', { aliases: [], parts: [
    ...glossary.find((item) => item.id === 'wind-weather-words').parts,
    part('Wind', 'Moving air.', ['winds']),
    part('Thunderstorm', 'A storm with thunder and lightning. Stay in a safe place with a trusted adult.', ['thunderstorms']),
  ] });
  update('water-treatment', { aliases: ['water purification', 'purification'], parts: [
    part('Water treatment', 'Processes chosen by trained adults to make water suitable for a purpose. Clear-looking water is not proof of safety.'),
    part('Chlorination', 'Controlled use of chlorine to kill many germs in water. Trained adults, not children, handle this.'),
    part('Chlorine', 'A chemical used in controlled water treatment by trained adults. It must not be handled or added by children.', ['chlorine tablet']),
  ] });
  update('mammal', { aliases: ['mammals'], parts: [
    part('Platypus', 'An egg-laying mammal. Like other mammals, its mother produces milk.', ['duck billed platypus']),
    part('Echidna', 'An egg-laying mammal sometimes called a spiny anteater. Ordinary anteaters are different mammals.', ['spiny anteater']),
    part('Whale', 'An aquatic mammal that uses lungs and surfaces for air.'),
    part('Dolphin', 'An aquatic mammal that uses lungs and surfaces to breathe through a blowhole.'),
  ] });
  const birdCard = glossary.find((item) => item.id === 'fish-birds');
  birdCard.parts.push(
    part('Penguin', 'A flightless bird adapted for swimming. It is not a mammal.'),
    part('Ostrich', 'A large flightless bird.'),
    part('Kiwi', 'A flightless bird used in this guide\'s bird examples.'),
    part('Hummingbird', 'A small flying bird. Some hummingbird species are among the smallest birds.'),
  );
  const stages = glossary.find((item) => item.id === 'maggot-nymph');
  stages.parts.push(
    part('Housefly', 'An insect whose larva is called a maggot.'),
    part('Cockroach', 'An insect whose young stages are called nymphs.'),
  );
  update('gravity', { parts: [
    part('Isaac Newton', 'A scientist who studied gravity and motion.', ['Newton']),
    part('Scientist', 'A person who investigates how the world works using observations and evidence.'),
    part('Physicist', 'A scientist studying matter, energy, and forces.'),
    part('Mathematician', 'A person studying numbers, patterns, and relationships.'),
    part('Astronomer', 'A scientist studying objects in space, such as stars and planets.'),
  ] });
  update('evolution', { parts: [
    part('Charles Darwin', 'A scientist who studied how living things change across generations.', ['Darwin']),
  ] });
  const energyForms = glossary.find((item) => item.id === 'energy-forms');
  energyForms.parts.find((item) => item.term === 'Electrical energy').aliases.push('electricity');
  update('excretion', { aliases: ['excretory'], parts: [
    part('Excretory system', 'The body team removing wastes made inside the body. The urinary parts include kidneys, ureters, bladder, and urethra.'),
  ] });
  update('amphibian', { aliases: ['amphibians'], parts: [
    part('Frog', 'An amphibian that develops from a tadpole and can use lungs and moist skin as an adult.'),
    part('Toad', 'An amphibian related to frogs. Its young usually begin life in water.'),
    part('Newt', 'An amphibian with a tail as an adult.'),
  ] });
  update('parasite-host', { parts: [
    part('Parasite', 'A living thing obtaining resources from a host, usually at the host\'s expense.', ['parasites']),
    part('Host', 'The living thing on or in which a parasite lives.'),
    part('Flea', 'A small insect that can obtain food from a living host.', ['fleas']),
    part('Louse', 'A small parasitic insect; the plural of louse is lice.', ['lice']),
    part('Tapeworm', 'A parasitic worm that can live inside a host. Health worries need an adult and professional help.', ['tapeworms']),
    part('Roundworm', 'A worm group including kinds that can live as parasites inside hosts.', ['roundworms']),
    part('Hookworm', 'A parasitic worm; do not handle parasites or choose treatments yourself.', ['hookworms']),
  ] });
  update('dwarf-planet', { aliases: ['dwarf planets'], parts: [
    part('Pluto', 'A dwarf planet in the solar system, not one of the eight planets.'),
    part('Ceres', 'A dwarf planet in the solar system.'),
    part('Eris', 'A dwarf planet in the solar system.'),
  ] });
  update('constellation', { aliases: ['constellations'], parts: [
    part('Orion', 'A constellation traditionally pictured as a hunter. It is an apparent pattern, not one nearby star.'),
    part('Ursa Major', 'A constellation traditionally called the Great Bear.'),
    part('Scorpius', 'A constellation traditionally pictured as a scorpion.', ['scorpio']),
  ] });
  update('insectivorous-plant', { aliases: ['insectivorous plants', 'carnivorous plant'], parts: [
    part('Venus flytrap', 'An insectivorous plant whose leaf traps close. It still makes food by photosynthesis.'),
    part('Pitcher plant', 'An insectivorous plant with slippery leaf traps and digestive fluid. Its lid generally does not snap shut.'),
  ] });
  update('floating-plant', { aliases: ['floating plants'], parts: [
    part('Duckweed', 'A small aquatic plant that can float freely at the water surface.'),
    part('Water hyacinth', 'A floating aquatic plant with features such as air spaces helping it stay at the surface.'),
  ] });
  update('fixed-aquatic-plant', { aliases: ['fixed plant'], parts: [
    part('Lotus', 'A fixed aquatic plant rooted below water, with stems reaching towards the surface.'),
    part('Water lily', 'A fixed aquatic plant rooted below water, often with broad floating leaves.', ['water lilies']),
  ] });
  update('underwater-plant', { aliases: ['underwater plants', 'submerged plant'], parts: [
    part('Tape grass', 'An underwater plant with long, narrow leaves.'),
    part('Pondweed', 'An aquatic plant used as an underwater example in this guide.'),
  ] });
  update('breathing-roots', { aliases: ['breathing root'], parts: [
    part('Mangrove', 'A plant of waterlogged coastal habitats; some mangroves have roots reaching above the ground for air.', ['mangroves']),
  ] });
  update('non-green-saprophyte', { aliases: ['non green plant', 'non green plants'], parts: [
    ...glossary.find((item) => item.id === 'non-green-saprophyte').parts,
    part('Indian pipe', 'A non-green plant obtaining nutrients through fungal partners, not by directly eating dead matter.'),
    part('Coralroot', 'A plant group including non-green kinds that depend on fungal partners.', ['coral root']),
  ] });
  const nonGreen = glossary.find((item) => item.id === 'non-green-saprophyte');
  nonGreen.parts[0].aliases = ['non green plants'];
  nonGreen.parts[1].aliases = ['saprophytes', 'saprophytic', 'saprophytic plant', 'saprophytic plants'];

  const examples = {
    Cell: 'A bacterium is one cell; a person has many cells.',
    Tissue: 'The gums around teeth are an example of body tissue.',
    Brain: 'Remembering a revision word involves the brain.',
    Nerve: 'Nerves in tooth pulp help a tooth sense things.',
    'Common cold': 'The common cold is a viral-illness example for revision, not a label to apply to yourself.',
    Influenza: 'Influenza and polio are different illnesses associated with viruses.',
    Polio: 'Polio belongs in the virus group in a revision comparison.',
    Typhoid: 'Typhoid is a bacterial-illness example, unlike viral influenza.',
    Tuberculosis: 'Tuberculosis is another bacterial-illness name in the guide.',
    Cholera: 'Cholera illustrates why safe drinking water matters.',
    Ringworm: 'The word ringworm names a fungal infection, not an actual worm.',
    "Athlete's foot": 'This is another fungal-infection name; an adult should help with real health concerns.',
    Dysentery: 'Different microbes can cause dysentery, so one name is not a diagnosis.',
    Malaria: 'Malaria is an illness example involving parasites, not a food-group word.',
    'Food poisoning': 'Unsafe food can cause illness; tasting suspicious food is not a safe test.',
    Cotton: 'A cotton shirt uses a plant fibre.',
    Flax: 'Linen fabric begins with fibres from flax plants.',
    Silkworm: 'Silk fibres are produced by silkworm larvae.',
    Nylon: 'Nylon can be used in fabric, but its name alone does not prove rain protection.',
    Polyester: 'A polyester sports shirt need not be waterproof.',
    'Vitamin A': 'Carrots can contribute nutrients used by the body for vitamin A.',
    'Vitamin B-complex': 'Grains and pulses can contribute different B vitamins.',
    'Vitamin C': 'Fruit and vegetables can contribute vitamin C as part of a varied diet.',
    'Vitamin D': 'Some foods, such as egg yolk, can contribute vitamin D.',
    'Vitamin E': 'Some nuts and oils contribute vitamin E as well as other nutrients.',
    'Vitamin K': 'Leafy vegetables can contribute vitamin K.',
    Calcium: 'Curd and milk can contribute calcium.',
    Iron: 'Beans and leafy vegetables can contribute iron.',
    Potassium: 'A banana contributes potassium among other nutrients.',
    'Iodine in food': 'A nutrient name on a food label is not an instruction to use iodine liquid.',
    Sodium: 'Salt contains sodium; needing sodium does not mean adding lots of salt.',
    Glucose: 'A green leaf makes glucose during photosynthesis.',
    Starch: 'A potato contains food stored as starch.',
    'Carbon dioxide': 'A green plant uses carbon dioxide from the air to make food.',
    Oxygen: 'Plants and animals use oxygen for respiration.',
    Photo: 'The photo part of photosynthesis points to the use of light.',
    Synthesis: 'Photosynthesis puts starting substances together to make food.',
    'Water vapour': 'A puddle can become invisible vapour as it dries.',
    'Filter paper': 'In a supervised diagram, filter paper holds back sand but not dissolved salt.',
    Funnel: 'A funnel shape guides liquid towards a narrower opening.',
    'Janaki Ammal': 'Janaki Ammal is a botanist example in the plant guide.',
    Iodine: 'A teacher may use an indicator for starch; the student can revise the idea without chemicals.',
    Spirit: 'A science diagram may name spirit as an adult-handled material; no procedure is needed to learn the word.',
    Neem: 'Neem is one tree in the plains and leaf examples.',
    Peepal: 'A peepal leaf can be compared with other leaf shapes in a picture.',
    Gulmohar: 'A gulmohar is a terrestrial tree, not a floating pond plant.',
    Ashok: 'Ashok and neem are different names in the leaf examples.',
    Eucalyptus: 'A eucalyptus leaf is one example showing that leaves can have different shapes.',
    Sheesham: 'Sheesham is one of the plains-tree examples.',
    Sal: 'Sal is a tree name, not a type of soil.',
    Pine: 'Sloping pine branches can help snow slide off.',
    Fir: 'Fir is another cone-bearing tree used in the mountain examples.',
    Cactus: 'A cactus stores water in its green stem.',
    Babool: 'Babool is another dry-condition plant example; not all desert plants are cacti.',
    'Date palm': 'A date palm in a dry place still needs suitable water.',
    'Coconut palm': 'A coconut fruit can float and be carried by water.',
    'Rubber tree': 'Natural rubber used in a tyre can begin as material from a rubber tree.',
    Teak: 'A teak shedding leaves in a season fits the deciduous description.',
    Acacia: 'Gum from some acacia trees is a plant product.',
    Redwood: 'A very tall redwood is still a land plant, not a special state of matter.',
    Duckweed: 'Duckweed can float freely, unlike a rooted lotus.',
    'Water hyacinth': 'Air spaces help water hyacinth float at the surface.',
    Lotus: 'A floating lotus leaf can still belong to a plant rooted below the water.',
    'Water lily': 'A water lily has roots below the water even when its leaves float.',
    'Tape grass': 'Tape grass is an underwater example with narrow leaves.',
    Pondweed: 'Pondweed is used to revise plants growing in water.',
    Mangrove: 'Some mangrove roots rise above waterlogged ground to obtain air.',
    Platypus: 'A platypus lays eggs but is still a milk-producing mammal.',
    Echidna: 'An echidna is the spiny-anteater example, not an ordinary anteater.',
    Whale: 'A whale comes to the surface for air rather than using fish gills.',
    Dolphin: 'A dolphin breathes air through a blowhole.',
    Penguin: 'A swimming penguin is a bird even though it cannot fly.',
    Ostrich: 'An ostrich shows that having feathers does not guarantee flying.',
    Kiwi: 'Kiwi is another flightless-bird example.',
    Hummingbird: 'A hummingbird is a flying bird, unlike a penguin.',
    Housefly: 'A maggot is a young housefly stage.',
    Cockroach: 'A cockroach nymph resembles a smaller adult.',
    Koala: 'A koala illustrates the arboreal habitat description.',
    Camel: 'A camel stores fat in its hump; a cactus stores water in its stem.',
    Yak: 'A yak coat helps it cope with cold mountain conditions.',
    Octopus: 'A fish has a backbone; an octopus does not.',
    Turtle: 'An aquatic turtle still needs air for its lungs.',
    Seal: 'A seal fat layer helps reduce heat loss.',
    Walrus: 'A walrus is a mammal using lungs, even though it spends time in water.',
    Gazelle: 'A gazelle escaping a predator illustrates the value of speed.',
    Raccoon: 'A raccoon is an omnivore example, not a plant-only eater.',
    'Stick insect': 'A twig-like appearance can make a stick insect harder to notice.',
    Chameleon: 'A chameleon colour change is not always just background matching.',
    Dodo: 'A dodo in a museum picture is not a living member of the species.',
    'Passenger pigeon': 'The passenger pigeon is an extinct-species example.',
    'Giant panda': 'Protecting habitat helps pandas even when conservation labels change.',
    Tiger: 'A tiger needs habitat and prey, not only a protected label.',
    Pluto: 'Pluto remains in the solar system as a dwarf planet.',
    Ceres: 'Ceres is another name in the dwarf-planet group.',
    Eris: 'Eris is not an extra member of the eight-planet order.',
    Orion: 'Orion is a star pattern, while the Milky Way is a galaxy.',
    'Ursa Major': 'The Great Bear is a traditional name for the Ursa Major pattern.',
    Scorpius: 'Scorpius is a constellation, not a planet.',
    Tusk: 'An elephant tusk is an enlarged tooth; ivory is the material in it.',
  };
  for (const entry of glossary) {
    for (const meaning of entry.parts) {
      if (examples[meaning.term]) meaning.example = examples[meaning.term];
    }
  }
}
