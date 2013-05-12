/* ========================================================
 *  公共ユーティリティ
 * ======================================================== */

/* ========================================================
 *  ブラウザ判定
 *  -- Use case --
 *    呼出しのみで使用可能
 *    Example 
 *      onload = function () {
 *          if(BrowserUtil.isIE) {
 *              // 未対応ブラウザ処理
 *          } else {
 *              // コンテンツ表示
 *          }
 *      }
 *  
 * ======================================================== */
var BrowserUtil = new function() {
    //---- プロパティ設定
    /* ユーザーエージェント */
    var userAgent  = window.navigator.userAgent.toLowerCase();
    this.userAgent = userAgent;
    /* アプリケーションバージョン */
    var appVersion = window.navigator.appVersion.toLowerCase();
    this.appVersion = appVersion;
    /* Internet Explorer */
    this.isIE       = false;
    /* Firefox */
    this.isFirefox  = false;
    /* Google Chrome */
    this.isChrome   = false;
    /* Safari */
    this.isSafari   = false;
    /* Opera */
    this.isOpera    = false;
    /* Unknown */
    this.isUnknown  = false;
    //---- ブラウザ判定処理
    if(userAgent.indexOf('msie') > -1) { this.isIE = true; }
    else if(userAgent.indexOf('firefox') > -1) { this.isFirefox = true; }
    else if(userAgent.indexOf('chrome') > -1)  { this.isChrome  = true; }
    else if(userAgent.indexOf('safari') > -1)  { this.isSafari  = true; }
    else if(userAgent.indexOf('opera') > -1)   { this.isOpera   = true; }
    else { this.isUnknown = true; }

    /* Mobile（iPhone / iPad / Android） */
    this.isMobile   = (
            userAgent.indexOf('iphone') > -1
            || userAgent.indexOf('ipad') > -1
            || userAgent.indexOf('android') > -1
    );
    /* IE Version */
    this.IEVersion  = this.isIE 
            ? (function() {
                if (appVersion.indexOf('msie 6.') > -1) { return 6; }
                if (appVersion.indexOf('msie 7.') > -1) { return 7; }
                if (appVersion.indexOf('msie 8.') > -1) { return 8; }
                if (appVersion.indexOf('msie 9.') > -1) { return 9; }
                if (appVersion.indexOf('msie 10.') > -1) { return 10; }
                return 5;
              })()
            : 0;

    return this;
};

/* ========================================================
 *  フェードインページトップボタン
 *  -- Require Css File !! --
 *    "page-top.css" by Base Module
 *  -- Use case --
 *    1. Using FadeInPageTopButton (必須プションなし)
 *      onload = function () {
 *          FadeInPageTopButton({ linktext : 'ページトップ'
 *                                , arrival : 100
 *                                , horizontal : 'left'
 *                                , vertical : 'bottom'});
 *          もしくは、
 *          FadeInPageTopButton(); // デフォルトの表示位置で起動
 *      }
 *      
 *    2. Options　(連想配列)
 *      String linktext   : 表示文字列
 *      Number arrival    : ボタン表示が開始されるスクロール座標
 *      String horizontal : 横位置 'left' / 'right'
 *      String vertical   : 縦位置 'top' / 'bottom'
 * 
 * ======================================================== */
var FadeInPageTopButton = function(options) {
    //----　オプション設定
    // デフォルトオプション
    var defaults = {
        linktext   : 'PAGE TOP'
      , arrival    : 800
      , horizontal : 'right'
      , vertical   : 'bottom'
    };
    if(options && typeof options == "object") {
        this.options = $.extend(defaults, options);
    } else {
        this.options = defaults;
    }
    //---- トップボタンタグを生成
    var $topBtn = createButton(this.options);
    $('BODY').append($('<br />')).append($topBtn.hide());

    //---- イベント登録
    // スクロールが指定位置に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > this.options.arrival) {
            $topBtn.fadeIn();
        } else {
            $topBtn.fadeOut();
        }
    });
    // スクロールしてトップへ移動
    $topBtn.click(function () {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    });
};

// ボタンエレメント生成
function createButton(options) {
    //---- エレメント生成
    $element = $('<span />').attr('id', 'page-top');
    //---- アンカー追加
    $element.append($('<a />').attr('href', '#top').text(options.linktext));
    //---- 表示位置設定
    $element.addClass(options.horizontal.toLowerCase()); // 横位置
    $element.addClass(options.vertical.toLowerCase());   // 縦位置
    return $element;
}

// =====================
//  Enterキー無効化制御
//   - Example -
//     onload = function () {
//       disablingTheEnterKey();
//     }
// =====================
/**
 * ページ内のinputタグに対して、Enterキー押下時のsubmitを無効化制御を追加
 * Chrome / Firefox / Safari 対応
 */
function disablingTheEnterKey() {
    $('input[type!="submit"][type!="button"]').keypress(function(e){
        if ((e.which && e.which == 13) 
         || (e.keyCode && e.keyCode == 13)
         || (e.charCode && e.charCode == 13)) {
            return false;
        }else{
            return true;
        }
    });
}

// =================
//  String拡張
// =================
/**
 * 日付フォーマット変換
 * yyyyMMddHHmiSS -> yyyy/MM/dd hh:mi:ss に変換
 * @param format 日付フォーマット
 * @returns Fomat Date String
 */
if (!String.prototype.dateFormat) {
    String.prototype.dateFormat = function(format) {
        //---- 対象データ
        var dateString = this.toString();
        //---- 半角数値チェック
        if(dateString.match(/[^0-9]+/)) {
            return dateString;
        }
        //---- 文字列長チェック
        if (dateString.length < 0 && 14 < dateString.length ) {
            return dateString;
        }
        //---- 日付フォーマットでフォルト定義
        var formatString = 'yyyy/mm/dd hh:mi:ss'; // 初期値はデフォルト
        if(dateString.length == 8) {
            formatString = 'yyyy/mm/dd'; // 8桁初期値
        }
        // 日付フォーマットチェック
        if(format != null && format != '') {
            formatString = format.toLowerCase()
        }
        //---- 文字列を分割
        var year    = dateString.length >= 4   ? dateString.substring(0,4)    : '';
        var month   = dateString.length >= 6   ? dateString.substring(4,6)    : '';
        var day     = dateString.length >= 8   ? dateString.substring(6,8)    : '';
        var hours   = dateString.length >= 10  ? dateString.substring(8,10)   : '';
        var minutes = dateString.length >= 12  ? dateString.substring(10,12)  : '';
        var seconds = dateString.length == 14  ? dateString.substring(12,14)  : '';
        //---- 日付形式にフォーマット
        formatString = formatString.replace('yyyy', year);
        formatString = formatString.replace('mm', month);
        formatString = formatString.replace('dd', day);
        formatString = formatString.replace('hh', hours);
        formatString = formatString.replace('mi', minutes);
        formatString = formatString.replace('ss', seconds);

        return formatString;
    };
}

/**
 * 文字列に値があるか調査
 */
if (!String.prototype.contains) {
    String.prototype.contains = function(val) {
        if(val && typeof val == 'string') {
            return (this.toString().indexOf(val) > -1);
        }
        return false;
    };
}

/**
 * 文字列フォーマット(まるめなし)
 */
if (!String.prototype.numberFormat) {
    String.prototype.numberFormat = function(decimals, prefixChar) {
        // 対象取得
        var number = (this + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number;
        // 表示する少数部
        var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
        var s = ('' + n).split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        if(prefixChar != null && typeof prefixChar == 'string') {
            return prefixChar + s.join('.'); // 接頭語追加
        }
        return s.join('.');
    };
}

/**
 * ---- White Space Trim
 */
if (!String.prototype.trim) {
    String.prototype.trim = function() {//全角半角空白を取り除く
        return this.replace(/^[\s　]+|[\s　]+$/g, '');
    };
}

/**
 * ---- Param String Is Null Or Empty
 *      return to boolean value
 */
if (!String.prototype.isNullOrEmpty) {
    String.prototype.isNullOrEmpty = function() {
        var value = this.toString();
        if (value && typeof (value) == 'string') {
            if (value.trim().length > 0) { // 空白のみの文字列は、Length０として扱う
                return false;
            }
        }
        return true;
    };
}

/**
 * ---- String Placeholder
 *  *** How to ***
 *    var years = '2012';
 *    var month = '06';
 *    var days  = '05';
 *    alert(String.format("本日は、{0}年 {1}月 {2}日です。", years, month, days));
 *    /-- OutPut --/
 *    本日は、2012年 06月 05日です。
 * @returns String
 */
if (!String.format) {
    String.format = function(format /*,arg1,arg2...*/) {
        var args = arguments; // 引数取得
        return format.replace(/\{(\d)\}/g, function(m, c) {
            return args[parseInt(c) + 1]
        });
    };
}