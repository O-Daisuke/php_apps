<?php 

require_once('./common/config.php');
require_once('./common/functions.php');

session_start();

?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<title>ログイン</title>
	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>-->
    <?php echo setCSS()?>
    <?php echo setScript()?>

</head>
<body style="text-align:center">
<div class="container-fluid">
	<div class="row-fluid">
		<form action="index.php" method="POST">
	　　 <fieldset>
		<legend><h2>Login Form</h2></legend>
		  <label>ID：&nbsp;&nbsp;&nbsp;<input type="text" id="name" name="name"></label>
		  <label>PASS：<input type="password" id="pass" name="pass"></label>
		  <button class="btn" type="submit"><i class="icon-share"></i>&nbsp;ログイン</button>
		  <button class="btn btn-info" type="button" onClick="location.href='/apps/user/createuser.php'"><i class="icon-user"></i>&nbsp;新規登録</button>
		</fieldset>
		</form>
	</div>
</div>
</body>
</html>