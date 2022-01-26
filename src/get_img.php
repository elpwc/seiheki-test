<?php
require './pixiv_api_php/PixivAppAPI.php';

$userid = $_POST['userid'];


$api = new PixivAppAPI;
$result = $api->user_detail($userid);

echo json_encode($result);
