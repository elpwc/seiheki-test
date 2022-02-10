/**
 * 一条 用户的结果记录
 */
interface UserRecord {
  name: string;
  score: number;
  ip: string;
  position: string;
  real: boolean;
  hentai: number;
}

export default UserRecord;

export const UserRecordBuilder = (name: string, score: number, ip: string, position: string, real: boolean, hentai: number) => {
  return {
    name,
    score,
    ip,
    position,
    real,
    hentai,
  } as UserRecord;
};
