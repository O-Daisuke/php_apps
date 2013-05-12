// --------------------------------------------
// Ajaxリクエスト送信スクリプト
// --------------------------------------------

/**
 * リクエスト送信処理
 * @param method 'GET'/'POST'送信メソッド指定(String)
 * @param url リクエストURL
 * @param params パラメタ配列
 * @returns {objects}
 */
function sendRequest(/* String */ method, /* String */ url, /* Array */ params) {
    var objResultData = null; // 結果オブジェクトを初期化
    if(method.toUpperCase() == 'GET' || method.toUpperCase() == 'POST') {
        if(url) {
            // パラメタ文字列に変換
            var strParams = generateParameterString(params);
            // リクエスト送信
            $.ajax({
                async   : false, /* 同期通信設定 */
                type    : method,
                url     : url,
                data    : strParams,
                cache   : false,
                success : function(data) {
                    objResultData = data;
                },
                error   : function(XMLHttpRequest, textStatus, errorThrown) {
                    // 例外エラー処理（ブラウザのデバッガコンソールに出力）
                    logOutput(this.url, textStatus, errorThrown);
                    // 結果オブジェクトにnullセット
                    objResultData = null;
                },
                complete : function(XMLHttpRequest, textStatus){
                    return objResultData;
                }
            });
        }
    }
    return objResultData;
}

/**
 * リクエスト送信処理（非同期通信） 結果をJsonp方式で取得
 * @param method 'GET'/'POST'送信メソッド指定(String)
 * @param url リクエストURL
 * @param params パラメタ配列
 * @param operation 取得データ処理関数
 * @returns {objects}
 */
function sendRequestToRetrieveJsonp(/* String */ method, /* String */ url, /* Array */ params, /* function */ operation) {
    if(method.toUpperCase() == 'GET' || method.toUpperCase() == 'POST') {
        if(url && operation && operation instanceof Function) {
            // パラメタ文字列に変換
            var strParams = generateParameterString(params);
            // リクエスト送信
            jQuery.ajax({
                type        : method,
                url         : url,
                data        : strParams,
                dataType    : 'jsonp',
                jsonp       : 'jsonpcbkey',
                crossDomain : true,
                cache       : false,
                success : function(json){
                    operation(json); // 引数で渡された関数を処理
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    // 例外エラー処理（ブラウザのデバッガコンソールに出力）
                    logOutput(this.url, textStatus, errorThrown);
                }
            });
        }
    }
}

// 業務処理
// ------------------------------------------------------------

/**
 * リクエストパラメータを平文に変換
 * @param params パラメータ配列
 * @returns {String} リクエストパラメータ文字列
 */
function generateParameterString(/* Array */ params) {
    var paramString = '';
    if(params && params instanceof Array) {
        var i = 1;
        for(var key in params) {
            paramString += key + '=' + params[key];
            if(i < params.length) { paramString += '&'; };
            i++;
        }
    }
    return paramString;
}

/**
 * ブラウザのコンソールにログを出力
 * @param XMLHttpRequest
 * @param textStatus
 * @param errorThrown
 */
function logOutput(requestUrl, textStatus, errorThrown) {
    console.log('Request Fails [ Url : '+ requestUrl + ' ]\r\n'
                + 'Status : ' + textStatus  + '\r\n'
                + errorThrown);
}

