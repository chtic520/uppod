$(document).ready(function(){
	$(".play").on('click', function(e){
		var _this = $(this);
		e.stopPropagation(); 
		top.layer.open({
			title: _this.data('vname'),
			type: 2,
			shadeClose: true,
			content: "/video/" + _this.data("href"),
			area: ['1140px', '700px']
		});
	})

	/* 控制首页是否展示 */
	$('.i-switch').on('switchChange.bootstrapSwitch', function(e, state) {
		var _onItems = parseInt($("#onItems").val()),
				$this = $(this),
				count = 1;

		if (_onItems > count) {
			layer.msg('只能选择1条在首页展示！请刷新！');
			return;
		}

	  if (state && _onItems < count) {

	  	$.ajax({
	  		type: 'POST',
	  		url: '/admin/video/display',
	  		data: {'id': $this.data('id'), 'on': true},
	  		success: function(data){
	  			if (data.success === 1 && $this) {

  					$("#onItems").val(_onItems + 1);
					layer.msg('首页展示成功！');
					return;
				}
	  		},
	  		error: function(e){
	  			layer.msg('执行操作时遇到了问题，刷新后重新试试看~');
	  			return;
	  		}
	  	})

	  	
	  }else if(state && _onItems >= count){
	  	$("#onItems").val(_onItems + 1);
	  	$this.bootstrapSwitch('state', false);
	  	return;
	  }else if(!state && _onItems <= count){
	  	
	  	$.ajax({
	  		type: 'POST',
	  		url: '/admin/video/display',
	  		data: {'id': $this.data('id'), 'on': false},
	  		success: function(data){
	  			if (data.success === 1 && $this) {

	  				$("#onItems").val(_onItems - 1);
					layer.msg('撤销展示成功！')
					return;

				}
	  		},
	  		error: function(e){
	  			layer.msg('执行操作时遇到了问题，刷新后重新试试看~');
	  			return;
	  		}
	  	})
	  }
	});

	/* 更新操作 */
	$("#update").on('click', function(){
		var rows = $(".datalist").find('.i-checks:checked');
		if (rows.length == 0) {
			layer.alert('请选择一条更新！', {icon: 0, title:'提示'});
		}else if(rows.length > 1){
			layer.alert('一次只能更新一条！', {icon: 0, title:'提示'});
		}else{
			location.href = $(this).data("href") + rows.val();
		}
	})

	

	/* 删除操作 */
	$("#del").on('click', function(){

		var rows = $(".datalist").find('.i-checks:checked');
		var delList = [];

		rows.each(function(){
			delList.push($(this).val())
		})

		if (rows.length == 0) {
			layer.alert('请选择一条删除！', {icon: 0, title:'提示'});
			return;
		}

		layer.confirm('确定要删除这' + rows.length + '条数据吗', {icon: 3, title:'提示'}, function(index){
		  $.ajax({
		  	type: 'DELETE',
		  	url: '/admin/video/del',
		  	data: {'delList':delList.toString()},
		  	success: function(data){

		  		if (data.success === 1) {

						if (rows.length > 0) {

							rows.each(function(){
								$(this).parents('tr').remove();
							})

							layer.msg('数据删除成功！');
						}
					}
		  	},
		  	error: function(e){
		  		layer.msg('删除数据时遇到了问题，刷新后重新试试看~');
		  	}
		  })
		  
		  layer.close(index);
		});
	})
	
})