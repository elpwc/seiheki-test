/**
 * 数据库交互
 * @author wniko
 */
import axios from 'axios';
import type UserRecord from './record';

/**
 * 添加结果
 * @param record
 */
export const addRecord = (record: UserRecord) => {
  return new Promise((resolve: (value: any) => void, reject: (reason?: any) => void) => {
    axios.post('./add_record.php', record).then((res) => {
      resolve(res?.data);
    });
  });
};

/**
 * 获取排行榜
 * @param params
 * @returns
 */
export const getRecords = (params: Types.GetRecordsParams) => {
  return new Promise((resolve: (value: UserRecord[]) => void, reject: (reason?: any) => void) => {
    axios.get('./get_records.php', { params }).then((res) => {
      resolve(res?.data);
    });
  });
};
