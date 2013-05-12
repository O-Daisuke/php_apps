/* ================================================================================================
 * Popover Custom Utility for the bootstrap-popover.js
 *   bootstrap-popoverの詳細は"http://twitter.github.com/bootstrap/javascript.html#popovers"を参照
 * 
 *  @ How to Use @
 *    1. Required Plugin
 *       bootstrap-tooltip.js (Bootstrap jQuery plugins)
 *       bootstrap-popover.js (Bootstrap jQuery plugins)
 *       sendRequest.js (BaseModuleに格納)
 *       public-util.js (BaseModuleに格納)
 *    2. Using Popover
 *       - 本JSを読込み時に自動実行し、タグ属性に「rel="popover"」を持つエレメント全てを対象とする
 *       - ex : scriptタグに「autorun="false"」を指定した場合は自動読込みを行わない
 *              その場合は、initPopoverをコールする
 *    3. 表示コンテンツの設定
 *       - タグ内に「data-original-title="タイトル"」「data-content="表示内容"」を記述してある場合は
 *         popoverがusingされた時点で使用可能
 *       - 動的に追加する場合は、タグのイベントから「registerPopContents」「registerPopContentsAndShow」
 *         「generatePopByResponseAndShow」などをコールし動的に生成を行う
 * 
 *  @ Used Example @
 *    1. 自動読込みの設定
 *      1-1. 自動読込みなしの設定「autorun="false"」
 *             <script src="hoge/popover-util.js" autorun="false" type="text/javascript" charset="utf-8"></script>
 *
 *    2. initPopover
 *      2-1. カスタムオプションを指定してUsingする
 *             initPopover(1); // PopoverCustomOptions内の定義番号を渡す
 *
 *      2-2. セレクタを指定してUsingする
 *             initPopover(0, '#element_id'); // id="element_id"のエレメントのみを指定 (カスタムオプション指定可)
 *
 *    3. データ登録アクション
 *      3-1. registerPopContents / registerPopContentsAndShow(明示的に表示する) メソッド
 *             [html] : <a rel="popover" href="javascript:void(0);" onmouseover="registerPopContents($(this), 'タイトル', '表示内容');"
 *                      ＊$elementは、jQueryObjectにして渡すこと
 *
 *      3-2. generatePopByResponseAndShow メソッド
 *             [html] : <a rel="popover" href="javascript:void(0);" onmouseover="popUsersList($(this), 123);"
 *                      ＊$elementは、jQueryObjectにして渡すこと
 *             [js]   : finction popUsersList($element, key) {
 *                          generatePopByResponseAndShow($element, "http://hoge.co.jp/users?key=" + key, "ユーザー一覧", displayFunction(dtos));
 *                      }
 *                      function displayFunction(dtos) { // jQueryによるテーブル構築の場合
 *                          var $container = $('<div />');
 *                          var $table = $('<table />').append('<thead />').append('<tbody />');
 *                          $table.children('thead').append($('<th />').text('ユーザーID')).append($('<th />').text('ユーザー名'));
 *                          for(var i = 0; i < dtos.size; i++) {
 *                              $table.children('tbody').append($('<td />').text(dtos[i].id));
 *                              $table.children('tbody').append($('<td />').text(dtos[i].name));
 *                          }
 *                          $container.append($table); // 内部のテーブルHTMLのみを戻すため一度格納
 *                          return $container.html(); // 内部のHTMLをStringで戻す
 *                          ＊popoverの表示内容はStringで設定するため、Stringにして戻すこと。
 *                      }
 * ================================================================================================ */

// 定数
var CTS_STRING_DEFAULT_SELECTOR = "[rel='popover']"; // デフォルトセレクタ
// グローバル変数
var saveSelectorValue = ''; // セレクタを手動設定した場合の保存用

// 読込み処理
$(function() {
    //---- 自動実行判定(※自動読込みを行わない場合は、onLoadでinitPopoverを実行)
    if($("script[src$='popover-util.js']").attr('autorun') == "false") { return; }
    //---- PopOver初期登録
    initPopover(null, CTS_STRING_DEFAULT_SELECTOR);
});

/**
 * Popover初期化処理（手動登録用）
 * @param optionType Number 独自オプションを使用する場合のタイプ番号
 *                          未設定の場合は「0」を指定
 * @param query String (option param)jQueryセレクタ
 */
function initPopover(/* Number */ optionType, /* String */ query) {
    //---- Bootstrap plug-in 読込チェック
    checkBootstrapPlugin();
    //---- セレクタチェック
    var usedQuery = CTS_STRING_DEFAULT_SELECTOR; // 初期値はデフォルト
    if(query != null && query != '') {
        // 手動設定のセレクタがある場合
        usedQuery = query;
        saveSelectorValue = usedQuery; // 保存
    }
    //---- 独自オプション番号チェック
    var options = undefined;
    if(optionType != null && optionType != 0) {
        if(typeof BrowserUtil == 'function' && BrowserUtil.isMobile) { // public-util.jsを使用
            options = PopoverCustomOptions.get(optionType, 'MOBILE');
        } else {
            options = PopoverCustomOptions.get(optionType, 'PC');
        }
    }
    //---- Using bootstrap-tooltip.js
    if(options == undefined || options == null) {
        $(usedQuery).popover(); // オプション指定なしで起動
    } else {
        $(usedQuery).popover(options); // オプション付きで起動
    }
}

/**
 * カスタムオプション定義（定型オプション）
 */
var PopoverCustomOptions = {
    PC : {
        1 : { placement : 'right'
              , delay: { show: 0, hide: 5000 }
            }
      , 2 : { placement : 'right'
              , delay: { show: 0, hide: 2000 }
            }
    }
  , MOBILE : {
        1 : { placement : 'right'
              , delay: { show: 0, hide: 5000 }
              , template : '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div style="text-align: right;"><a data-dismiss="alert" href="#close"><i class="icon-remove icon-white"></i>&nbsp;</a></div><h4 class="popover-title"></h4><div class="popover-content"><p></p></div></div></div>'
            }
      , 2 : { placement : 'right'
              , delay: { show: 0, hide: 2000 }
              , template : '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div style="text-align: right;"><a data-dismiss="alert" href="#close"><i class="icon-remove icon-white"></i>&nbsp;</a></div><h4 class="popover-title"></h4><div class="popover-content"><p></p></div></div></div>'
            }
    }
    //---- 定義データ取得関数
  , get : function(/* Number */ type, /* String */ userClient) {
        if(type == null) {
            return undefined
        }
        if(userClient == null) {
            userClient = 'PC'; // 指定なしならPC用を設定
        }
        return PopoverCustomOptions[userClient.toUpperCase()][type];
    }
}


/* アクション
==================================================== */

/**
 * ポップオーバーの表示内容を登録する
 * @param $element jQueryオブジェクト
 * @param title String 表示タイトル(文字列もしくは、HTML)
 * @param content String 表示内容(文字列もしくは、HTML)
 * 
 * Example
 *   registerPopContents($(this), 'タイトル', '表示内容');
 */
function registerPopContents(/* jQueryObject */ $element, /* String */ title, /* String */ content) {
    if($element.data && $element.data('popover')) {
        // jQueryオブジェクト且つ、popover関数がバインドされている場合
        $element.attr('data-original-title', title).attr('data-content', content); // 表示用データを追加
    }
}

/**
 * ポップオーバーの表示内容を登録し、ポップオーバーを明示的に表示する
 * @param $element jQueryオブジェクト
 * @param title String 表示タイト(文字列もしくは、HTML)ル
 * @param content String 表示内容(文字列もしくは、HTML)
 * 
 * Example
 *   registerPopContentsAndShow($(this), 'タイトル', '表示内容');
 */
function registerPopContentsAndShow(/* jQueryObject */ $element, /* String */ title, /* String */ content) {
    if($element.data && $element.data('popover')) {
        // jQueryオブジェクト且つ、popover関数がバインドされている場合
        $element.attr('data-original-title', title).attr('data-content', content); // 表示用データを追加
        $element.popover('show'); // ポップオーバーを表示
    }
}

/**
 * ポップオーバーの表示内容をJsonp形式で取得し、ポップオーバーを明示的に表示する
 * @param $element jQueryオブジェクト
 * @param title String 表示タイトル(文字列もしくは、HTML)
 * @param content String 表示内容(文字列もしくは、HTML)
 * @param callback function データ整形処理用の関数 (※この関数は、戻り値がStringであること！)
 * 
 * Example
 *   generatePopByResponseAndShow($(this), 'データ取得先URL' 'タイトル', );
 */
function generatePopByResponseAndShow(/* jQueryObject */ $element
                                    , /* String */ url
                                    , /* String */ title
                                    , /* function */ callback) {
    //---- 現在表示されているポップオーバーを非表示
    hidePopovers();
    //---- データ制御処理
    if($element.length > 0 && url && $.isFunction(callback)) {
        //---- リクエスト送信
        sendRequestToRetrieveJsonp('GET', url, null, function(dtos) {
            registerPopContentsAndShow($element, title, callback(dtos)); // ポップオーバー表示
        });
    }
}

/* 業務処理メソッド
 ==================================================== */
/**
 * 必須プラグインの読込チェック（開発時確認用なので後で消すかも）
 */
function checkBootstrapPlugin() {
    if($.isFunction($.fn.tooltip) == false) {
        alert('bootstrap-tooltip.js が読込まれていません。');
        return;
    }
    if($.isFunction($.fn.popover) == false) {
        alert('bootstrap-popover.js が読込まれていません。');
        return;
    }
    if(typeof(sendRequestToRetrieveJsonp) == 'undefined') {
        alert('sendRequest.js が読込まれていません。');
        return;
    }
}

/**
 * ページ上のポップオーバーを全て非表に移行
 */
function hidePopovers() {
    $(CTS_STRING_DEFAULT_SELECTOR).popover('hide');
    if(saveSelectorValue == '') {
        // 手動設定のセレクタがある場合
        $(saveSelectorValue).popover('hide');
    }
}
