export default interface Level {
  title: string;
  level: number;
  color: string;
  description?: string;
}

export const LevelBuilder = (title: string, level: number, color: string, description: string = '') => {
  return {
    title: title,
    level: level,
    color: color,
    description: description,
  } as Level;
};
