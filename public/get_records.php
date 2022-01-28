<?php

/**
 * 从服务器下载结果
 */

require './private/dbcfg.php';
require './utils.php';

@$ip_ori = $_GET['ip'];
@$count_ori = $_GET['count'];

$ip = '';
$count = '';
if (is_numeric($count_ori)) {
    $count = $count_ori;
}
if (isset($ip_ori)) {
    $ip = trim(anti_inj((string)$ip_ori));
}

$sqllink = @mysqli_connect(HOST, USER, PASS, DBNAME) or die('数据库连接出错');
mysqli_set_charset($sqllink, 'utf8');

$sql = 'SELECT ' . (($count != '') ? ('TOP ' . $count) : '') . ' *
            FROM records
            ' . (($ip != '') ? ('WHERE ip="' . $ip . '"') : '') . '
            ORDER BY score DESC
            ';

$result = mysqli_query($sqllink, $sql);

$res = [];
[
    'name' => '',
    'score' => 0,
    'ip' => '',
    'position' => ''
];


if ($result->num_rows > 0) {
    $i = 0;
    while ($row = $result->fetch_assoc()) {
        array_push($res, [
            'name' => $row['name'],
            'score' => (int)$row['score'],
            'ip' => $row['ip'],
            'position' => $row['position']
        ]);
        $i++;
    }
}

echo json_encode($res);
