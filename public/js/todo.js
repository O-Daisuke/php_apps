$(function(){
	$('#title').focus();
	
	$('#addTask').click(function(){
		var title = $('#title').val();
		$.post('_ajax_add_task.php',{
			title: title
		},function(rs){
		  var e = $(
                '<tr id="task_'+rs+'" data-id="'+rs+'">' + 
				'<td>'+rs+'</td>'+
				'<td><input type="checkbox" class="checkTask"></td>' + 
				'<td><span></span></td>' + 
				'<td><button class="editTask btn btn-info"><i class="icon-edit"></i></button> ' + 
				/*'<button class="drag btn"><i class="icon-hand-up"></i></button>' + */
				'<button class="deleteTask btn btn-danger"><i class="icon-remove"></i></button></td> ' + 
				'</tr>'
            );
            $('#tasks').append(e).find('tr:last span:eq(0)').text(title);
            $('#title').val('').focus();
		});
	});

	$('#tasks tbody').sortable({
		items: 'tr',
		axis: 'y',
		opctity: 0.2,
		//handle: '.drag',
		update: function(){
			$.post('_ajax_sort_task.php',{
				task: $(this).sortable('serialize')
			});
		}
	});
	

	$(document).on('click','.editTask',function(){
		var id = $(this).parents('tr').data('id');
		var title = $("#task_"+id).find('span').text();
		$('#task_'+id)
					.empty()
					.append('<td>'+id+'</td>')
					.append('<td></td><td>'
					+'<div class="input-append">'
					+'<input type="text" value="'+title+'">'
					+'<button type="button" class="btn btn-info updateTask"><i class="icon-edit"></i></button></td></div>'
					+'<td></td><td></td>');
		$('#task_'+id+'input:eq(0)').focus();
	});
	
	//タイトル更新処理
	$(document).on('click','.updateTask',function(){
		var id = $(this).parents('tr').data('id');
		var title = $("#task_"+id).find('input[type="text"]').val();
		$.post('_ajax_update_task.php',{
			id: id,
			title: title
			},function(rs){
			 var e = $(
				'<td>'+id+'</td>'+
				'<td><input type="checkbox" class="checkTask"></td>' + 
				'<td><span></span></td>' + 
				'<td><button class="editTask btn btn-info"><i class="icon-edit"></i></button> ' + 
				/*'<button class="drag btn"><i class="icon-hand-up"></i></button>' + */
				'<button class="deleteTask btn btn-danger"><i class="icon-remove"></i></button></td> ' + 
				'</tr>'
            );
			$('#task_'+id).empty().append(e).find('span').text(title);
		});
	});
	//チェックボックス 完了変更
	$(document).on('click','.checkTask',function(){
		var id = $(this).parents('tr').data('id');
		var title = $('#task_'+id).find('span');
		var editbutton = $('#task_'+id).find('button:eq(0)');
		$.post('_ajax_check_task.php', { 
			id: id
		},function(rs){
			if(title.hasClass('done')){
				title.removeClass('done').addClass('notyet');
				editbutton.prop('disabled','');
			} else {
				title.removeClass('notyet').addClass('done');
				editbutton.prop('disabled','disabled');
			}
		});
	});
	
	$(document).on('click','.deleteTask',function(){
		if(confirm('完全に削除されます。宜しいですか？')){
		var id = $(this).parents('tr').data('id');
			$.post('_ajax_delete_task.php',{
				id: id
			},function(rs){
				$('#task_'+id).fadeOut(800);
			});
		}
	});
});