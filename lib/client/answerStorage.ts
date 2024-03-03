const prefix = 're:';

export function setAnswersBySlug(slug: string, answers: object) {
  const key = `${prefix}${slug}`;
  sessionStorage.setItem(key, JSON.stringify(answers));
}

export function getAnswersBySlug(slug: string): object {
  const key = `${prefix}${slug}`;
  const answers = sessionStorage.getItem(key);

  if (!answers) {
    return {};
  }

  try {
    return JSON.parse(answers) as object;
  } catch {
    return {};
  }
}

export function getAllAnswers(): { [key: string]: object } {
  const keys = Object.keys(sessionStorage);
  const answers = keys.reduce<{ [key: string]: object }>((acc, key) => {
    if (key.startsWith(prefix)) {
      const slug = key.slice(prefix.length);
      const value = getAnswersBySlug(slug);
      acc[slug] = value;
    }

    return acc;
  }, {});

  return answers;
}
