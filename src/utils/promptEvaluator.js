export function evaluatePrompt(userPrompt, rubric) {
  const prompt = userPrompt.toLowerCase();
  let specificity = 0;
  let completeness = 0;
  let clarity = 0;
  const feedback = [];

  // Completeness: check required concepts
  const maxCompleteness = rubric.requiredConcepts.reduce((sum, c) => sum + (c.weight || 1), 0);
  let foundConcepts = 0;
  rubric.requiredConcepts.forEach(concept => {
    const terms = Array.isArray(concept.terms) ? concept.terms : [concept.term || concept.terms];
    const found = terms.some(t => prompt.includes(t.toLowerCase()));
    if (found) {
      foundConcepts += concept.weight || 1;
    } else {
      feedback.push(`Missing: ${concept.label || terms[0]}`);
    }
  });
  completeness = maxCompleteness > 0 ? (foundConcepts / maxCompleteness) * 100 : 0;

  // Specificity: check for detail markers
  const maxSpecificity = (rubric.specificityMarkers || []).reduce((sum, m) => sum + (m.weight || 1), 0);
  let foundSpecificity = 0;
  (rubric.specificityMarkers || []).forEach(marker => {
    const terms = Array.isArray(marker.terms) ? marker.terms : [marker.term || marker.terms];
    const found = terms.some(t => prompt.includes(t.toLowerCase()));
    if (found) {
      foundSpecificity += marker.weight || 1;
    }
  });
  specificity = maxSpecificity > 0 ? (foundSpecificity / maxSpecificity) * 100 : 50;

  // Clarity: length, structure, no vagueness
  const minLen = rubric.minLength || 30;
  if (prompt.length >= minLen) {
    clarity += 40;
  } else {
    feedback.push('Prompt is too short — add more detail');
    clarity += Math.floor((prompt.length / minLen) * 40);
  }
  if (prompt.includes('.') || prompt.includes('\n')) clarity += 20;
  if (prompt.length > minLen * 2) clarity += 20;

  const vagueWords = ['something', 'stuff', 'things', 'whatever', 'idk', 'maybe'];
  const hasVague = vagueWords.some(w => prompt.includes(w));
  if (!hasVague) clarity += 20;
  else feedback.push('Avoid vague words like "something" or "stuff"');

  clarity = Math.min(100, clarity);

  const overall = Math.round((specificity + completeness + clarity) / 3);

  const tier = overall >= 80 ? 'high' : overall >= 50 ? 'medium' : 'low';

  return { specificity: Math.round(specificity), completeness: Math.round(completeness), clarity: Math.round(clarity), overall, tier, feedback };
}
