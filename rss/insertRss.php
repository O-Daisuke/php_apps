<?php

require_once('../common/config.php');
require_once('../common/functions.php');

$name = $_GET['NAME'];
$url  = $_GET['URL'];

if($name != '' && $url != ''){
   $dbh = connectDb();
   $sql = "insert into rsstitle
         (name,url,readnum,created,modified)
         values
         (:name,:url,'10',now(),now())";
   $stml = $dbh->prepare($sql);
   $params = array(":name"=>$name,":url"=>$url);
   $stml->execute($params);
}

header('Location:'.SITE_URL.'/rss/index.php');