$(document).ready(function(){
	CKEDITOR.replace( 'content' );

	$("#sub").on('click', function(e){
		e.preventDefault();

		$("#addForm").submit();
	})

	$("#ways").on('click', '.add', function(){
		var length = $("#ways").find(".input-group").length;
		$("#ways").append("<div class='input-group'>" + 
			"<input class='form-control' type='text' placeholder='名称' name='contactus[ways]["+length+"][wayName]'>" +
			"<span class='input-group-addon'>:</span>" +
			"<input class='form-control' type='text' placeholder='信息' name='contactus[ways]["+length+"][wayContent]'>" +
			"<span class='input-group-btn'><button class='btn btn-danger btn-flat remove' type='button'><i class='fa fa-minus'></i></button></span>" +
			"</div>")
	})
	$("#ways").on('click', '.remove', function(){
		$(this).closest('.input-group').remove();
	})
	
})