export function parseCaptalize(text: string) {
  if (!text) return undefined;
  const words = text.split(" ");
  return words
    .map((word) =>
      word.length == 2 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}
