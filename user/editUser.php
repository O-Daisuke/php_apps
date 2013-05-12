<?php

require_once('../common/config.php');
require_once('../common/functions.php');

session_start();

hasSession();

$user_id = $_POST['ID'];
//var_dump($user_id);
if($user_id){
    $dbh = connectDb();
    $sql = 'select * from users where id = :id';
    $stmt = $dbh->prepare($sql);
    $params = array(':id'=> $user_id);
    $stmt->execute($params);
    $user = $stmt->fetch();
      var_dump($user);
}
?>

<!doctype html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>EDIT USER</title>
    <?php echo setCSS(); ?>
    <?php echo setScript(); ?>
</head>
<body>
<?php //var_dump($tasks); ?>
<?php echo setNavbar('TODO');?>
<div class="container-fluid">
    <div class="row-fluid">
       <div class="span12">
<blockquote><h3>USER編集</h3></blockquote>
       <input type="text" value="<?php echo getChangePassword($user['password']);?>">
       </div>
    </div>
</div>
</body>
</html>