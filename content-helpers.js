export function word(id, chapterId, term, definition, example, aliases = [], parts = []) {
  return { id, chapterId, term, definition, example, aliases, parts };
}

export function part(term, definition, aliases = []) {
  return { term, definition, aliases };
}

export function lesson(id, chapterId, title, questions, subjects, answer, simple, more, example, intentTerms = '', relatedChapterIds = []) {
  return { id, chapterId, title, questions, subjects, answer, simple, more, example, intentTerms, relatedChapterIds };
}
