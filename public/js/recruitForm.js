$(document).ready(function(){

	$("#sub").on('click', function(e){
		e.preventDefault();

		$("#addForm").submit();
	})

	$("#summary").on('click', '.add', function(){
		var length = $("#summary").find(".input-group").length;
		$("#summary").append("<div class='input-group'><span class='input-group-addon'>" + (length + 1 ) +"</span><input class='form-control' type='text' placeholder='职位描述' name='recruit[summary]'><span class='input-group-btn'><button class='btn btn-danger btn-flat remove' type='button'><i class='fa fa-minus'></i></button></span></div>")
	})
	$("#summary").on('click', '.remove', function(){
		$(this).closest('.input-group').remove();
		$("#summary").find("span.input-group-addon").each(function(index, item){
			$(item).html(index+1);
		})
	})

	$("#requirement").on('click', '.add', function(){
		var length = $("#requirement").find(".input-group").length;
		$("#requirement").append("<div class='input-group'><span class='input-group-addon'>" + (length + 1 ) +"</span><input class='form-control' type='text' placeholder='任职要求' name='recruit[requirement]'><span class='input-group-btn'><button class='btn btn-danger btn-flat remove' type='button'><i class='fa fa-minus'></i></button></span></div>")
	})
	$("#requirement").on('click', '.remove', function(){
		$(this).closest('.input-group').remove();
		$("#requirement").find("span.input-group-addon").each(function(index, item){
			$(item).html(index+1);
		})
	})
	
})