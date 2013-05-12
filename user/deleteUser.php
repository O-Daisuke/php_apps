<?php

require_once('../common/config.php');
require_once('../common/functions.php');

$id = $_POST['ID'];

if($id != ''){
  $dbh = connectDb();
  $sql = "delete from users where id = :id";
  $stml = $dbh->prepare($sql);
  $param = array(':id'=>$id);
  $stml->execute($param);
}

header('Location:'.SITE_URL.'/user/index.php');