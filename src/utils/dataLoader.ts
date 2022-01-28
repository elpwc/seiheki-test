/**
 * 从/data加载性癖数据，导出为seiheki_json
 * @author wniko
 */
import _ from 'lodash';
import lv1 from '../data/seiheki_lv1.json';
import lv2 from '../data/seiheki_lv2.json';
import lv3 from '../data/seiheki_lv3.json';
import lv4 from '../data/seiheki_lv4.json';
import lv5 from '../data/seiheki_lv5.json';

/*
const seiheki_json = _.map(_.range(1, 6), async (n) => {
  return await import(`./data/seiheki_lv${n}.json`).then((module) => {
    console.log(module);
    return module;
  });
});
*/
const seiheki_json = [lv1, lv2, lv3, lv4, lv5];
export default seiheki_json;
