/**
 * 一条 用户的结果记录
 */
interface UserRecord {
  name: string;
  score: number;
  ip: string;
  position: string;
  real: boolean;
}

export default UserRecord;

export const UserRecordBuilder = (name: string, score: number, ip: string, position: string, real: boolean) => {
  return {
    name,
    score,
    ip,
    position,
    real,
  } as UserRecord;
};
