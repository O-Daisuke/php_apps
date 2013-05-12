<?php
 require_once('../common/config.php');
 require_once('../common/functions.php');

 session_start();
 
 hasSession();
 
 $users = array();
 $dbh = connectDb();
 $sql = "select * from users"; 
 
 foreach($dbh->query($sql) as $row){
	array_push($users,$row);
 }
 
 $count = $dbh->query("select count(*) from users")->fetchColumn();
 
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>USER管理</title>
    <?php echo setCSS()?>
    <?php echo setScript()?>
    <script src="../public/js/user.js" type="text/javascript"></script>
</head>
<body>
<?php echo setNavbar('USER');?>
  <div class="container-fluid">
   <div class="row-fluid">
    <blockquote><h2>users</h2></blockquote>
    <form id="form">
       <input type="hidden" id="ID" name="ID" value="">
    </form>
    <table class="table table-striped table-bordered" id="users">
    <tr>
       <th>Id</th>
       <th>Name</th>
       <th>E-mail</th>
       <th></th>
    </tr>
    <?php foreach($users as $user) :?>
    <tr>
       <td><?php echo h($user['id']);?></td>
       <td><?php echo h($user['name']);?></td>
       <td><?php echo h($user['email']);?></td>
       <td>
          <a rel="tooltip" href="javascript:void(0);" id="editId-<?php echo ($user['id']);?>" class="btn btn-info" data-toggle="tooltip" data-placement="bottom" title="ユーザー情報編集" onClick="editUser(<?php echo h($user['id']); ?>);"><i class="icon-edit icon-white"></i></a>
          <a rel="tooltip" href="javascript:void(0);" id="deleteId-<?php echo ($user['id']);?>" class="btn btn-inverse" data-toggle="tooltip" data-placement="bottom" title="ユーザー削除" onClick="deleteUser(<?php echo h($user['id']); ?>);"><i class="icon-trash icon-white"></i></a>
       </td>
    </tr>
    <?php endforeach;?>
    </table>
    <a href="/apps/index.php" class="btn"><i class="icon-chevron-left"></i>&nbsp;戻る</a>
    <a href="/apps/user/createUser.php" class="btn btn-primary"><i class="icon-user icon-white"></i>&nbsp;新規登録</a>
    <br><br>
   </div>
  </div>
</body>
</html>

