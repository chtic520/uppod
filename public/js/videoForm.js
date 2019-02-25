$(document).ready(function(){

	$("#sub").on('click', function(e){
		e.preventDefault();

		$("#addForm").submit();
	})
	
	/* 图片上传 */

	var $list = $("#thethum"); 
	var $listPoster = $("#thethumPoster"); 
	var $btn = $("#uploadBtn");
	var $btnPoster = $("#uploadPosterBtn");
	var uploader;
	var uploaderPoster;


	$("#uploadModal").on("shown.bs.modal",function(){
		var flag = false;

		uploader = WebUploader.create({
			auto: false,
			pick: '#addfile',
			server: '/admin/video/upload',
		  	swf: 'libs/webuploader/Uploader.swf',
		  	accept: {
		  		title: 'Video',
		  		extensions: '3gp,mp4,rmvb,mov,avi,m4v',
		  		mimeTypes: 'video/*,audio/*,application/*'
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
					$img.replaceWith('<span>正在上传</span>');  
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
  
			$percent.html((percentage * 100).toFixed(1) + '%').css( {'width': percentage * 100 + '%', color: "#000000"} );  
		}); 

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。  
		uploader.on( 'uploadSuccess', function( file, res ) {
			if (res.success) {
				$("#address").val(res.path);
				layer.msg('视频上传成功！', {icon: 1});
			}else{
				layer.msg(res.msg, {icon: 2});
			}
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
				layer.msg('没有选择要上传的视频，或需要重新选择！', {icon: 5});
				return false;
			}

	    uploader.upload(); 
	  });
	})
	$("#uploadPoster").on("shown.bs.modal",function(){
		var flag = false;

		uploaderPoster = WebUploader.create({
			auto: false,
			pick: '#addPoster',
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
	  uploaderPoster.on( 'fileQueued', function( file ) {
	  	flag = true;
	  	$listPoster.find('.thum-img').attr('id', file.id);
	  	$listPoster.find('#Postertitle').html(file.name);
	  	$listPoster.find('#Postersize').html(formatSize(file.size));
	  	var $img = $listPoster.find('#imgPoster');
	  
			uploaderPoster.makeThumb( file, function( error, src ) {  
				if ( error ) {  
					$img.replaceWith('<span>不能预览</span>');  
					return;  
				}  
	  
				$img.attr( 'src', src );  
			});  
		}); 

		// 文件上传过程中创建进度条实时显示。
		uploaderPoster.on( 'uploadProgress', function( file, percentage ) {
			var $percent = $listPoster.find('.progress-bar');
  
			// 避免重复创建  
			if ( !$percent.length ) {  
				$percent = $('<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active"></div></div>').prependTo( $listPoster ).find('.progress-bar');  
			}  
  
			$percent.css( 'width', percentage * 100 + '%' );  
		}); 

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。  
		uploaderPoster.on( 'uploadSuccess', function( file, res ) {
			if (res.success) {
				$("#poster").val(res.path);
				layer.msg('图片上传成功！', {icon: 1});
			}else{
				layer.msg(res.msg, {icon: 2});
			}
		}); 

		// 文件上传失败，显示上传出错。  
		uploaderPoster.on( 'uploadError', function( file ) {
			layer.msg('上传遇到了问题，请重试！', {icon: 5});
		}); 

		// 完成上传完了，成功或者失败，先删除进度条。  
		uploaderPoster.on( 'uploadComplete', function( file ) {
			setTimeout(function(){
				$listPoster.find('.progress').remove();
			}, 3000);
		});

		// 开始上传
		$btnPoster.on( 'click', function() {
			if(!flag){
				layer.msg('没有选择要上传的图片，或需要重新选择！', {icon: 5});
				return false;
			}

	    uploaderPoster.upload(); 
	  });
	})

	$('#uploaderPoster').on('hide.bs.modal', function () {
	    uploaderPoster.destroy();
	});

	$('#uploadModal').on('hide.bs.modal', function () {
	    uploader.destroy();
	});

	function formatSize( size, pointLength, units ) {
		var unit;

		units = units || [ 'B', 'K', 'M', 'G', 'TB' ];

		while ( (unit = units.shift()) && size > 1024 ) {
			size = size / 1024;
		}

		return (unit === 'B' ? size : size.toFixed( pointLength || 2 )) + unit;
	}
})