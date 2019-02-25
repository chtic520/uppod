$(document).ready(function(){
	$("#sendMessage").on('click', function(e){
		e.preventDefault();

		if ('' == $("#name").val().trim()) {
			layer.tips('The name is required.', '#name', {tips: 1});
			return;
		};

		if ('' == $("#email").val().trim()) {
			layer.tips('The email is required.', '#email', {tips: 1});
			return;
		};

		$("#sendForm").submit();
	})
})