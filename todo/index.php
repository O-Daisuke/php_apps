<?php

require_once('../common/config.php');
require_once('../common/functions.php');

session_start();

hasSession();

$dbh = connectDb();
$tasks = array();

$sql ="select * from tasks where type != 'deleted' order by seq";

foreach($dbh->query($sql) as $row){
	array_push($tasks,$row);
}
?>

<!doctype html>
<html lang="ja">
<head>
	<meta charset="utf-8">
	<title>TODO APP</title>
    <?php echo setCSS(); ?>
	<link rel="stylesheet" href="../public/css/todo.css">
    <?php echo setScript(); ?>
    <script src="../public/js/todo.js"></script>
</head>
<body>
<?php //var_dump($tasks); ?>
<?php echo setNavbar('TODO');?>
<div class="container-fluid">
	<div class="row-fluid">
<blockquote><h3>TODO管理</h3></blockquote>
<div class="input-append">
	<input class="span4" type="text" id="title" placeholder="新規登録">
	<button id="addTask" class="btn btn-info" type="button"><i class="icon-pencil"></i></button>
</div>

<table id="tasks" class="table">
	<thead>
	<tr>
		<th class="th_done">No.</th>
		<th class="th_no">Done</th>
		<th class="th_title">Title</th>
		<th class="th_controller"></th>
	</tr>
	</thead>
	<tbody>
<?php foreach ($tasks as $task) : ?>
	<tr id="task_<?php echo h($task['id']); ?>" data-id="<?php echo h($task['id']); ?>">
		<td><?php echo h($task['id']); ?></td>
		<td>
			<input type="checkbox" class="checkTask" <?php if ($task['type'] == "done"){ echo "checked"; }?>>
		</td>
		<td>
		<span class="<?php echo h($task['type']); ?>"><?php echo h($task['title']); ?></span>
		</td>
		<td>
		<button class="btn btn-info <?php if($task['type']=="notyet"){ echo 'editTask';} ?>"<?php if($task['type']!='notyet'){ echo 'disabled'; } ?>><i class="icon-edit"></i></button>
		<!--<button class="drag btn"><i class="icon-hand-up"></i></button>-->
		<button class="deleteTask btn btn-danger"><i class="icon-remove"></i></button>
		</td>
	</tr>
<?php endforeach; ?>
	</tbody>
</table>
        <a href="/apps/index.php" class="btn"><i class="icon-chevron-left"></i>&nbsp;戻る</a>
	</div>
</div>
</body>
</html>