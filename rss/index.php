<?php
 require_once('../common/config.php');
 require_once('../common/functions.php');

 session_start();
 
 hasSession();
 
 $rsses = array();
 $dbh = connectDb();
 $sql = "select * from rsstitle"; 
 
 foreach($dbh->query($sql) as $row){
	array_push($rsses,$row);
 }
 
 $count = $dbh->query("select count(*) from rsstitle")->fetchColumn();
 
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>RSS管理アプリ</title>
    <?php echo setCSS(); ?>
    <script src="https://www.google.com/jsapi"></script>
    <?php echo setScript(); ?>
    <script src="../public/js/rss.js" type="text/javascript"></script>
</head>
<body onLoad="setInterval('location.reload();',1000*60*10)">
  <?php echo setNavbar('RSS');?>
  <div class="container-fluid">
  <div class="row-fluid">
   <div class="span3">
      <blockquote><h3>RSS URL SEARCH</h3></blockquote>
      <div class="input-append">
         <input type="text" class="span9" id="url_search" value="" placeholder="INPUT TITLE">
         <button type="button" class="btn btn-info" onClick="search()"><i class="icon-search icon-white"></i></button>
      </div>
      <hr>
      <blockquote><h3>RSS CREATE</h3></blockquote>
      <div class="input-append">
         <input type="text" class="span9" id="name_create" value="" placeholder="INPUT TITLE">
         <input type="text" class="span9" id="url_create" value="" placeholder="INPUT URL">
         <button type="button" class="btn btn-success" onClick="insertRss();"><i class="icon-edit icon-white"></i></button>
      </div>
      <hr>
    <blockquote><h3>RSS LIST</h3></blockquote>
    <table class="table table-striped">
<?php foreach($rsses as $rss):?>
    <tr>
       <td><h4><?php echo h($rss['name']);?></h4></td>
       <td><a href="#" onClick="deleteRss(<?php echo h($rss['id']);?>);"><i class="icon-trash"></i></a></td>
    <tr>
<?php endforeach;?>
    </table>
      <hr>
      <button type="button" class="btn btn-info" onClick="location.reload()"><i class="icon-refresh icon-white"></i>&nbsp;Reload</button>
      <a href="/apps/index.php" class="btn"><i class="icon-chevron-left"></i>&nbsp;Back</a>
   </div><!-- /span3 -->
   
   <div class="span9">
  <input type="hidden" id="count" value="<?php echo h($count);?>">
<?php for($i=0; $i < $count; $i++) : ?>
  <input type="hidden" id="id-<?php echo $i; ?>" value="<?php echo h($rsses[$i]['id']);?>">
  <input type="hidden" id="title-<?php echo $i; ?>" value="<?php echo h($rsses[$i]['name']);?>">
  <input type="hidden" id="url-<?php echo $i; ?>" value="<?php echo h($rsses[$i]['url']);?>">
<?php endfor; ?>
    <blockquote><h2>RSS</h2></blockquote> 
    <table class="table table-striped" id="table"></table>
    <br><br>
    </div>
   </div>
  </div>
    <form id="form">
     <input type="hidden" id="NAME" name="NAME" value="">
     <input type="hidden" id="URL" name="URL" value="">
     <input type="hidden" id="ID" name="ID" value="">
  </form>
</body>
</html>


