export default function getAvatarLabel(username: string) {
  const words = username.trim().split(/\s+/);

  if (words[0] && words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  const relevantWords = words.slice(0, 2);
  const initials = relevantWords.map(word => word[0]!.toUpperCase());

  return initials.join("");
}
