$(document).ready(function(){
	var address = $("#address").val();
	var poster = $("#poster").val();
	var name = $("#name").val();

	$("#jquery_jplayer_1").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				title: name,
				m4v: address,
				ogv: address,
				webmv: address,
				poster: poster
			});
		},
		swfPath: "/libs/jplayer/dist/jplayer",
		supplied: "webmv, ogv, m4v",
		size: {
			width: "100%",
			height: "100%",
			cssClass: "jp-video-full"
		},
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		remainingDuration: true,
		toggleDuration: true
	});

});