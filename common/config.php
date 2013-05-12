<?php
error_log($_SERVER["REMOTE_HOST"]);
    /* テスト環境 */
    // DB設定
    define('DSN', 'mysql:host=localhost;dbname=apps');
    define('DB_USER', 'dbuser');
    define('DB_PASSWORD', 'p@ssw0rd');
    // URL
    define('SITE_URL','http://localhost/apps');

// ディレクトリ
define('CSS_DIR','/apps/public/css');
define('JS_DIR','/apps/public/js');
define('ICON_DIR','/apps/public/img/icons');

// PASSWORD
define('PASSWORD_KEY','p@22');

// エラー設定
error_reporting(E_ALL & ~E_NOTICE);

//session_set_cookie_params(0, '/apps/login.php');
