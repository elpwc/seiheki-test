<?php

/**
 * 获取指定Tag涩图返回前端
 * @author wniko
 */

$json = file_get_contents('php://input');
$data = json_decode($json);

@$tag = $data->tag;
@$r18 = $data->r18;
@$size = $data->size;
@$num = $data->num;

const LOLICONAPI_BASE = 'https://api.lolicon.app/setu/v2';
/**
 * @see https://api.lolicon.app/#/setu
 */
$encodeddata = json_encode([
    'r18' => (int)$r18,
    'num' => (int)$num,
    //'uid' => int[],
    //'keyword' => string,
    'tag' => $tag,
    'size' => $size,
    'proxy' => 'https://i.pixiv.re/',
    //'dateAfter' => int,
    //'dateBefore' => int,
    //'dsc' => false,
]);
echo json_encode(curlPost(LOLICONAPI_BASE, $encodeddata));


function curlPost($url, $post_data)
{
    $header  = array(
        "Content-Type: application/json; charset=utf-8",
    );

    return curl_request($url, $post_data, $header);
}

/**
 * CURL请求函数:支持POST及基本header头信息定义
 * @param [api_url:目标url | post_data:post参数 | header:头信息数组 | referer_url:来源url]
 * @return [code:状态码(200执行成功、400执行异常) | data:数据]
 */
function curl_request($api_url, $post_data = '', $header = [], $referer_url = '')
{
    $ch = curl_init(); //初始化CURL句柄
    curl_setopt($ch, CURLOPT_URL, $api_url);

    /**配置返回信息**/
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //获取的信息以文件流的形式返回，不直接输出
    curl_setopt($ch, CURLOPT_HEADER, 0); //不返回header部分

    /**配置超时**/
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10); //连接前等待时间,0不等待
    curl_setopt($ch, CURLOPT_TIMEOUT, 5); //连接后等待时间,0不等待。如下载mp3

    /**配置页面重定向**/
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); //跟踪爬取重定向页面
    curl_setopt($ch, CURLOPT_MAXREDIRS, 10); //指定最多的HTTP重定向的数量
    curl_setopt($ch, CURLOPT_AUTOREFERER, 1); // 自动设置Referer

    /**配置Header、请求头、协议信息**/
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_ENCODING, ""); //Accept-Encoding编码，支持"identity"/"deflate"/"gzip",空支持所有编码
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36 Edg/96.0.1054.29"); //模拟浏览器头信息
    $referer_url && curl_setopt($ch, CURLOPT_REFERER, $referer_url); //伪造来源地址
    //curl_setopt( $ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1 );    //设置curl使用的HTTP协议

    /**配置POST请求**/
    curl_setopt($ch, CURLOPT_POST, 1); //支持post提交数据
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data); //


    /**禁止证书验证防止curl输出空白**/
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); //禁止 cURL 验证对等证书
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); //是否检测服务器的域名与证书上的是否一致

    $code = 200; //执行成功
    $data = curl_exec($ch);
    //捕抓异常
    if (curl_errno($ch)) {
        $code = 400; //执行异常
        $data = curl_error($ch);
    }
    curl_close($ch);

    return ['code' => $code, 'data' => json_decode($data)];
}
