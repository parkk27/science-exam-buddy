const suffix = / (please|for me|to me|more simply|simply|in (?:easy|simple) (?:words|language|terms)|in a simple way)$/;

// Only remove recognised request wording; never pick a word from an unrelated sentence.
export function parseWordRequest(query) {
  let target = query.replace(/^please /, '').replace(/ please$/, '');
  let mode = 'answer';
  let match;
  while ((match = target.match(suffix))) {
    if (/easy|simple/.test(match[1])) mode = 'simple';
    target = target.slice(0, match.index);
  }
  const prefixes = [
    /^compare (.+)$/,
    /^(?:what is|whats) (?:the )?difference between (.+)$/,
    /^how (?:are|is) (.+) different$/,
    /^(?:what is|whats) (?:the )?(?:meaning|definition) of (.+)$/,
    /^(?:what is|what are|whats) (?:meant by )?(?:the (?:word|term) )?(.+)$/,
    /^what (?:does|do) (.+) mean$/,
    /^who (?:is|was) (.+)$/,
    /^(?:(?:can|could|would|will) you )?(?:please )?(?:explain(?: to me)?|define(?: the (?:word|term))?|help me understand) (.+)$/,
    /^(?:(?:can|could|would|will) you )?(?:please )?tell me( more)? about (.+)$/,
    /^i (?:do not|dont|cannot|cant) understand (.+)$/,
    /^(?:the )?meaning of (.+)$/,
    /^(?:give (?:me )?an? )?example of (.+)$/,
  ];
  let framed = false;
  for (const pattern of prefixes) {
    match = target.match(pattern);
    if (!match) continue;
    framed = true;
    if (pattern.source.includes('tell me')) {
      if (match[1] && mode === 'answer') mode = 'more';
      target = match[2];
    } else {
      target = match[1];
      if (pattern.source.includes('example')) mode = 'example';
    }
    break;
  }
  target = target.replace(/^(?:a|an|the) /, '').replace(/^word /, '').trim();
  return { target, mode, framed };
}

export function namedTargets(target) {
  const items = target.split(/ (?:and|versus|vs|compared with) /);
  return items.length >= 2 && items.length <= 3 && items.every(Boolean) ? items : [];
}

export function editDistance(left, right) {
  const rows = Array.from({ length: left.length + 1 }, (_, index) => [index]);
  rows[0] = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i++) {
    for (let j = 1; j <= right.length; j++) {
      rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + (left[i - 1] === right[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && left[i - 1] === right[j - 2] && left[i - 2] === right[j - 1]) {
        rows[i][j] = Math.min(rows[i][j], rows[i - 2][j - 2] + 1);
      }
    }
  }
  return rows[left.length][right.length];
}
