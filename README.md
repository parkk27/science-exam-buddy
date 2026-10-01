# Science Exam Buddy

A small, temporary **Class 4 science exam-revision supplement** for a child who
already has a textbook and school notes. English, calm practice, original
explanations, and no accounts, installation step, backend, database, or API keys.
The book and teacher's notes are authoritative for exam wording.

## What is included

**14 supplied topic guides, not the whole textbook**. Food is first and Digestion
& microbes is second; the remaining guides keep their previous relative order.

1. Food: our basic need
2. Digestion and the role of microbes
3. Clothes and fibres
4. Solids, liquids and gases
5. Soil
6. The green plants
7. How plants survive
8. Circulation and excretion
9. Animals and their young ones
10. How animals survive
11. Force, work and energy
12. Air, water and weather
13. The solar system
14. Keeping our Earth green

Each topic has a concise summary, exam checklist, everyday examples, original
visual learning sequences, suggested questions, **6 original MCQs** with
explanations, and **4 short-answer prompts** with model answers hidden until
requested. That is **84 MCQs and 56 short-answer prompts**.

The **237 unique glossary cards** cover the reviewed concepts. Related words
share some cards and have individually explained meanings that can be opened
on request. A shared card can appear in several relevant topic scopes without
being duplicated in the global list. Scope and counts are derived from the
content, not hardcoded in the interface.

Search can be limited to the selected topic or expanded to all 14 topics.
Alternate spellings include fibre/fiber, oesophagus/esophagus/food pipe,
moulting/molting, aestivation/estivation, and stoma/stomata. Common confusions
include dietary versus clothing fibre, food versus soil minerals,
blood versus leaf veins, tooth versus paper pulp, ureter versus urethra,
metamorphosis versus moulting, rotation versus revolution, and constellation
versus galaxy. Ambiguous words ask for a meaning rather than guessing.

Topic selection and four section tabs keep the guide manageable on desktop and
small mobile screens. The desktop picker has its own bounded scroll area;
mobile uses a labelled select. Labels, keyboard-operated tabs, visible focus, and live
feedback support accessibility. Practice has no timer, public score, or ranking.

## Run locally

Use **Node.js 20 or newer**. There are no package dependencies and no build step.
Do **not** run an install command; it is not needed.

```powershell
npm start
```

Open <http://127.0.0.1:4173/science-exam-buddy/>. The root URL
<http://127.0.0.1:4173/> also works. Stop the local server with **Ctrl+C**.
If that port is already in use, choose another:

```powershell
$env:PORT = 4174
npm start
```

The server binds to the local machine only and serves only the app's public
files. Opening `index.html` directly with a `file:` URL is not supported because
the app uses ES modules; serve the files over HTTP instead.

## Tests

```powershell
npm test
```

This uses the built-in `node --test` runner. It checks exact totals and all
14 topic shapes and Food-first defaults, shared glossary scope counts, concept
coverage, unique IDs and questions, correct MCQ answer indices, valid source references, all 447
curated tutor phrasings, every declared comparison, and every glossary-card
question and follow-up. It also checks aliases and misspellings,
cross-topic answers, context follow-ups, ambiguity, unknown
questions (including **brain not matching rain**), health and activity safety,
input limits, text-only chat rendering, root/subpath serving of every imported
module, dynamic count/icon surfaces, and absence of browser networking or
storage code. An independently authored source-review corpus lists **505
term/topic records** across all 14 guides and checks **5,814 child-style
questions**, rather than only iterating the implementation's own glossary.
It includes fact boxes, Word Help, and diagram labels, so a missing term such
as pedogenesis fails coverage.

For a manual smoke check, visit both local URLs. Choose another topic, search
`dietary fiber` in **All 14 topics**, open the related meanings for `ureter`, try a wrong
MCQ answer and open a short-answer
model, then ask `Why do we need food?`, `What makes a diet balanced?`,
`Compare refrigeration and deep freezing`, `Melting vs freezing`, `What is a stoma?`, `Tell me more`,
`What is a brain?`, `Compare rotation and revolution`, `Define molting`,
`What is pulp?`, and `My tooth hurts`. Check a 360px viewport, keyboard focus,
and **Clear chat**. No external resource or question request should appear in
the network log.

Also try `pedogenesis`, `edogenesis`, `What is meant by pedogenesis?`,
`can you explain photosynthesis for me?`, and `I do not understand metamorphosis`.
Neutral definitions such as `What is iodine?` must give the concept safely,
while requests such as `How do I heat a leaf in spirit?` must not give steps.

## What Ask Buddy can and cannot do

Buddy is an **honest local grounded tutor, not a generative AI service**. It
answers from **106 curated explanations and 447 question phrasings**, plus the
original glossary. Matching uses
declared aliases, bounded child-question wording, curated intent phrases,
whole-word boundaries, and conservative confidence. It does not merely return the currently selected
topic's summary.

- It explains words and common what/why/how/difference/example questions.
- It labels the source topic, gives an everyday example, and offers choices
  when a word has more than one meaning or a request is broad.
- `What is meant by X?`, `Explain X in easy words`, `Can you tell me about X
  please?`, and `I do not understand X` work as bounded term requests. Unrelated
  extra words are not discarded to force a match.
- Declared child typos, including `edogenesis` and `pedogenisis`, visibly offer
  the correct spelling **pedogenesis** with the explanation. Other close
  spellings can offer in-app choices instead of silently guessing.
- A real unmatched question says **"I could not match that word or question
  yet"** and invites rephrasing or a choice inside the app. A matching failure
  does not establish that a term is outside a child's syllabus.
- `Tell me more`, `Give an example`, and `Explain it more simply` use the last
  matched explanation, even if the topic picker has since changed. Without a
  matched topic, Buddy asks the child to choose one.
- It has no open-ended language-model reasoning, internet lookup, or coverage
  beyond these supplied topics. A useful answer is not a promise to recognize every
  possible phrasing.
- Health, pain, injury, poisoning, and medication questions direct the child to
  a trusted adult and appropriate professional, not a diagnosis or treatment.
  Dangerous experiment requests get no steps. Chemical, heating, and sharp-tool
  activities belong with a teacher or trained adult.

Fixed guide phrases and word meanings are indexed once so a larger guide does
not repeatedly process the whole dictionary on each keystroke. These indexes
contain only authored guide material, never user questions or saved chat.
Water-treatment explanations do not give boiling, chemical, or dosage steps.
Sun, electrical, invasive medical, and wildlife activity requests are guarded
too. Neutral, matched chapter vocabulary about chemicals, illness, or tools
can be explained with adult-safety notes; this is different from a request for
diagnosis, medicine, or a hazardous procedure. Food guidance is general
revision, not a personal meal plan, weight-change prescription, supplement
recommendation, or cooking/preservation procedure.

Questions are limited to **280 characters** with explicit invalid-input
feedback. Only the latest **12 exchanges** are displayed. The transcript and
practice state exist only in memory and disappear on reload. **Clear chat**
also clears the tutor's follow-up context.

There are no logins, names requested, analytics, cookies, local/session storage,
transcript persistence, question API calls, external fonts, images, CDNs, or AI
services. User text is rendered as text, never HTML. A content-security policy
also blocks network connections from app scripts. The hosting provider still
receives normal HTTP requests for the website files; that is different from
sending questions to an AI service. Children are reminded not to share personal
details. Browser-provided features, such as spellcheck, remain subject to the
browser's own settings.

## Original content and attribution

Unofficial topic reference: **New Science in Everyday Life**, Oxford University
Press, **Vaishali Gupta and Anuradha Gupta**, as identified by the family.
This app is **not an Oxford University Press product or endorsement**.

All shipped summaries, definitions, explanations, questions, and SVG/CSS
graphics are freshly created. No textbook scans, PDFs, OCR files, original
illustrations, long passages, or textbook exercises are included. Some source
pages and exercises were not supplied, so no missing chapters or page numbers
are invented. Additional supplied scans had clipped edges/gutters and repeated
material. Only confidently readable concepts are included; missing sentences,
activities, and exercises are not reconstructed. The Earth-care topic remains
a supplement to the supplied partial coverage. **Clothes and fibres** is an
honest descriptive label because its source chapter header was cropped.

The Food guide covers the readable supplied food concepts: nutrient roles,
plant/animal sources, dietary fibre and water, balanced diet, preservation
ideas, rest/posture/exercise, yoga, and food-related mass/volume units. The
preceding river-pollution activity is not treated as part of Food. Some picture
labels and edge letters are clipped; no missing material or source exercises
are reconstructed.

PDF rendering, orientation correction, and English OCR were performed locally.
Raw scans, renderings, OCR, the internal page-to-concept inventory, attachment
metadata, and local attachment paths are not part of this repository.

The guide explicitly distinguishes useful microbes from germs, puts the liver
outside the food route, separates weathering from erosion, explains filtration
limits, includes plant respiration, and corrects misleading generalizations
about evergreen teak, pitcher lids, and non-green plants. New explanations
distinguish blood and urine routes, artery/vein direction, egg-laying mammal
exceptions, water-animal lungs versus gills, seasonal survival behaviours,
mechanical work versus energy, Sun/stars versus ordinary fire, galaxies versus
constellations, and tilt plus revolution versus Sun distance for seasons.
Conservation categories are not treated as unchanging facts.

The vocabulary audit also restores source-backed words including pedogenesis,
gravel, nerve, handloom, botanist, saturated, and the historical soil words
Urvara and Usara. Weathering is one part of soil development; erosion is
removal, not another name for pedogenesis. Named examples such as yeast,
cotton, Pluto, and Orion have their own meanings instead of returning only
a broad category.

## Canonical development repository

**Sole maintained codebase:** [parkk27/science-exam-buddy](https://github.com/parkk27/science-exam-buddy).
The user has designated this personal repository as the **canonical development
repository** for the original app and its changes, including the completed
vocabulary correction. All future implementation, reviews, commits, and pushes
belong here, using the personal `parkk27` account. Preserve existing work and
remote history; never overwrite concurrent changes or force-push.

**Frozen historical code:** `kunalparekh_microsoft/science-exam-buddy`.
The Microsoft repository is retained for its existing history only, not as an
active development target. Do not write or synchronize changes back to it.
Do not delete or archive either repository, or change repository visibility,
without separate explicit user approval.

The approved frozen vocabulary correction was imported without changing its
educational app files. Only this ownership documentation and its policy tests
intentionally differ from the historical source. The supplied historical
`CHANGELOG.md` is preserved exactly; it describes an earlier presentation, not
evidence of current live hosting or a Replit action in this update.

This ownership change does not authorize new Pages configuration, external
hosting, or connections to AI, OCR, Lovable, Replit, or other external services.
Deployment actions need their own explicit approval. Existing hosting hooks
may react to a code push; report an observed automatic deployment accurately
rather than assuming that saving code cannot trigger one.

The historical target <https://parkk27.github.io/science-exam-buddy/> does not
imply that this revision is published there. Do not modify another application
or copy source scans, OCR, attachment metadata, credentials, or child details
into the repository.

The app is ordinary static HTML, CSS, and ES modules. All app assets and imports
are relative, and `.nojekyll` is included. If separately approved later,
GitHub Pages can serve this repository's **`main` / `(root)`** with no build or
dependency installation. No workflow, custom domain, or secret is required.
`.gitattributes` keeps text line endings consistently LF in Windows checkouts.

Main app files:

| File | Purpose |
| --- | --- |
| `index.html`, `styles.css` | Accessible shell, responsive layout, original icon drawings |
| `content.js`, `extra-content.js`, `food-content.js` | Food-first guides, shared glossary, practice, tutor material, and dynamic counts |
| `vocabulary.js` | Source-reviewed additions and distinct meanings, including safe concept definitions |
| `content-helpers.js` | Shared data constructors, without duplicated content-building logic |
| `tutor.js`, `word-requests.js` | Bounded wording, matching, visible spelling help, clarification, follow-ups, search, and safety |
| `dom.js`, `app.js` | Text-safe rendering and in-memory interaction |
| `assets\buddy.svg` | Original book-and-leaf graphic and favicon |
| `server.js` | Dependency-free local static preview, not a production backend |
| `tests\*.test.js` | Built-in Node tests |

## Retire the site after the exam

There is **no automatic expiry**, because no exam date was supplied.
Do not automatically delete this repository or the historical Microsoft repository.

If GitHub Pages is enabled later, an authorized owner of the **personal
repository** can retire the site through **GitHub repository Settings > Pages >
Unpublish site**. Alternatively, with the correct authenticated personal account
and explicit approval:

```powershell
gh api --method DELETE repos/parkk27/science-exam-buddy/pages
```

This removes the Pages site, **not either repository or its Git history**.
Retain the personal codebase and frozen historical repository unless the owner
separately asks for deletion. Do not re-enable Pages or republish on a later push unless asked.
Verify the public address no longer serves the app after unpublishing.
