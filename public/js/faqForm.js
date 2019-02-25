$(document).ready(function(){
	CKEDITOR.replace( 'answer' );

	$("#sub").on('click', function(e){
		e.preventDefault();

		$("#addForm").submit();
	})
})