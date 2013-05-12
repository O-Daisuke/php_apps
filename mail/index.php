<?php

require_once('../common/config.php');
require_once('../common/functions.php');

session_start();

hasSession();

// ---- メール送信TEST ----
/*
mb_language("japanese");
mb_internal_encoding("UTF-8");

$name = '[自動送信]';
$email = 'do5843@gmail.com';
$header = 'From :'.mb_encode_mimeheader($name).'<'.$email.'>';

$result = mb_send_mail("do5843@gmail.com", '[ TEST ]', mb_convert_encoding("メール送信テスト","JIS","UTF-8"),$header);

if($result){
    echo '送信成功！';
}else{
    echo '送信失敗！';
}
*/
// ---- メール送信TEST ----
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>G-Mail</title>
    <?php echo setCSS(); ?>
    <?php echo setScript(); ?>
    <script src="https://www.google.com/jsapi"></script>
    <script src="../public/js/mail.js" type="text/javascript"></script>
</head>
<body>
  <?php echo setNavbar('MAIL');?>
<div class="container-fluid">
   <div class="row-fluid">
<blockquote><h2>Gmail</h2></blockquote>

   </div><!-- row -->
</div><!-- container -->
</body>
</html>


