/**
 * 性癖
 * @author wniko
 */
export default interface Seiheki {
  title: string;
  level: number;
  score: number;
  description?: string;
}

/**
 * 性癖builder
 * @param title 性癖名称
 * @param level 所属等级
 * @param score 最高分值
 * @param description 描述
 * @returns 性癖对象
 */
export const SeihekiBuilder = (title: string, level: number, score: number, description: string = '') => {
  return {
    title: title,
    level: level,
    score: score,
    description: description,
  } as Seiheki;
};
