const getPreviewText = (text: string, maxChars = 90) => {
  if (!text) return "No articles details";
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + "...";
};

export default getPreviewText;
