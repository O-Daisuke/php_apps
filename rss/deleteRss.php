<?php

require_once('../common/config.php');
require_once('../common/functions.php');

$id = $_GET['ID'];
error_log($id,0);
if($id != ''){
   $dbh = connectDb();
   $sql = "delete from rsstitle where id = :id";       
   $stml = $dbh->prepare($sql);
   $params = array(":id"=>$id);
   $stml->execute($params);
}

header('Location:'.SITE_URL.'/rss/index.php');