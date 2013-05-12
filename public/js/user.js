
function deleteUser(id){
    if(!id){
      return false;    
    }
    if(confirm("削除して宜しいですか？")){
    document.getElementById('ID').value = id;
    obj = document.forms['form'];
    obj.method = 'post';
    obj.action = './deleteUser.php';
    obj.submit();
    }
}

function editUser(id){
    if(!id){
      return false;    
    }
    document.getElementById('ID').value = id;
    obj = document.forms['form'];
    obj.method = 'post';
    obj.action = './editUser.php';
    obj.submit();
}


$(function(){
   $('a[rel=tooltip]').tooltip({show:200,hide:100});
});