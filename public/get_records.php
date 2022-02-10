<?php

/**
 * 从服务器下载结果
 */

require './private/dbcfg.php';
require './utils.php';

/** IP */
@$ip_ori = $_GET['ip'];
/** 个数, 不填为全部 */
@$count_ori = $_GET['count'];
/** 可信度 */
@$realType_ori = $_GET['realType']; // 0: all, 1: true, 2: false

$ip = '';
$count = '';
$realType = 0;
if (is_numeric($count_ori)) {
    $count = $count_ori;
}
if (isset($ip_ori)) {
    $ip = trim(anti_inj((string)$ip_ori));
}
if (is_numeric($realType_ori) && ((int)$realType_ori) >= 0 && ((int)$realType_ori) < 3) {
    $realType = (int)$realType_ori;
}

$sqllink = @mysqli_connect(HOST, USER, PASS, DBNAME) or die('数据库连接出错');
mysqli_set_charset($sqllink, 'utf8');

$where = '';
if ($ip != '') {
    $where .= 'ip="' . $ip . '"';
}
if ($realType != 0) {
    if ($where != '') $where .= ' AND ';
    switch ($realType) {
        case 1:
            $where .= '`real`=1';
            break;
        case 2:
            $where .= '`real`=0';
            break;
        default:
            break;
    }
}

$sql = 'SELECT ' . (($count != '') ? ('TOP ' . $count) : '') . ' *
            FROM records
            ' . (($where != '') ? ('WHERE ' . $where . ' ') : '') . '
            ORDER BY score DESC
            ';

$result = mysqli_query($sqllink, $sql);

$res = [];
/*
[
    'name' => '',
    'score' => 0,
    'ip' => '',
    'position' => '',
    'real' => 1,
    'hentai' => 0,
];
*/

if ($result->num_rows > 0) {
    $i = 0;
    while ($row = $result->fetch_assoc()) {
        array_push($res, [
            'name' => $row['name'],
            'score' => (int)$row['score'],
            'ip' => $row['ip'],
            'position' => $row['position'],
            'real' => $row['real'],
            'hentai' => $row['hentai']
        ]);
        $i++;
    }
}

echo json_encode($res);
