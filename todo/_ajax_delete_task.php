<?php

require_once('../common/config.php');
require_once('../common/functions.php');

$dbh = connectDb();

$sql = "delete from tasks where id = :id";
$stml = $dbh->prepare($sql);
$stml->execute(array(":id"=>(int)$_POST['id']));