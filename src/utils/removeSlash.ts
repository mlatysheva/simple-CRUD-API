export const removeSlash = (str: string): string => {
  return str.replace(/^\/*|\/*$/g, "");
};