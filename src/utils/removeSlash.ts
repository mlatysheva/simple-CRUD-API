export const removeSlach = (str: string): string => {
  return str.replace(/^\/*|\/*$/g, "");
};