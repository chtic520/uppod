$(document).ready(function(){
	$(".faq-container").on('click', '.del', function(){
		var _this = $(this);
		var _id = _this.attr('id');

		layer.confirm('确定要删除这条信息吗？', {icon: 3, title:'提示'}, function(index){
		  $.ajax({
		  	type: 'DELETE',
		  	url: '/admin/faq/del',
		  	data: {'_id':_id},
		  	success: function(data){

		  		if (data.success === 1) {

					_this.closest(".faq-box").slideUp("normal", function(){
						_this.closest(".faq-box").remove();
					})
				}else{
					layer.msg('删除数据时遇到了问题，刷新后重新试试看~');
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