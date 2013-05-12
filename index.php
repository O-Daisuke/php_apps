<?php
require_once ('./common/config.php');
require_once ('./common/functions.php');

//IPアドレスとホスト名
$ipAddress = $_SERVER["REMOTE_ADDR"];
$hostName = $_SERVER['REMOTE_HOST'];
error_log('----- MAIN_MENU -----');
error_log('IP_ADDRESS- ' . $ipAddress);
error_log('HOST_NAME- ' . $hostName);

session_start();

$name = $_POST['name'];
$pass = $_POST['pass'];

if ($name == '' && $pass == '') {
    $user = $_SESSION['user'];
    $s_name = $user['name'];
    $s_pass = $user['pass'];
    if ($s_name == '' && $s_pass == '') {
        locationLogin();
        exit ;
    }
} else {
    $dbh = connectDb();
    $sql = 'select * from users where name = :name and password = :pass';
    $stmt = $dbh -> prepare($sql);
    $params = array(':name' => $name, ':pass' => getChangePassword($pass));
    //var_dump($params);
    $stmt -> execute($params);
    $user = $stmt -> fetch();
    $_SESSION['user'] = $user;
}

if (empty($_SESSION['user'])) {
    locationLogin();
    exit ;
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
        <meta charset="utf-8">
        <title>Main Menu</title>
        <?php echo setCSS()?>
        <?php echo setScript()?>
</head>
<body>
<div class="navbar navbar-fixed-top">
   <div class="navbar-inner">
      <div class="container-fluid">
          <a class="brand">APPS</a>
          <ul class="nav">
             <li><a href="/apps/user/index.php"><i class="icon-user icon-white"></i>&nbsp;USER</a></li>
             <li><a href="/apps/todo/index.php"><i class="icon-check icon-white"></i>&nbsp;TODO</a></li>
             <li><a href="/apps/rss/index.php"><i class="icon-tags icon-white"></i>&nbsp;RSS</a></li>
          </ul>
          <ul class="nav pull-right">
             <li><a href="/apps/logout.php"><i class="icon-share icon-white"></i>&nbsp;LOG OUT</a></li>
          </ul>
       </div>
   </div>
</div>
  
<div class="container-fluid">
   <div class="row-fluid">
      <blockquote><h2>Main Menu</h2></blockquote>
        <div class="container">
            <div class="row">
                <table>
                    <tr>
                        <td> 
                           <a class="btn btn-info" href="/apps/user/index.php"><i class="icon-user icon-white"></i>&nbsp;ユーザー管理</a>
                        </td>
                        <td>
                           <a class="btn btn-info" href="/apps/todo/index.php"><i class="icon-check icon-white"></i>&nbsp;TODO管理</a>              
                        </td>
                        <td>
                           <a class="btn btn-info" href="/apps/rss/index.php"><i class="icon-tags icon-white"></i>&nbsp;RSS管理</a>              
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </body>
</html>