$(document).ready(function(){
	$(".side-link").on('click', function(){
		var $this = $(this);

		$this.addClass('active').siblings('li').removeClass('active');
		$("#content").attr('src', $this.find('a').data('href'))
	})

	$("#headerP").on('click', function(){
		var $this = $(this);
		var _password = $("#headerNewPassword").val();

		$this.prop('disabled', true).attr('disabled', true);

		$.ajax({
			url: '/admin/header/updatep',
			type: 'POST',
			dataType: 'json',
			data: {password: _password},
			success: function(data){
				if (data.success === 1) {
					layer.alert(data.msg, function(index){
						window.location.href = "/users/login";
						layer.close(index);
					});
					$('#uploadPassword').modal('hide');
				}else{
					layer.msg('修改密码发生错误，请重试！');
					$('#uploadPassword').modal('hide');
				}
				$this.prop('disabled', false).attr('disabled', false);
				$("#headerNewPassword").val("");
			},
			error: function(e){
				layer.msg('服务器错误，请重试！');
				$this.prop('disabled', false).attr('disabled', false);
			}
		})
	})

})

