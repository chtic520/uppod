$(document).ready(function(){
	CKEDITOR.replace( 'summary' );
	CKEDITOR.replace( 'brief' );

	$("#sub").on('click', function(e){
		e.preventDefault();

		var _summary = CKEDITOR.instances.summary.getData();
		var picFlag = true;

		if ('' == $("#tagBox").html().trim()) {
			layer.tips('必须添加标签！', '#tagBox', {tips: 1});
			return;
		};

		$(".pic").each(function(){
			if ('' == $(this).val().trim()) {
				layer.tips('必须添加标签！', this, {tips: 1});
				picFlag = false;
				return false;
			};
		})

		if(!picFlag){
			return
		}

		$("#addForm").submit();
	})
	/* 图片上传 */

	var $list = $("#thethum"); 
	var $btn = $("#uploadBtn");
	var $picRow;
	var uploader;


	$("#uploadModal").on("shown.bs.modal",function(){
		var flag = false;

		uploader = WebUploader.create({
			auto: false,
			pick: '#addfile',
			server: '/admin/upload',
		  	swf: 'libs/webuploader/Uploader.swf',
		  	accept: {
		  		title: 'Images',
		  		extensions: 'gif,jpg,jpeg,bmp,png',
		  		mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif,image/bmp'
		  	},
		  	method: 'POST'
		});

		// 当有文件添加进来的时候  
	  uploader.on( 'fileQueued', function( file ) {
	  	flag = true;
	  	$list.find('.thum-img').attr('id', file.id);
	  	$list.find('#imgtitle').html(file.name);
	  	$list.find('#imgsize').html(formatSize(file.size));
	  	var $img = $list.find('#imgupload');
	  
			uploader.makeThumb( file, function( error, src ) {  
				if ( error ) {  
					$img.replaceWith('<span>不能预览</span>');  
					return;  
				}  
	  
				$img.attr( 'src', src );  
			});  
		}); 

		// 文件上传过程中创建进度条实时显示。
		uploader.on( 'uploadProgress', function( file, percentage ) {
			var $percent = $list.find('.progress-bar');
  
			// 避免重复创建  
			if ( !$percent.length ) {  
				$percent = $('<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active"></div></div>').prependTo( $list ).find('.progress-bar');  
			}  
  
			$percent.css( 'width', percentage * 100 + '%' );  
		}); 

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。  
		uploader.on( 'uploadSuccess', function( file, res ) {
			$picRow.find('.pic').val(res.path);
			layer.msg('图片上传成功！', {icon: 1});
		}); 

		// 文件上传失败，显示上传出错。  
		uploader.on( 'uploadError', function( file ) {
			layer.msg('上传遇到了问题，请重试！', {icon: 5});
		}); 

		// 完成上传完了，成功或者失败，先删除进度条。  
		uploader.on( 'uploadComplete', function( file ) {
			setTimeout(function(){
				$list.find('.progress').remove();
			}, 3000);
		});

		// 开始上传
		$btn.on( 'click', function() {
			if(!flag){
				layer.msg('没有选择要上传的图片，或需要重新选择！', {icon: 5});
				return false;
			}

	    uploader.upload(); 
	  });
	})

	$('#uploadModal').on('hide.bs.modal', function () {
	    uploader.destroy();
	});

	$("#addTag").on('click', function(){
		layer.prompt({title: '新增标签'}, function(value, index, elem){
		  $.ajax({
		  	url: '/admin/product/category',
		  	type: 'POST',
		  	data: {category: {name: value}},
		  	dataType: 'json',
		  	success: function(data){
		  		if (data.success === 1) {
		  			layer.msg('添加标签成功！')
		  			if ($(".no-tag").length > 0) {
		  				$(".no-tag").remove()
		  			}
		  			$("#tagList").prepend('<div class="col-sm-4"><label><input class="tag" type="radio" id="'+data.category._id+'"> <span>'+data.category.name+'</span></label></div>')
		  			layer.close(index);
		  		}
		  	}
		  })
		});
	});

	$("#t").on('click', function(){
		var html = '';
		$("#tagList").find('.tag:checked').each(function(){
			var tagName = $(this).siblings('span').html();
			var tagId = $(this).attr('id');
			html += '<span class="label label-info">'+tagName+'<input type="hidden" name="product[category]" value="'+tagId+'"></span>&nbsp;'
		})

		$("#tagBox").html(html)

		$("#tagModal").modal('hide')
	})

	$("#star").on('keyup', function(e){
		var _val = e.target.value - 0;
		if(_val > 5){
			e.target.value = 5;
		}

		if(_val < 0){
			e.target.value = 0;
		}
	})

	$("#picContainer").on('click', '.add', function(){
		$("#picContainer").append("<div class='input-group'>" +
			"<input class='form-control pic' type='text' placeholder='输入图片地址' name='product[pic]' readonly>" +
			"<span class='input-group-btn'><button type='button' class='btn btn-info btn-flat upload' data-toggle='modal' data-target='#uploadModal'>上传</button></span>" +
			"<span class='input-group-btn'><button type='button' class='btn btn-danger btn-flat remove'><i class='fa fa-minus'></i></button></span>" +
			"</div>");
	})

	$("#picContainer").on('click', '.remove', function(){
		$(this).closest('.input-group').remove();
	})

	$("#picContainer").on('click', '.upload', function(){
		$picRow = $(this).closest('.input-group');
	})

	$("#parameter").on('click', '.add', function(){
		var length = $("#parameter").find(".input-group").length;
		$("#parameter").append("<div class='input-group'>" + 
			"<input class='form-control' type='text' placeholder='参数名称' name='product[parameter]["+length+"][parameName]'>" +
			"<span class='input-group-addon'>:</span>" +
			"<input class='form-control' type='text' placeholder='参数信息' name='product[parameter]["+length+"][parameContent]'>" +
			"<span class='input-group-btn'><button class='btn btn-danger btn-flat remove' type='button'><i class='fa fa-minus'></i></button></span>" +
			"</div>")
	})
	$("#parameter").on('click', '.remove', function(){
		$(this).closest('.input-group').remove();
	})

	$("#shopAdd").on('click', '.add', function(){
		var length = $("#shopAdd").find(".input-group").length;
		$("#shopAdd").append("<div class='input-group'>" + 
			"<input class='form-control' type='text' placeholder='国家名称(英文)' name='product[shopAdd]["+length+"][country]'>" +
			"<span class='input-group-addon'>:</span>" +
			"<input class='form-control' type='text' placeholder='链接地址' name='product[shopAdd]["+length+"][link]'>" +
			"<span class='input-group-btn'><button class='btn btn-danger btn-flat remove' type='button'><i class='fa fa-minus'></i></button></span>" +
			"</div>")
	})
	$("#shopAdd").on('click', '.remove', function(){
		$(this).closest('.input-group').remove();
	})

	function formatSize( size, pointLength, units ) {
		var unit;

		units = units || [ 'B', 'K', 'M', 'G', 'TB' ];

		while ( (unit = units.shift()) && size > 1024 ) {
			size = size / 1024;
		}

		return (unit === 'B' ? size : size.toFixed( pointLength || 2 )) + unit;
	}
	
})