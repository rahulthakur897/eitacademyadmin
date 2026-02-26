export const generateSlug = (text :any) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove multiple hyphens
};

export const getSessionData = (key: string) => {
  if (typeof window !== "undefined") {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : "";
  }
  return {};
};