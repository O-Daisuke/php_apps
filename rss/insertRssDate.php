<?php

require_once('../common/config.php');
require_once('../common/functions.php');

   $dbh = connectDb();
   $sql = "insert into rsstitle
         (name,url,readnum,created,modified)
         values
         (:name,:url,'10',now(),now())";       
   $stml = $dbh->prepare($sql);
   $params = array(":name"=>$name,":url"=>$url);
   $stml->execute($params);
   
