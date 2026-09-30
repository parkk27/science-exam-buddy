# Science Exam Buddy

A small, temporary **Class 4 science exam-revision supplement** for a child who
already has a textbook and school notes. English, calm practice, original
explanations, and no accounts, installation step, backend, database, or API keys.
The book and teacher's notes are authoritative for exam wording.

## What is included

Six topic sections, **not the whole textbook**:

1. Digestion and the role of microbes
2. Clothes and fibres
3. Solids, liquids and gases
4. Soil
5. The green plants
6. How plants survive

Each topic has a concise summary, exam checklist, everyday examples, an original
visual learning sequence, suggested questions, **6 original MCQs** with
explanations, and **4 short-answer prompts** with model answers hidden until
requested. That is **36 MCQs and 24 short-answer prompts**.

The **80 glossary cards** cover all required terms; closely related terms share
some cards but retain their own searchable meanings. Search can be limited to
the selected topic or expanded to all six topics. Alternate spellings such as
fibre/fiber and oesophagus/esophagus/food pipe are supported.

Topic selection and four section tabs keep the guide manageable on desktop and
small mobile screens. Labels, keyboard-operated tabs, visible focus, and live
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

This uses the built-in `node --test` runner. It checks all-six-topic content
shape, required glossary-term coverage, unique IDs, correct MCQ answer indices,
valid source references, all curated tutor questions, aliases and misspellings,
known comparisons, cross-topic answers, context follow-ups, ambiguity, unknown
questions (including **brain not matching rain**), health and activity safety,
input limits, text-only chat rendering, and root/subpath serving.

For a manual smoke check, visit both local URLs. Choose another topic, search
`fiber` in **All six topics**, try a wrong MCQ answer and open a short-answer
model, then ask `Melting vs freezing`, `What is a stoma?`, `Tell me more`,
`What is a brain?`, and `My tooth hurts`. Check a 360px viewport, keyboard focus,
and **Clear chat**. No external resource or question request should appear in
the network log.

## What Ask Buddy can and cannot do

Buddy is an **honest local grounded tutor, not a generative AI service**. It
answers from 50 curated explanations and the original glossary. Matching uses
declared aliases, curated question and intent phrases, whole-word boundaries,
and a confidence threshold. It does not merely return the currently selected
topic's summary.

- It explains words and common what/why/how/difference/example questions.
- It labels the source topic and offers choices when a request is broad or
  uncertain. Unknown or out-of-scope questions get an explicit limitation.
- `Tell me more`, `Give an example`, and `Explain it more simply` use the last
  matched explanation, even if the topic picker has since changed. Without a
  matched topic, Buddy asks the child to choose one.
- It has no open-ended language-model reasoning, internet lookup, or coverage
  beyond these six topics. A useful answer is not a promise to recognize every
  possible phrasing.
- Health, pain, injury, poisoning, and medication questions direct the child to
  a trusted adult and appropriate professional, not a diagnosis or treatment.
  Dangerous experiment requests get no steps. Chemical, heating, and sharp-tool
  activities belong with a teacher or trained adult.

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
are invented. **Clothes and fibres** is an honest descriptive label because its
source chapter header was cropped.

The guide explicitly distinguishes useful microbes from germs, puts the liver
outside the food route, separates weathering from erosion, explains filtration
limits, includes plant respiration, and corrects misleading generalizations
about evergreen teak, pitcher lids, and non-green plants.

## Private primary and public deployment mirror

**Private Microsoft primary code:** `kunalparekh_microsoft/science-exam-buddy`.
This repository owns implementation and is intended to remain private.

**Separately authorized public hosting mirror:** `parkk27/science-exam-buddy`.
The publication coordinator copies the exact finished tracked app into that
separate repository and deploys it. The intended public address is
<https://parkk27.github.io/science-exam-buddy/>; this README alone does not
claim that deployment is live.

No Microsoft-managed account is being used to create a public Microsoft repo.
Do not modify another application or copy any source scans into either repo.

The app is ordinary static HTML, CSS, and ES modules. All app assets and imports
are relative, and `.nojekyll` is included. GitHub Pages can serve public mirror
**`main` / `(root)`** with no build or dependency installation. No workflow,
custom domain, or secret is required. Keep the mirror app and README identical
to the approved primary commit; publish from that exact commit's tracked files.
`.gitattributes` keeps text line endings consistently LF for an exact mirror
from Windows checkouts.

Main app files:

| File | Purpose |
| --- | --- |
| `index.html`, `styles.css` | Accessible shell, responsive layout, original icon drawings |
| `content.js` | Six guides, glossary, practice, and curated tutor explanations |
| `tutor.js` | Local matching, clarification, follow-ups, search, input and safety guards |
| `dom.js`, `app.js` | Text-safe rendering and in-memory interaction |
| `assets\buddy.svg` | Original book-and-leaf graphic and favicon |
| `server.js` | Dependency-free local static preview, not a production backend |
| `tests\*.test.js` | Built-in Node tests |

## Retire the site after the exam

There is **no automatic expiry**, because no exam date was supplied.
Do not automatically delete either repository.

When the family is finished, an authorized owner of the **public mirror** can
open **GitHub repository Settings > Pages > Unpublish site**. Alternatively,
with the correct authenticated public-hosting account and explicit approval:

```powershell
gh api --method DELETE repos/parkk27/science-exam-buddy/pages
```

This removes the Pages site, **not either repository or its Git history**.
Retain the private primary and public mirror unless the owner separately asks
for deletion. Do not re-enable Pages or republish on a later push unless asked.
Verify the public address no longer serves the app after unpublishing.
