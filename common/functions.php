<?php

function connectDb(){
	try{
		return new PDO(DSN,DB_USER,DB_PASSWORD);
	}catch(PDOException $e){
		echo $e->getMessage();
		exit;
	}
}

function h($val){
	return htmlspecialchars($val,ENT_QUOTES,"UTF-8");
}

function locationLogin(){
    header('Location:http://localhost/apps/login.php');
}

function getChangePassword($pass){
    return (md5(PASSWORD_KEY.$pass));
}

function hasSession(){
    if(empty($_SESSION['user'])){    
        locationLogin();
        exit;
    } 
}

function setCSS(){
    return 
    '<link rel="stylesheet" href="'.CSS_DIR.'/main.css">
    <link rel="stylesheet" href="'.CSS_DIR.'/bootstrap.css">
    <link rel="stylesheet" href="'.CSS_DIR.'/bootstrap-responsive.css">';
}

function setScript(){
    return 
    '<script src="'.JS_DIR.'/jquery-1.7.1.js" type="text/javascript"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>
    <script src="'.JS_DIR.'/bootstrap.js" type="text/javascript"></script>
    <script src="'.JS_DIR.'/bootstrap-tooltip.js" type="text/javascript"></script>
    <script src="'.JS_DIR.'/bootstrap-popover.js" type="text/javascript"></script>
    <script src="'.JS_DIR.'/functions.js" type="text/javascript"></script>';
}


function setNavbar($class){
    $user = '';
    $todo = '';
    $rss  = '';
    //class設定
    if($class == 'USER'){
       $user = 'active';
    }else if($class == 'TODO'){
       $todo = 'active';
    }else if($class == 'RSS'){
       $rss = 'active';
    }else if($class == 'MAIL'){
       $mail = 'active';
    }
    
    $name =  $_SESSION['user']['name'];
    return 
    '<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
       <div class="container-fluid">
          <a class="brand" href="/apps/index.php">APPS</a>
          <ul class="nav">
             <li class="'.$user.'"><a rel="tooltip" data-toggle="tooltip" title="ユーザー管理" data-placement="bottom" href="/apps/user/index.php"><i class="icon-user icon-white"></i>&nbsp;USER</a></li>
             <li class="'.$todo.'"><a rel="tooltip" data-toggle="tooltip" title="TODO管理" data-placement="bottom" href="/apps/todo/index.php"><i class="icon-check icon-white"></i>&nbsp;TODO</a></li>
             <li class="'.$rss.'"><a rel="tooltip" data-toggle="tooltip" title="RSS管理" data-placement="bottom" href="/apps/rss/index.php"><i class="icon-tags icon-white"></i>&nbsp;RSS</a></li>
             <li class="'.$mail.'"><a rel="tooltip" data-toggle="tooltip" title="Price管理" data-placement="bottom" href="/apps/price/index.php"><i class="icon-envelope icon-white"></i>&nbsp;PRICE</a></li>
          </ul>
          <ul class="nav pull-right">
             <li class="active"><a><i class="icon-user icon-white"></i>&nbsp;'.$name.'</a></li>
             <li><a href="#" onclick="location.reload();"><i class="icon-refresh icon-white"></i>&nbsp;RELOAD</a></li>
             <li><a href="/apps/logout.php"><i class="icon-off icon-white"></i>&nbsp;LOG OUT</a></li>
          </ul>
       </di>
       </div>
     </div>
  </div>';
}
