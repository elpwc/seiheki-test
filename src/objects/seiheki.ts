export default interface Seiheki {
  title: string;
  level: number;
  score: number;
  description?: string;
}

export const SeihekiBuilder = (title: string, level: number, score: number, description: string = '') => {
  return {
    title: title,
    level: level,
    score: score,
    description: description,
  } as Seiheki;
};
