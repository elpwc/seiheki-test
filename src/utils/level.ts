/**
 * 性癖等级
 * @author wniko
 */
export default interface Level {
  title: string;
  level: number;
  color: string;
  description?: string;
}

/**
 * 性癖等级Builder
 * @param title 标题
 * @param level 等级
 * @param color 背景色
 * @param description 描述文本
 * @returns 性癖等级对象
 */
export const LevelBuilder = (title: string, level: number, color: string, description: string = '') => {
  return {
    title: title,
    level: level,
    color: color,
    description: description,
  } as Level;
};
