<?php

require_once('../common/config.php');
require_once('../common/functions.php');

session_start();

hasSession();

?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>G-Mail</title>
    <?php echo setCSS(); ?>
    <?php echo setScript(); ?>
</head>
<body>
    <?php echo setNavbar('PRICE');?>
<div class="container-fluid">
    <div class="row-fluid">
<blockquote><h2>Price</h2></blockquote>

    </div>
</div>
</body>
</html>