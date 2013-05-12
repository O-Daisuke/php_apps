<?php 

require_once('../common/config.php');
require_once('../common/functions.php');

$dbh = connectDb();

//var_dump($_POST['task']);

parse_str($_POST['task']); //$task

//var_dump($task);

foreach ($task as $seq => $id){
	$sql = "update tasks set seq = :seq where id = :id";
	$stml = $dbh->prepare($sql);
	$stml->execute(array(":seq" => $seq,":id" => $id));
}