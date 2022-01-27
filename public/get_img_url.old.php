<?php

$json = file_get_contents('php://input');
$data = json_decode($json);

@$tag = $data->tag;
@$r18 = $data->r18;
@$size = $data->size;

const LOLICONAPI_BASE = 'https://api.lolicon.app/setu/v2';

function get_GET_params($tag, $r18, $size)
{
    $res = '?';
    if (isset($tag)) {
        $res .= '&tag=' . $tag;
    }
    if (isset($r18)) {
        $res .= '&r18=' . $r18;
    }
    if (isset($size)) {
        for ($i = 0; $i < count($size); $i++) {
            $res .= '&size=' . $size[$i];
        }
    }
    return $res;
}

function get_setu_data($url)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
    $data = curl_exec($curl);
    $error = '';
    if ($data === FALSE) {
        $error = curl_error($curl);
    }
    curl_close($curl);

    return [
        'error' => $error,
        'data' => json_decode($data)
    ];
}


/**
 * @see https://api.lolicon.app/#/setu
 */
$queryURL = LOLICONAPI_BASE . get_GET_params($tag, $r18, $size);
$res = get_setu_data($queryURL);

echo json_encode($res);
