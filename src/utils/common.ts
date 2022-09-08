export const capitalizeString = (name: string): string => {
  if (!name) return '';
  return `${name[0].toUpperCase()}${name.slice(1)}`;
};

export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red';
};
