// This script modifies the response body of a specific URL
const urlToModify = "https://ab.chatgpt.com/v1/initialize"; // 替换为你要匹配的URL

if ($request.url.indexOf(urlToModify) !== -1) {
    let body = $response.body;
    let json = JSON.parse(body);

    // 对响应数据进行修改
    let featureGates = body["feature_gates"]

    for (const key of featureGates) {
        if (featureGates[key].value == false) {
            featureGates[key].value == true
        }
    }

    body["feature_gates"] = featureGates

    // 返回修改后的响应
    body = JSON.stringify(json);
    $done({ body });
} else {
    // 如果不匹配URL，直接返回原响应
    $done({});
}
