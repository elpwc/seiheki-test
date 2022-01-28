/**
 * 一条 用户的结果记录
 */
interface UserRecord {
  name: string;
  score: number;
  ip: string;
  position: string;
}

export default UserRecord;

export const UserRecordBuilder = (name: string, score: number, ip: string, position: string) => {
  return {
    name,
    score,
    ip,
    position,
  } as UserRecord;
};
