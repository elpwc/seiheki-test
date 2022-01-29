<?php

/**
 * 向服务器上传结果
 */

require './private/dbcfg.php';
require './private/illegal_words_list.php';
require './utils.php';

$json = file_get_contents('php://input');
$data = json_decode($json);

@$name = trim((string)($data->name));
@$score = trim((string)($data->score));
@$ip = trim((string)($data->ip));
@$position = trim((string)($data->position));
@$real = trim((string)($data->real));

// 处理boolean JSON, PHP会将JSON false处理为空字符串, sbphp
if ($real == '') $real = 0;

$sqllink = @mysqli_connect(HOST, USER, PASS, DBNAME) or die('数据库连接出错');
mysqli_set_charset($sqllink, 'utf8');

$sql = 'INSERT 
        INTO records (`name`, `score`, `ip`, `position`, `real`)
        VALUES ("' . cator_to_cn_censorship(anti_inj($name)) . '","' . anti_inj($score) . '","' . anti_inj($ip) . '","' . anti_inj($position) . '","' . anti_inj($real) . '");
        ';

$result = mysqli_query($sqllink, $sql);
