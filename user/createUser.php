<?php 

require_once('../common/config.php');
require_once('../common/functions.php');

session_start();

$name = $_POST['name'];
$email = $_POST['email'];
$pass = $_POST['pass'];

$err = array();

if($name != '' && $email != '' && $pass != ''){
  //error_log('insert',0);
  $dbh = connectDb();
  error_log(getChangePassword($pass));
  $sql = "insert into users
          (name,email,password,created,modified)
          values
          (:name,:email,:password,now(),now())";
  $stmt = $dbh->prepare($sql);
  $params = array(":name"=> $name,":email"=> $email,":password"=> getChangePassword($pass));
  $stmt->execute($params);
  locationLogin();
  exit;
}

?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<title>新規ユーザー登録</title>
	<?php echo setCSS()?>
    <?php echo setScript()?>
</head>
<body>
<div class="container-fluid">
	<div class="row-fluid">
	    <blockqute><h2>新規ユーザー登録</h2></blockquote>
		<form action="" method="POST" class="form-horizontal">

	    <div class="control-group">
		  <label class="control-label">ID:</label>
		  <div class="contorls">
		　　   <input type="text" id="name" name="name" value="<?php echo h($name); ?>">
		  </div>
		</div>
		
		<div class="control-group">
		  <label class="control-label">E-MAIL:</label>
		  <div class="contorls">
		　　   <input type="text" id="email" name="email" value="<?php echo h($email); ?>">
		  </div>
		</div>
		
		<div class="control-group">
		  <label class="control-label">PASS:</label>
		  <div class="contorls">
		　　   <input type="password" id="pass" name="pass" value="<?php echo h($pass); ?>">
		  </div>
		</div>
		
		<div class="form-actions">
		   <button class="btn" type="button" onClick="JavaScript:history.back();"><i class="icon-chevron-left"></i>&nbsp;戻る</button>
		    <button class="btn btn-success" type="submit"><i class="icon-user"></i>&nbsp;登録</button>
		</div>
		</form>
	</div>
</div>